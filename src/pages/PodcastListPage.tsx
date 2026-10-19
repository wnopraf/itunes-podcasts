import { useState, useMemo, useDeferredValue } from 'react';
import { useTopPodcasts } from '@/modules/podcasts/presentation/hooks/useTopPodcasts';
import { filterPodcasts } from '@/modules/podcasts/presentation/utils/filterPodcasts';
import { PodcastSearch } from '@/modules/podcasts/presentation/components/PodcastSearch/PodcastSearch';
import { PodcastGrid } from '@/modules/podcasts/presentation/components/PodcastGrid/PodcastGrid';

export const PodcastListPage = () => {
  const podcasts = useTopPodcasts();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isFiltering = deferredQuery !== query;
  const hasPodcasts = !!podcasts;
  const hasResults = hasPodcasts && podcasts.length > 0;
  const filteredPodcasts = useMemo(() => {
    return podcasts ? filterPodcasts(podcasts, deferredQuery) : [];
  }, [podcasts, deferredQuery]);

  if (!hasPodcasts) {
    return <div>fale skeleton</div>;
  }
  return (
    <section>
      <header>
        <PodcastSearch
          podcastCount={podcasts.length}
          label="Search podcasts"
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
      </header>
      {isFiltering && <div>fale skeleton</div>}
      {!isFiltering && !hasResults && <p>No results found matching "{query}"</p>}
      {!isFiltering && hasResults && <PodcastGrid podcasts={filteredPodcasts} />}
    </section>
  );
};
