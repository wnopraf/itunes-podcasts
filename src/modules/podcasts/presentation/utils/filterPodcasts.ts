import type { Podcast } from '../../domain/Podcast';

export const filterPodcasts = (podcasts: Podcast[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  return podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(normalizedQuery) ||
      podcast.author.toLowerCase().includes(normalizedQuery),
  );
};
