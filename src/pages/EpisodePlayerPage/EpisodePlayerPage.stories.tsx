import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { PODCAST_PATHS, toEpisode } from '@/modules/podcasts/presentation/utils/routes';
import { fixtureEpisodes, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { withOutletContext } from '@/test/storybook/withOutletContext';
import { EpisodePlayerPage } from './EpisodePlayerPage';

const [episode] = fixtureEpisodes;

const meta = {
  title: 'Pages/EpisodePlayerPage',
  component: EpisodePlayerPage,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    withOutletContext<PodcastOutletContext>(
      { podcast: fixturePodcasts[0], episodes: fixtureEpisodes },
      PODCAST_PATHS.EPISODE,
    ),
  ],
  render: () => (
    <div className="container">
      <EpisodePlayerPage />
    </div>
  ),
} satisfies Meta<typeof EpisodePlayerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    router: { initialEntries: [toEpisode(episode.podcastId, episode.id)] },
  },
};

export const NotFound: Story = {
  parameters: {
    router: { initialEntries: [toEpisode(episode.podcastId, 0)] },
  },
};
