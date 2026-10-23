import type { ComponentProps } from 'react';
import { Input } from '@/shared/presentation/components/Input/Input';
import styles from './PodcastSearch.module.css';

type PodcastSearchProps = { podcastCount: number } & ComponentProps<typeof Input>;

export const PodcastSearch = ({ podcastCount, ...rest }: PodcastSearchProps) => {
  return (
    <div className={styles.root}>
      <output
        className={styles.count}
        aria-label={`${podcastCount} ${podcastCount === 1 ? 'result' : 'results'}`}
      >
        {podcastCount}
      </output>
      <Input placeholder={`Filter podcasts...`} {...rest} hideLabel />
    </div>
  );
};
