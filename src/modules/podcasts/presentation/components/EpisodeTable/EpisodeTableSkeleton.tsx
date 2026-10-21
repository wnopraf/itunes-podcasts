import { Card } from '@/shared/presentation/components/Card/Card';
import { Skeleton } from '@/shared/presentation/components/Skeleton/Skeleton';
import styles from './EpisodeTable.module.css';

const TITLE_WIDTHS = ['85%', '70%', '90%', '60%', '75%'];

type EpisodeTableSkeletonProps = {
  rows?: number;
};

export const EpisodeTableSkeleton = ({ rows = 10 }: EpisodeTableSkeletonProps) => (
  <Card>
    <div className={styles.scroller}>
      <table className={styles.table} aria-busy="true" aria-label="Loading episodes">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, index) => (
            <tr key={index}>
              <td>
                <Skeleton width={TITLE_WIDTHS[index % TITLE_WIDTHS.length]} />
              </td>
              <td>
                <Skeleton width="5rem" />
              </td>
              <td>
                <Skeleton width="3rem" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
