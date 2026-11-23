import { Link } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import { PageTitle } from '@/shared/presentation/components/PageTitle/PageTitle';

export const NotFoundPage = () => (
  <section>
    <PageTitle title="Page not found" />
    <h1>Page not found</h1>
    <Link to={PODCAST_PATHS.HOME}>Back to podcasts</Link>
  </section>
);
