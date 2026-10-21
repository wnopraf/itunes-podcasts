import { Link } from 'react-router';
import type { Episode } from '@/modules/podcasts/domain/Episode';
import { Card } from '@/shared/presentation/components/Card/Card';
import { formatDate, formatDuration } from '../../utils/formatters';
import { toEpisode } from '../../utils/routes';
import styles from './EpisodeTable.module.css';

type EpisodeTableProps = {
  episodes: Episode[];
};

export const EpisodeTable = ({ episodes }: EpisodeTableProps) => (
  <Card>
    <div className={styles.scroller} role="region" aria-label="Episodes" tabIndex={0}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode) => (
            <tr key={episode.id}>
              <td>
                <Link to={toEpisode(episode.podcastId, episode.id)}>{episode.title}</Link>
              </td>
              <td>{formatDate(episode.pubDate)}</td>
              <td>{formatDuration(episode.durationMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
