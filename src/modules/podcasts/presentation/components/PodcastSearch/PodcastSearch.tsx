import type { ComponentProps } from 'react';
import { Input } from '@/shared/presentation/components/Input/Input';
import styles from './PodcastSearch.module.css';

type PodcastSearchProps = { podcastCount: number } & ComponentProps<typeof Input>;

export const PodcastSearch = ({ podcastCount, ...rest }: PodcastSearchProps) => {
  const unit = podcastCount === 1 ? 'result' : 'results';
  return (
    <div className={styles.root}>
      <output className={styles.count} aria-label={`${podcastCount} ${unit}`}>
        {podcastCount}
        <span className="visually-hidden"> {unit}</span>
      </output>
      <Input placeholder={`Filter podcasts...`} {...rest} hideLabel />
    </div>
  );
};
