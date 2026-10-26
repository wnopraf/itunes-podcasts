import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  args: {
    width: '12rem',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Circle: Story = {
  args: {
    width: '7rem',
    height: '7rem',
    radius: 'var(--radius-full)',
  },
};
