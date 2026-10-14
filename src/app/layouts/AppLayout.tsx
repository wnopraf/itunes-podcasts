import { Link, Outlet } from 'react-router';
import { PODCAST_PATHS } from '@/modules/podcasts/presentation/utils/routes';
import styles from './AppLayout.module.css';
import { Loader } from '@/shared/presentation/components/Loader/Loader';
import { useIsLoading } from '@/shared/presentation/contexts/LoadingContext';

export const AppLayout = () => {
  const isLoading = useIsLoading();
  return (
    <div>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link to={PODCAST_PATHS.HOME} className={styles.brand}>
            Podcaster
          </Link>
          {isLoading && <Loader />}
        </div>
      </header>
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
    </div>
  );
};
