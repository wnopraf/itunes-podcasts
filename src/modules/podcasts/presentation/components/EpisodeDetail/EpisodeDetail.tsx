import type { Episode } from '@/modules/podcasts/domain/Episode';
import { Card } from '@/shared/presentation/components/Card/Card';
import styles from './EpisodeDetail.module.css';

type EpisodeDetailProps = {
  episode: Episode;
};

export const EpisodeDetail = ({ episode }: EpisodeDetailProps) => (
  <Card className={styles.root}>
    <h3 className={styles.title}>{episode.title}</h3>
    <p className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    <hr className={styles.divider} />
    <audio controls preload="metadata" src={episode.url} className={styles.player} />
  </Card>
);
