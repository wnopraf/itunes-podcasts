import { Card } from '@/shared/presentation/components/Card/Card';
import { Skeleton } from '@/shared/presentation/components/Skeleton/Skeleton';
import styles from './EpisodeDetail.module.css';

const AUDIO_PLAYER_HEIGHT = '3.375rem';

export const EpisodeDetailSkeleton = () => (
  <Card className={styles.root} aria-busy="true" aria-label="Loading episode">
    <div className={styles.title}>
      <Skeleton width="60%" />
    </div>
    <div className={styles.description}>
      <Skeleton />
      <Skeleton />
      <Skeleton width="80%" />
    </div>
    <hr className={styles.divider} />
    <Skeleton height={AUDIO_PLAYER_HEIGHT} />
  </Card>
);
