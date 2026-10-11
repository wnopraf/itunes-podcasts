import { createBrowserRouter } from 'react-router';
import { AppLayout } from '@/layouts/AppLayout';
import { PodcastDetailLayout } from '@/layouts/PodcastDetailLayout';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { EpisodeListPage } from '@/pages/EpisodeListPage';
import { EpisodePlayerPage } from '@/pages/EpisodePlayerPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PodcastListPage } from '@/pages/PodcastListPage';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { path: PODCAST_PATHS.HOME, Component: PodcastListPage },
      {
        path: PODCAST_PATHS.PODCAST,
        Component: PodcastDetailLayout,
        children: [
          { index: true, Component: EpisodeListPage },
          { path: PODCAST_PATHS.EPISODE, Component: EpisodePlayerPage },
        ],
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
