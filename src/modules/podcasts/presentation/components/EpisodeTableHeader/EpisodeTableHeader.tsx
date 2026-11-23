import { Card } from '@/shared/presentation/components/Card/Card';
import styles from './EpisodeTableHeader.module.css';

type EpisodeTableHeaderProps = {
  episodeCount: number;
};

export const EpisodeTableHeader = ({ episodeCount }: EpisodeTableHeaderProps) => (
  <Card className={styles.root}>
    <h2 className={styles.content}>Episodes: {episodeCount}</h2>
  </Card>
);
