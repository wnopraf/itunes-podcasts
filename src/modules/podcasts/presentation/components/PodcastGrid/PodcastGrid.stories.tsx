import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useTopPodcasts } from '../../hooks/useTopPodcasts';
import { PodcastGrid } from './PodcastGrid';

const PodcastGridFromRepository = () => {
  const podcasts = useTopPodcasts();
  if (!podcasts?.length) return <Loader />;
  return <PodcastGrid podcasts={podcasts} />;
};

const meta = {
  title: 'Podcasts/PodcastGrid',
  component: PodcastGridFromRepository,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="container">
      <PodcastGridFromRepository />
    </div>
  ),
} satisfies Meta<typeof PodcastGridFromRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
