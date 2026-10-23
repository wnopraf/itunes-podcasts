import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AppLayout } from '@/app/layouts/AppLayout';
import { AppProviders } from '@/app/providers/AppProviders';
import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { fixtureEpisodes, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { PodcastListPage } from './PodcastListPage';

const renderPage = (podcastRepository: PodcastRepository) =>
  render(
    <AppProviders podcastRepository={podcastRepository}>
      <MemoryRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<PodcastListPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );

const createRepository = (getTopPodcasts: () => Promise<Podcast[]>): PodcastRepository => ({
  getTopPodcasts,
  getEpisodes: () => Promise.resolve(fixtureEpisodes),
});

describe('PodcastListPage', () => {
  it('shows the loader and the skeleton while podcasts are loading', async () => {
    const { promise, resolve } = Promise.withResolvers<Podcast[]>();
    renderPage(createRepository(() => promise));

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Loading podcasts' })).toHaveAttribute(
      'aria-busy',
      'true',
    );

    resolve(fixturePodcasts);

    expect(await screen.findByLabelText('Search podcasts')).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Loading' })).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Loading podcasts' })).not.toBeInTheDocument();
  });

  it('filters podcasts by title and author', async () => {
    const user = userEvent.setup();
    renderPage(createRepository(() => Promise.resolve(fixturePodcasts)));

    const search = await screen.findByLabelText('Search podcasts');
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(fixturePodcasts.length);

    await user.type(search, 'joe');

    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(['The Joe Budden Podcast', 'Joe and Jada']);

    await user.clear(search);
    await user.type(search, 'hrishikesh');

    const [result] = screen.getAllByRole('listitem');
    expect(within(result).getByRole('heading', { name: 'Song Exploder' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    await user.clear(search);
    await user.type(search, 'not-a-podcast');

    expect(screen.getByText('No results found matching "not-a-podcast"')).toBeInTheDocument();
  });
});
