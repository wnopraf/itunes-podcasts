import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    label: 'Search',
    placeholder: 'Filter podcasts...',
    value: '',
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>();
    return (
      <Input
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Song Exploder' },
};

export const HiddenLabel: Story = {
  args: { label: 'Filter podcasts', hideLabel: true },
};
