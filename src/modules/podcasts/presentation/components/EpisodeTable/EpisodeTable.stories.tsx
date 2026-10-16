import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useEpisodes } from '../../hooks/useEpisodes';
import { EpisodeTable } from './EpisodeTable';

const EpisodeTableFromRepository = () => {
  const episodes = useEpisodes('');
  if (!episodes?.length) return <Loader />;
  return <EpisodeTable episodes={episodes} />;
};

const meta = {
  title: 'Podcasts/EpisodeTable',
  component: EpisodeTableFromRepository,
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="container">
      <EpisodeTableFromRepository />
    </div>
  ),
} satisfies Meta<typeof EpisodeTableFromRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
