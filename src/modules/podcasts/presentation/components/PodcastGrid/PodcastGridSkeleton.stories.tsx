import type { Meta, StoryObj } from '@storybook/react-vite';
import { PodcastGridSkeleton } from './PodcastGridSkeleton';

const meta = {
  title: 'Podcasts/PodcastGridSkeleton',
  component: PodcastGridSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="container">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PodcastGridSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
