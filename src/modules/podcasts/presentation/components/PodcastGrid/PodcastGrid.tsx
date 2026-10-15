import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import { PodcastCard } from '../PodcastCard/PodcastCard';
import styles from './PodcastGrid.module.css';

type PodcastGridProps = {
  podcasts: Podcast[];
};

export const PodcastGrid = ({ podcasts }: PodcastGridProps) => (
  <ul role="list" className={styles.root}>
    {podcasts.map((podcast) => (
      <li key={podcast.id} className={styles.item}>
        <PodcastCard podcast={podcast} />
      </li>
    ))}
  </ul>
);

PodcastGrid.displayName = 'PodcastGrid';
