import { useState } from 'react';
import { useTopPodcasts } from '@/modules/podcasts/presentation/hooks/useTopPodcasts';
import { filterPodcasts } from '@/modules/podcasts/presentation/utils/filterPodcasts';

export const PodcastListPage = () => {
  const podcasts = useTopPodcasts();
  const [query, setQuery] = useState('');

  if (!podcasts) {
    return null;
  }
  const filteredPodcasts = filterPodcasts(podcasts, query);
  return (
    <section>
      <header>
        <div>
          <span>Search</span>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </header>
      {filteredPodcasts.length === 0 ? (
        <p>No podcasts found matching that query</p>
      ) : (
        <ul>
          {filteredPodcasts.map((podcast) => (
            <li key={podcast.id}>{podcast.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
