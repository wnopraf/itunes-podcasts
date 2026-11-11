import { render, screen, waitFor } from '@testing-library/react';
import { Component, type ReactNode } from 'react';
import { LoadingTrackerContext } from '../contexts/LoadingContext';
import { useAsyncData } from './useAsyncData';

interface ErrorBoundaryState {
  message: string | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { message: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { message: error instanceof Error ? error.message : String(error) };
  }

  render() {
    return this.state.message === null ? (
      this.props.children
    ) : (
      <div role="alert">{this.state.message}</div>
    );
  }
}

const Probe = ({
  fetcher,
  enabled,
}: {
  fetcher: (signal: AbortSignal) => Promise<string>;
  enabled?: boolean;
}) => {
  const data = useAsyncData(fetcher, { enabled });
  return <div data-testid="data">{data ?? 'null'}</div>;
};

const renderProbe = (
  fetcher: (signal: AbortSignal) => Promise<string>,
  { enabled }: { enabled?: boolean } = {},
) => {
  const startLoad = vi.fn();
  const endLoad = vi.fn();
  const { unmount } = render(
    <LoadingTrackerContext value={{ startLoad, endLoad }}>
      <ErrorBoundary>
        <Probe fetcher={fetcher} enabled={enabled} />
      </ErrorBoundary>
    </LoadingTrackerContext>,
  );
  return { unmount, startLoad, endLoad };
};

describe('useAsyncData', () => {
  it('returns the fetched data and tracks loading', async () => {
    const fetcher = vi.fn().mockResolvedValue('hello');
    const { startLoad, endLoad } = renderProbe(fetcher);

    await waitFor(() => expect(screen.getByTestId('data')).toHaveTextContent('hello'));
    expect(startLoad).toHaveBeenCalled();
    expect(endLoad).toHaveBeenCalled();
  });

  it('does not fetch when disabled', () => {
    const fetcher = vi.fn().mockResolvedValue('hello');
    const { startLoad, endLoad } = renderProbe(fetcher, { enabled: false });

    expect(screen.getByTestId('data')).toHaveTextContent('null');
    expect(fetcher).not.toHaveBeenCalled();
    expect(startLoad).not.toHaveBeenCalled();
    expect(endLoad).not.toHaveBeenCalled();
  });

  it('throws the error when the fetcher rejects with an Error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetcher = vi.fn().mockRejectedValue(new Error('boom'));
    renderProbe(fetcher);

    expect(await screen.findByRole('alert')).toHaveTextContent('boom');
  });

  it('wraps non-Error rejections into an Error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetcher = vi.fn().mockRejectedValue('boom');
    renderProbe(fetcher);

    expect(await screen.findByRole('alert')).toHaveTextContent('boom');
  });

  it('does not set data when unmounted before the fetcher resolves', async () => {
    let receivedSignal: AbortSignal | undefined;
    const promiseFetcher = Promise.withResolvers<string>();
    const fetcher = vi.fn((signal: AbortSignal) => {
      receivedSignal = signal;
      return promiseFetcher.promise;
    });
    const { unmount } = renderProbe(fetcher);

    await waitFor(() => expect(fetcher).toHaveBeenCalled());
    unmount();
    expect(receivedSignal?.aborted).toBe(true);
    promiseFetcher.resolve('late');
  });

  it('does not set error when unmounted before the fetcher rejects', async () => {
    const promiseFetcher = Promise.withResolvers<string>();
    const fetcher = vi.fn(() => promiseFetcher.promise);
    const { unmount } = renderProbe(fetcher);

    await waitFor(() => expect(fetcher).toHaveBeenCalled());
    unmount();
    promiseFetcher.reject('boom');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
