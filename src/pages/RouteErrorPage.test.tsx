import { render, screen } from '@testing-library/react';
import { MemoryRouter, useRouteError } from 'react-router';
import { PodcastNotFoundError } from '@/modules/podcasts/domain/PodcastNotFoundError';
import { RouteErrorPage } from './RouteErrorPage';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return { ...actual, useRouteError: vi.fn() };
});

const mockedUseRouteError = vi.mocked(useRouteError);

const renderPage = () =>
  render(
    <MemoryRouter>
      <RouteErrorPage />
    </MemoryRouter>,
  );

describe('RouteErrorPage', () => {
  it('renders the status message for a route error response', () => {
    mockedUseRouteError.mockReturnValue({
      status: 404,
      statusText: 'Not Found',
      internal: true,
      data: {},
    });
    renderPage();

    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders the message for an Error instance', () => {
    mockedUseRouteError.mockReturnValue(new Error('boom'));
    renderPage();

    expect(screen.getByText('boom')).toBeInTheDocument();
  });

  it('renders a fallback message for unexpected errors', () => {
    mockedUseRouteError.mockReturnValue('weird');
    renderPage();

    expect(screen.getByText('Unexpected error')).toBeInTheDocument();
  });

  it('renders the not found page for PodcastNotFoundError', () => {
    mockedUseRouteError.mockReturnValue(new PodcastNotFoundError('0'));
    renderPage();

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });
});
