import type { Meta, StoryObj } from '@storybook/react-vite';
import { EpisodeTableHeaderSkeleton } from '../EpisodeTableHeader/EpisodeTableHeaderSkeleton';
import { EpisodeTableSkeleton } from './EpisodeTableSkeleton';

const meta = {
  title: 'Podcasts/EpisodeTableSkeleton',
  component: EpisodeTableSkeleton,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EpisodeTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHeader: Story = {
  decorators: [
    (Story) => (
      <>
        <EpisodeTableHeaderSkeleton />
        <Story />
      </>
    ),
  ],
};
