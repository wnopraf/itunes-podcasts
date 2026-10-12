import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';

export const RouteErrorPage = () => {
  const error = useRouteError();
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
