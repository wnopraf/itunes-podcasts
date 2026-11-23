import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router';
import { fixtureEpisodes, fixturePodcastDetail } from '@/test/fixtures/podcastFixtures';
import type { PodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { EpisodePlayerPage } from './EpisodePlayerPage';

const [episode] = fixtureEpisodes;

const renderPage = (context: PodcastOutletContext, episodeId = episode.id) =>
  render(
    <MemoryRouter initialEntries={[`/podcast/1/episode/${episodeId}`]}>
      <Routes>
        <Route element={<Outlet context={context} />}>
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodePlayerPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('EpisodePlayerPage', () => {
  it('renders the episode player for a known episode', () => {
    renderPage({ detail: fixturePodcastDetail });

    expect(screen.getByRole('heading', { name: episode.title })).toBeInTheDocument();
    expect(document.querySelector('audio')).toHaveAttribute('src', episode.url);
  });

  it('renders the not found page for an unknown episode', () => {
    renderPage({ detail: fixturePodcastDetail }, 'unknown-episode');

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('renders the episode skeleton while the podcast detail loads', () => {
    renderPage({ detail: null });

    expect(screen.getByLabelText('Loading episode')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(document.querySelector('audio')).not.toBeInTheDocument();
  });
});
