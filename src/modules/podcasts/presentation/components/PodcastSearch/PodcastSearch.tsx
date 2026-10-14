import React from 'react';
import { Input } from '@/shared/presentation/components/Input/Input';
import styles from './PodcastSearch.module.css';

type props = { podcastCount: string } & React.ComponentProps<typeof Input>;
export const PodcastSearch: React.FC<props> = ({ podcastCount, ...rest }) => {
  return (
    <div className={styles.root}>
      <span className={styles.count}>{podcastCount}</span>
      <Input placeholder={`Search podcasts`} {...rest} />
    </div>
  );
};
