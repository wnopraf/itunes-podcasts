import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { PODCAST_PATHS, toEpisode } from '@/modules/podcasts/presentation/utils/routes';
import { fixtureEpisodes, fixturePodcastDetail } from '@/test/fixtures/podcastFixtures';
import { withOutletContext } from '@/test/storybook/withOutletContext';
import { EpisodePlayerPage } from './EpisodePlayerPage';

const [episode] = fixtureEpisodes;

const withDetail = (detail: PodcastOutletContext['detail']) =>
  withOutletContext<PodcastOutletContext>({ detail }, PODCAST_PATHS.EPISODE);

const meta = {
  title: 'Pages/EpisodePlayerPage',
  component: EpisodePlayerPage,
  parameters: {
    layout: 'padded',
    router: { initialEntries: [toEpisode(episode.podcastId, episode.id)] },
  },
  render: () => (
    <div className="container">
      <EpisodePlayerPage />
    </div>
  ),
} satisfies Meta<typeof EpisodePlayerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withDetail(fixturePodcastDetail)],
};

export const Loading: Story = {
  decorators: [withDetail(null)],
};

export const NotFound: Story = {
  decorators: [withDetail(fixturePodcastDetail)],
  parameters: {
    router: { initialEntries: [toEpisode(episode.podcastId, '0')] },
  },
};
