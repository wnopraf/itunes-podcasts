import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { fixtureEpisodes, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { withOutletContext } from '@/test/storybook/withOutletContext';
import { EpisodeListPage } from './EpisodeListPage';

const meta = {
  title: 'Pages/EpisodeListPage',
  component: EpisodeListPage,
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="container" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <EpisodeListPage />
    </div>
  ),
} satisfies Meta<typeof EpisodeListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withOutletContext<PodcastOutletContext>({
      podcast: fixturePodcasts[0],
      episodes: fixtureEpisodes,
    }),
  ],
};

export const Empty: Story = {
  decorators: [
    withOutletContext<PodcastOutletContext>({
      podcast: fixturePodcasts[0],
      episodes: [],
    }),
  ],
};
