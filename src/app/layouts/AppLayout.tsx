import { Link, Outlet } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import styles from './AppLayout.module.css';

export const AppLayout = () => (
  <div>
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link to={PODCAST_PATHS.HOME} className={styles.brand}>
          Podcaster
        </Link>
      </div>
    </header>
    <main className={`container ${styles.main}`}>
      <Outlet />
    </main>
  </div>
);
