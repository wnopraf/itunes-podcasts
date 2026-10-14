import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  render: () => <Loader />,
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
