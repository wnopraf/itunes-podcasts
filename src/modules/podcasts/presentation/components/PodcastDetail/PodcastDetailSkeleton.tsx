import { Card } from '@/shared/presentation/components/Card/Card';
import { Skeleton } from '@/shared/presentation/components/Skeleton/Skeleton';
import styles from './PodcastDetail.module.css';

export const PodcastDetailSkeleton = () => (
  <Card aria-busy="true" aria-label="Loading podcast">
    <div className={styles.imageContainer}>
      <Skeleton className={styles.image} height="auto" />
    </div>
    <hr className={styles.divider} />
    <div className={styles.section}>
      <Skeleton width="80%" />
      <Skeleton width="50%" />
    </div>
    <hr className={styles.divider} />
    <div className={styles.section}>
      <Skeleton width="40%" />
      <Skeleton />
      <Skeleton />
      <Skeleton width="70%" />
    </div>
  </Card>
);
