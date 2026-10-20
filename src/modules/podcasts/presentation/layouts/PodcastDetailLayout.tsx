import { Outlet, useParams } from 'react-router';
import styles from './PodcastDetailLayout.module.css';
import { PodcastDetail } from '../components/PodcastDetail/PodcastDetail';
import type { PodcastOutletContext } from '../contexts/PodcastOutletContext';
import { useEpisodes } from '../hooks/useEpisodes';
import { usePodcast } from '../hooks/usePodcast';

export const PodcastDetailLayout = () => {
  const { podcastId = '' } = useParams();
  const podcast = usePodcast(podcastId);
  const episodes = useEpisodes(podcastId);

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>{podcast && <PodcastDetail podcast={podcast} />}</aside>
      <section className={styles.content}>
        <Outlet context={{ podcast, episodes } satisfies PodcastOutletContext} />
      </section>
    </div>
  );
};
