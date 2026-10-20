import type { Decorator } from '@storybook/react-vite';
import { OutletContextProvider } from './OutletContextProvider';

export const withOutletContext =
  <T,>(context: T, path?: string): Decorator =>
  (Story) => (
    <OutletContextProvider context={context} path={path}>
      <Story />
    </OutletContextProvider>
  );
