import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type { Episode } from '@/modules/podcasts/domain/Episode';
import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { fixtureEpisodes, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { AppProviders } from './providers/AppProviders';
import { routes } from './router';

const SONG_EXPLODER_ID = '788236947';
const [firstEpisode] = fixtureEpisodes;

const createMockRepository = () =>
  ({
    getTopPodcasts: vi.fn<PodcastRepository['getTopPodcasts']>(),
    getEpisodes: vi.fn<PodcastRepository['getEpisodes']>(),
  }) satisfies PodcastRepository;

const renderApp = (repository: PodcastRepository, initialPath = '/') => {
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
  render(
    <AppProviders podcastRepository={repository}>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return { router, user: userEvent.setup() };
};

const queryLoader = () => screen.queryByRole('progressbar', { name: 'Loading' });
const waitForLoader = () => waitFor(() => expect(queryLoader()).toBeInTheDocument());

describe('App navigation', () => {
  it('navigates through podcast list, podcast detail and episode showing loading states', async () => {
    const homePodcasts = Promise.withResolvers<Podcast[]>();
    const detailPodcasts = Promise.withResolvers<Podcast[]>();
    const backHomePodcasts = Promise.withResolvers<Podcast[]>();
    const episodes = Promise.withResolvers<Episode[]>();
    const repository = createMockRepository();
    repository.getTopPodcasts.mockReturnValue(homePodcasts.promise);
    repository.getEpisodes.mockReturnValue(episodes.promise);
    const { router, user } = renderApp(repository);

    // Podcast list: loading
    expect(await screen.findByRole('list', { name: 'Loading podcasts' })).toBeInTheDocument();
    await waitForLoader();

    homePodcasts.resolve(fixturePodcasts);

    // Podcast list: loaded
    const podcastLink = await screen.findByRole('link', { name: /Song Exploder/ });
    expect(queryLoader()).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Loading podcasts' })).not.toBeInTheDocument();

    repository.getTopPodcasts.mockReturnValue(detailPodcasts.promise);
    await user.click(podcastLink);

    // Podcast detail: loading podcast and episodes
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(`/podcast/${SONG_EXPLODER_ID}`),
    );
    await waitFor(() =>
      expect(repository.getEpisodes).toHaveBeenCalledWith(
        SONG_EXPLODER_ID,
        expect.any(AbortSignal),
      ),
    );
    await waitForLoader();
    expect(screen.getByRole('table', { name: 'Loading episodes' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Song Exploder' })).not.toBeInTheDocument();

    detailPodcasts.resolve(fixturePodcasts);

    // Podcast detail: podcast loaded, episodes still loading
    const sidebar = await screen.findByRole('complementary');
    expect(
      await within(sidebar).findByRole('heading', { name: 'Song Exploder' }),
    ).toBeInTheDocument();
    expect(within(sidebar).getByText('Hrishikesh Hirway')).toBeInTheDocument();
    expect(queryLoader()).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Loading episodes' })).toBeInTheDocument();

    episodes.resolve(fixtureEpisodes);

    // Podcast detail: everything loaded
    expect(await screen.findByText(`Episodes: ${fixtureEpisodes.length}`)).toBeInTheDocument();
    expect(queryLoader()).not.toBeInTheDocument();
    expect(screen.queryByRole('table', { name: 'Loading episodes' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: firstEpisode.title }));

    // Episode player: reuses loaded data, no new requests
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(
        `/podcast/${SONG_EXPLODER_ID}/episode/${firstEpisode.id}`,
      ),
    );
    expect(await screen.findByRole('heading', { name: firstEpisode.title })).toBeInTheDocument();
    expect(document.querySelector('audio')).toHaveAttribute('src', firstEpisode.url);
    expect(within(sidebar).getByRole('heading', { name: 'Song Exploder' })).toBeInTheDocument();
    expect(queryLoader()).not.toBeInTheDocument();
    expect(repository.getEpisodes).toHaveBeenCalledTimes(1);

    await user.click(within(sidebar).getByRole('link', { name: /Hrishikesh Hirway/ }));

    // Back to episode list from sidebar
    await waitFor(() =>
      expect(router.state.location.pathname).toBe(`/podcast/${SONG_EXPLODER_ID}`),
    );
    expect(await screen.findByText(`Episodes: ${fixtureEpisodes.length}`)).toBeInTheDocument();
    expect(repository.getEpisodes).toHaveBeenCalledTimes(1);

    repository.getTopPodcasts.mockReturnValue(backHomePodcasts.promise);
    await user.click(screen.getByRole('link', { name: 'Podcaster' }));

    // Back home: list is fetched again
    await waitFor(() => expect(router.state.location.pathname).toBe('/'));
    expect(await screen.findByRole('list', { name: 'Loading podcasts' })).toBeInTheDocument();
    await waitForLoader();

    backHomePodcasts.resolve(fixturePodcasts);

    expect(await screen.findByLabelText('Search podcasts')).toBeInTheDocument();
    expect(queryLoader()).not.toBeInTheDocument();
  });

  it('shows the not found page for unknown routes and navigates back home', async () => {
    const repository = createMockRepository();
    repository.getTopPodcasts.mockResolvedValue(fixturePodcasts);
    const { router, user } = renderApp(repository, '/unknown/route');

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(repository.getTopPodcasts).not.toHaveBeenCalled();

    await user.click(screen.getByRole('link', { name: 'Back to podcasts' }));

    await waitFor(() => expect(router.state.location.pathname).toBe('/'));
    expect(await screen.findByLabelText('Search podcasts')).toBeInTheDocument();
  });

  it('shows the error page and hides the loader when loading fails', async () => {
    // hide console errors during test
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const podcasts = Promise.withResolvers<Podcast[]>();
    const repository = createMockRepository();
    repository.getTopPodcasts.mockReturnValue(podcasts.promise);
    renderApp(repository);

    await waitForLoader();
    await waitFor(() => expect(repository.getTopPodcasts).toHaveBeenCalled());

    podcasts.reject(new Error('Network down'));

    expect(
      await screen.findByRole('heading', { name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Network down')).toBeInTheDocument();
    expect(queryLoader()).not.toBeInTheDocument();
  });
});
