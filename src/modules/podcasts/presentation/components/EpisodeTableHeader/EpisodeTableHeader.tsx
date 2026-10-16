import { Card } from '@/shared/presentation/components/Card/Card';
import styles from './EpisodeTableHeader.module.css';

type EpisodeTableHeaderProps = {
  episodeCount: number;
};

export const EpisodeTableHeader = ({ episodeCount }: EpisodeTableHeaderProps) => (
  <Card className={styles.root}>
    <div className={styles.content}>Episodes: {episodeCount}</div>
  </Card>
);

EpisodeTableHeader.displayName = 'EpisodeTableHeader';
