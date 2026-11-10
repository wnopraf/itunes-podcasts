import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useIsLoading, useLoadingTracker } from '../contexts/LoadingContext';
import { LoadingProvider } from './LoadingProvider';

const Probe = () => {
  const isLoading = useIsLoading();
  const { startLoad, endLoad } = useLoadingTracker();
  return (
    <>
      <div data-testid="loading">{String(isLoading)}</div>
      <button onClick={startLoad}>start</button>
      <button onClick={endLoad}>end</button>
    </>
  );
};

const IsLoadingProbe = () => {
  const isLoading = useIsLoading();
  return <div>{String(isLoading)}</div>;
};

const TrackerProbe = () => {
  const { startLoad } = useLoadingTracker();
  return <button onClick={startLoad}>start</button>;
};

describe('LoadingProvider', () => {
  it('tracks loading state across start and end', async () => {
    const user = userEvent.setup();
    render(
      <LoadingProvider>
        <Probe />
      </LoadingProvider>,
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    await user.click(screen.getByText('start'));
    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    await user.click(screen.getByText('end'));
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('clamps the counter at zero when ending without a start', async () => {
    const user = userEvent.setup();
    render(
      <LoadingProvider>
        <Probe />
      </LoadingProvider>,
    );

    await user.click(screen.getByText('end'));
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('throws when useIsLoading is used outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<IsLoadingProbe />)).toThrow(
      'useIsLoading must be used within LoadingProvider',
    );
  });

  it('throws when useLoadingTracker is used outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TrackerProbe />)).toThrow(
      'useLoadingTracker must be used within LoadingProvider',
    );
  });
});
