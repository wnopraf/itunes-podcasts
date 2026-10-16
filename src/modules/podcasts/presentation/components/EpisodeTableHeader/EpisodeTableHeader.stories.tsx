import type { Meta, StoryObj } from '@storybook/react-vite';
import { EpisodeTableHeader } from './EpisodeTableHeader';

const meta = {
  title: 'Podcasts/EpisodeTableHeader',
  component: EpisodeTableHeader,
  parameters: {
    layout: 'padded',
  },
  args: {
    episodeCount: 60,
  },
} satisfies Meta<typeof EpisodeTableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
