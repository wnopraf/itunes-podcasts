import { Link } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';

export const NotFoundPage = () => (
  <section>
    <h1>Page not found</h1>
    <Link to={PODCAST_PATHS.HOME}>Back to podcasts</Link>
  </section>
);
