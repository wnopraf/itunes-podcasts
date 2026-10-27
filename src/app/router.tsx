import { createBrowserRouter, type RouteObject } from 'react-router';
import { RootLayout } from '@/app/layouts/RootLayout';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { Loader } from '@/shared/presentation/components/Loader/Loader';

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [
      {
        ErrorBoundary: RouteErrorPage,
        HydrateFallback: Loader,
        children: [
          {
            path: PODCAST_PATHS.HOME,
            lazy: async () => ({
              Component: (await import('@/pages/PodcastListPage/PodcastListPage')).PodcastListPage,
            }),
          },
          {
            path: PODCAST_PATHS.PODCAST,
            lazy: async () => ({
              Component: (
                await import('@/modules/podcasts/presentation/layouts/PodcastDetailLayout')
              ).PodcastDetailLayout,
            }),
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import('@/pages/EpisodeListPage/EpisodeListPage'))
                    .EpisodeListPage,
                }),
              },
              {
                path: PODCAST_PATHS.EPISODE,
                lazy: async () => ({
                  Component: (await import('@/pages/EpisodePlayerPage/EpisodePlayerPage'))
                    .EpisodePlayerPage,
                }),
              },
            ],
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
