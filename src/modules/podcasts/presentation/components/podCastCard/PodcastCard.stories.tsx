import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useTopPodcasts } from '../../hooks/useTopPodcasts';
import { PodcastCard } from './PodcastCard';

const PodcastCardFromRepository = () => {
  const podcasts = useTopPodcasts();
  if (!podcasts?.length) return <Loader />;
  return <PodcastCard podcast={podcasts[0]} />;
};

const meta = {
  title: 'Podcasts/PodcastCard',
  component: PodcastCardFromRepository,
  render: () => (
    <div>
      <PodcastCardFromRepository />
    </div>
  ),
} satisfies Meta<typeof PodcastCardFromRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
