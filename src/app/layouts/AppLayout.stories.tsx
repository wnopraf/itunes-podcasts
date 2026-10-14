import type { Meta, StoryObj } from '@storybook/react-vite';
import { Route, Routes } from 'react-router';
import { AppLayout } from './AppLayout';
import { LoadingStateContext } from '@/shared/presentation/contexts/LoadingContext';

type Story = StoryObj<typeof meta>;
const meta = {
  title: 'App/Layouts/AppLayout',
  component: AppLayout,

  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<p>Page content</p>} />
      </Route>
    </Routes>
  ),
} satisfies Meta<typeof AppLayout>;
export default meta;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <LoadingStateContext value={true}>
        <Story />
      </LoadingStateContext>
    ),
  ],
};
