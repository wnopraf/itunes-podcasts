import { Card } from '@/shared/presentation/components/Card/Card';
import { Skeleton } from '@/shared/presentation/components/Skeleton/Skeleton';
import styles from './EpisodeTableHeader.module.css';

export const EpisodeTableHeaderSkeleton = () => (
  <Card className={styles.root} aria-hidden="true">
    <div className={styles.content}>
      <Skeleton width="8rem" />
    </div>
  </Card>
);
