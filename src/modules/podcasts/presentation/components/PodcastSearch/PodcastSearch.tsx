import type { ComponentProps } from 'react';
import { Input } from '@/shared/presentation/components/Input/Input';
import styles from './PodcastSearch.module.css';

type PodcastSearchProps = { podcastCount: string } & ComponentProps<typeof Input>;

export const PodcastSearch = ({ podcastCount, ...rest }: PodcastSearchProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.count}>{podcastCount}</span>
      <Input placeholder={`Search podcasts`} {...rest} />
    </div>
  );
};

PodcastSearch.displayName = 'PodcastSearch';
