import type { Podcast } from '../../domain/Podcast';

export const filterPodcasts = (podcasts: Podcast[], query: string) => {
  return podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(query.toLowerCase()) ||
      podcast.author.toLowerCase().includes(query.toLowerCase()),
  );
};
