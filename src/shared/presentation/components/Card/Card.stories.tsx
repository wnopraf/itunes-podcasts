import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Shared/Card',
  component: Card,
  args: {
    children: (
      <>
        <strong>Card title</strong>
        <span>Card content goes here.</span>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StackedContent: Story = {
  args: {
    children: (
      <>
        <div style={{ margin: '0 auto' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'lightgray',
              borderRadius: 'var(--radius-sm)',
            }}
          ></div>
        </div>
        <strong>Card title</strong>
        <span>Card content goes here.</span>
        <span>More content...</span>
      </>
    ),
  },
};
