import { Outlet, useParams } from 'react-router';
import styles from './PodcastDetailLayout.module.css';
import { PodcastDetail } from '../components/PodcastDetail/PodcastDetail';
import { PodcastDetailSkeleton } from '../components/PodcastDetail/PodcastDetailSkeleton';
import type { PodcastOutletContext } from '../contexts/PodcastOutletContext';
import { usePodcastDetail } from '../hooks/usePodcastDetail';

export const PodcastDetailLayout = () => {
  const { podcastId = '' } = useParams();
  const detail = usePodcastDetail(podcastId);

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        {detail ? <PodcastDetail podcast={detail.podcast} /> : <PodcastDetailSkeleton />}
      </aside>
      <section className={styles.content}>
        <Outlet context={{ detail } satisfies PodcastOutletContext} />
      </section>
    </div>
  );
};
