import type { Meta, StoryObj } from '@storybook/react-vite';
import { Route, Routes } from 'react-router';
import { EpisodeListPage } from '@/pages/EpisodeListPage';
import { EpisodePlayerPage } from '@/pages/EpisodePlayerPage';
import { fixtureEpisodes, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { PODCAST_PATHS, toEpisode, toPodcast } from '../utils/routes';
import { PodcastDetailLayout } from './PodcastDetailLayout';

const [podcast] = fixturePodcasts;
const [episode] = fixtureEpisodes;

const meta = {
  title: 'Podcasts/Layouts/PodcastDetailLayout',
  component: PodcastDetailLayout,
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="container">
      <Routes>
        <Route path={PODCAST_PATHS.PODCAST} element={<PodcastDetailLayout />}>
          <Route index element={<EpisodeListPage />} />
          <Route path={PODCAST_PATHS.EPISODE} element={<EpisodePlayerPage />} />
        </Route>
      </Routes>
    </div>
  ),
} satisfies Meta<typeof PodcastDetailLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EpisodeList: Story = {
  parameters: {
    router: { initialEntries: [toPodcast(podcast.id)] },
  },
};

export const EpisodePlayer: Story = {
  parameters: {
    router: { initialEntries: [toEpisode(Number(podcast.id), episode.id)] },
  },
};
