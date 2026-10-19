import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useEpisodes } from '../../hooks/useEpisodes';
import { EpisodeDetail } from './EpisodeDetail';

const EpisodeDetailFromRepository = () => {
  const episodes = useEpisodes('');
  if (!episodes?.length) return <Loader />;
  return <EpisodeDetail episode={episodes[0]} />;
};

const meta = {
  title: 'Podcasts/EpisodeDetail',
  component: EpisodeDetailFromRepository,
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="container">
      <EpisodeDetailFromRepository />
    </div>
  ),
} satisfies Meta<typeof EpisodeDetailFromRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
