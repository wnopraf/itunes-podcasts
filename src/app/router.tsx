import { createBrowserRouter, type RouteObject } from 'react-router';
import { RootLayout } from '@/app/layouts/RootLayout';
import { PodcastDetailLayout } from '@/modules/podcasts/presentation/layouts/PodcastDetailLayout';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { EpisodeListPage } from '@/pages/EpisodeListPage/EpisodeListPage';
import { EpisodePlayerPage } from '@/pages/EpisodePlayerPage/EpisodePlayerPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PodcastListPage } from '@/pages/PodcastListPage/PodcastListPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
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
];

export const router = createBrowserRouter(routes);
