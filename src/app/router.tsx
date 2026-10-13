import { createBrowserRouter } from 'react-router';
import { AppLayout } from '@/app/layouts/AppLayout';
import { PodcastDetailLayout } from '@/modules/podcasts/presentation/layouts/PodcastDetailLayout';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { EpisodeListPage } from '@/pages/EpisodeListPage';
import { EpisodePlayerPage } from '@/pages/EpisodePlayerPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PodcastListPage } from '@/pages/PodcastListPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        ErrorBoundary: RouteErrorPage,
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
    ],
  },
]);
