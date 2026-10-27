import { useState, useMemo, useDeferredValue } from 'react';
import { useTopPodcasts } from '@/modules/podcasts/presentation/hooks/useTopPodcasts';
import { filterPodcasts } from '@/modules/podcasts/presentation/utils/filterPodcasts';
import { PodcastSearch } from '@/modules/podcasts/presentation/components/PodcastSearch/PodcastSearch';
import { PodcastGrid } from '@/modules/podcasts/presentation/components/PodcastGrid/PodcastGrid';
import { PodcastGridSkeleton } from '@/modules/podcasts/presentation/components/PodcastGrid/PodcastGridSkeleton';
import styles from './PodcastListPage.module.css';

export const PodcastListPage = () => {
  const podcasts = useTopPodcasts();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isFiltering = deferredQuery !== query;
  const hasPodcasts = useMemo(() => !!podcasts, [podcasts]);
  const filteredPodcasts = useMemo(() => {
    return hasPodcasts ? filterPodcasts(podcasts!, deferredQuery) : [];
  }, [hasPodcasts, podcasts, deferredQuery]);
  const hasFilteredResults = filteredPodcasts.length > 0;
  const resultsClassName = [styles.results, isFiltering && styles.stale].filter(Boolean).join(' ');

  if (!hasPodcasts) {
    return (
      <section className={styles.root}>
        <PodcastGridSkeleton />
      </section>
    );
  }
  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <PodcastSearch
          podcastCount={filteredPodcasts.length}
          label="Search podcasts"
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
      </header>
      <div className={resultsClassName} aria-busy={isFiltering}>
        {hasFilteredResults ? (
          <PodcastGrid podcasts={filteredPodcasts} />
        ) : (
          <p className={styles.empty}>No results found matching "{deferredQuery}"</p>
        )}
      </div>
    </section>
  );
};
