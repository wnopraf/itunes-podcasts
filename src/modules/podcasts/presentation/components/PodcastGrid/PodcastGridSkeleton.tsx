import { Card } from '@/shared/presentation/components/Card/Card';
import { Skeleton } from '@/shared/presentation/components/Skeleton/Skeleton';
import cardStyles from '../PodcastCard/PodcastCard.module.css';
import styles from './PodcastGrid.module.css';

type PodcastGridSkeletonProps = {
  count?: number;
};

export const PodcastGridSkeleton = ({ count = 8 }: PodcastGridSkeletonProps) => (
  <ul role="list" className={styles.root} aria-busy="true" aria-label="Loading podcasts">
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className={styles.item}>
        <Card className={cardStyles.content}>
          <Skeleton
            className={cardStyles.image}
            width="var(--image-size)"
            height="var(--image-size)"
            radius="var(--radius-full)"
          />
          <Skeleton className={cardStyles.title} width="80%" />
          <Skeleton className={cardStyles.author} width="50%" />
        </Card>
      </li>
    ))}
  </ul>
);
