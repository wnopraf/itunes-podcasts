import { useTopPodcasts } from './useTopPodcasts';

export const usePodcast = (podcastId: string) => {
  const podcasts = useTopPodcasts();
  return podcasts?.find((podcast) => podcast.id === podcastId) ?? null;
};
