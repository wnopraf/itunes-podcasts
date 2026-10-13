import { Outlet, useParams } from 'react-router';
import styles from './PodcastDetailLayout.module.css';

export const PodcastDetailLayout = () => {
  const { podcastId = '' } = useParams();

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>Podcast {podcastId}</aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};
