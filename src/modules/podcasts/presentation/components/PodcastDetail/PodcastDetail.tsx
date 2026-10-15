import { Link } from 'react-router';
import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import { Card } from '@/shared/presentation/components/Card/Card';
import styles from './PodcastDetail.module.css';
import { toPodcast } from '../../utils/routes';

type PodcastDetailProps = {
  podcast: Podcast;
};

export const PodcastDetail = ({ podcast }: PodcastDetailProps) => (
  <Card>
    <Link to={toPodcast(podcast.id)} className="link">
      <div className={styles.imageContainer}>
        <img src={podcast.imageUrl} alt={podcast.title} className={styles.image} />
      </div>
    </Link>
    <hr className={styles.divider} />
    <div className={styles.section}>
      <Link to={toPodcast(podcast.id)} className="link">
        <h3 className={styles.title}>{podcast.title}</h3>
        <p className={styles.author}>{podcast.author}</p>
      </Link>
    </div>
    <hr className={styles.divider} />
    <div className={styles.section}>
      <p className={styles.label}>Descripción</p>
      <p className={styles.description}>{podcast.description}</p>
    </div>
  </Card>
);
