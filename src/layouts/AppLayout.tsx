import { Link, Outlet } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';

export const AppLayout = () => (
  <>
    <header>
      <Link to={PODCAST_PATHS.HOME}>Podcaster</Link>
    </header>
    <main>
      <Outlet />
    </main>
  </>
);
