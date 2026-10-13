import { Link, Outlet } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import styles from './AppLayout.module.css';

export const AppLayout = () => (
  <>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to={PODCAST_PATHS.HOME} className={styles.brand}>
          Podcaster
        </Link>
      </div>
    </header>
    <main className={styles.main}>
      <Outlet />
    </main>
  </>
);
