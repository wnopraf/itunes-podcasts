import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import type { Episode } from '@/modules/podcasts/domain/Episode';
import { Card } from '@/shared/presentation/components/Card/Card';
import styles from './EpisodeDetail.module.css';

type EpisodeDetailProps = {
  episode: Episode;
};

export const EpisodeDetail = ({ episode }: EpisodeDetailProps) => {
  const sanitizedDescription = useMemo(
    () => DOMPurify.sanitize(episode.description),
    [episode.description],
  );

  return (
    <Card className={styles.root}>
      <h3 className={styles.title}>{episode.title}</h3>
      <div className={styles.description}>
        <p>{sanitizedDescription}</p>
      </div>
      <hr className={styles.divider} />
      <audio controls preload="metadata" src={episode.url} className={styles.player} />
    </Card>
  );
};
