import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { PodcastNotFoundError } from '@/modules/podcasts/domain/PodcastNotFoundError';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { NotFoundPage } from './NotFoundPage';

export const RouteErrorPage = () => {
  const error = useRouteError();
  if (error instanceof PodcastNotFoundError) return <NotFoundPage />;

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unexpected error';

  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{message}</p>
      <Link to={PODCAST_PATHS.HOME}>Back to podcasts</Link>
    </section>
  );
};
