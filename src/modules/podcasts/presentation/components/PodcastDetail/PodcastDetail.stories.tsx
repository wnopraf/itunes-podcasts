import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useTopPodcasts } from '../../hooks/useTopPodcasts';
import { PodcastDetail } from './PodcastDetail';

const PodcastDetailFromRepository = () => {
  const podcasts = useTopPodcasts();
  if (!podcasts?.length) return <Loader />;
  return <PodcastDetail podcast={podcasts[0]} />;
};

const meta = {
  title: 'Podcasts/PodcastDetail',
  component: PodcastDetailFromRepository,
  render: () => (
    <div style={{ width: '18rem' }}>
      <PodcastDetailFromRepository />
    </div>
  ),
} satisfies Meta<typeof PodcastDetailFromRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
