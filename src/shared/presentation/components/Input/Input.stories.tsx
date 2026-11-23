import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
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
  args: { value: 'Jane Doe' },
};

export const HiddenLabel: Story = {
  args: { hideLabel: true },
};

export const Search: Story = {
  args: { type: 'search', label: 'Search', placeholder: 'Search...' },
};
