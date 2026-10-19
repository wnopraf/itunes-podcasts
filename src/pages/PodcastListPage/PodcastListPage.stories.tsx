import type { Meta, StoryObj } from '@storybook/react-vite';
import { PodcastListPage } from './PodcastListPage';

const meta = {
  title: 'Pages/PodcastListPage',
  component: PodcastListPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PodcastListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
