import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { AppProviders } from '../src/app/providers/AppProviders';
import { createFixturePodcastRepository } from '../src/test/fakes/createFixturePodcastRepository';
import '../src/shared/presentation/styles/index.css';

const podcastRepository = createFixturePodcastRepository();

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => (
      <AppProviders podcastRepository={podcastRepository}>
        <MemoryRouter initialEntries={parameters.router?.initialEntries}>
          <Story />
        </MemoryRouter>
      </AppProviders>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
