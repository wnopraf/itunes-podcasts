import type { Meta, StoryObj } from '@storybook/react-vite';
import { PodcastDetailSkeleton } from './PodcastDetailSkeleton';

const meta = {
  title: 'Podcasts/PodcastDetailSkeleton',
  component: PodcastDetailSkeleton,
  decorators: [
    (Story) => (
      <div style={{ width: '18rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PodcastDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
