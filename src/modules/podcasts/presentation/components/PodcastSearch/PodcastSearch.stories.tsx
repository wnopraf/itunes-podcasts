import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { PodcastSearch } from './PodcastSearch';

const meta = {
  title: 'Podcasts/PodcastSearch',
  component: PodcastSearch,
  args: {
    podcastCount: 100,
    label: 'Search',
    hideLabel: true,
    value: '',
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>();
    return (
      <PodcastSearch
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
} satisfies Meta<typeof PodcastSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
