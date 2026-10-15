import { Link } from 'react-router';
import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import { Card } from '@/shared/presentation/components/Card/Card';
import { toPodcast } from '../../utils/routes';
import styles from './PodcastCard.module.css';

type PodcastCardProps = {
  podcast: Podcast;
};

export const PodcastCard = ({ podcast }: PodcastCardProps) => (
  <Link to={toPodcast(podcast.id)} className={styles.root}>
    <Card className={styles.content}>
      <img src={podcast.imageUrl} alt={podcast.title} className={styles.image} />
      <h3 className={styles.title}>{podcast.title}</h3>
      <p className={styles.author}>Author: {podcast.author}</p>
    </Card>
  </Link>
);

PodcastCard.displayName = 'PodcastCard';
