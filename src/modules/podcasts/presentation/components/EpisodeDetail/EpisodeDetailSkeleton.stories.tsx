import type { Meta, StoryObj } from '@storybook/react-vite';
import { EpisodeDetailSkeleton } from './EpisodeDetailSkeleton';

const meta = {
  title: 'Podcasts/EpisodeDetailSkeleton',
  component: EpisodeDetailSkeleton,
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="container">
      <EpisodeDetailSkeleton />
    </div>
  ),
} satisfies Meta<typeof EpisodeDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
