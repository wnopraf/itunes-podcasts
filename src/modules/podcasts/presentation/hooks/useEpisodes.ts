import { useCallback } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useEpisodes = (podcastId: string) => {
  const repository = usePodcastRepository();
  const fetchEpisodes = useCallback(
    (signal: AbortSignal) => repository.getEpisodes(podcastId, signal),
    [repository, podcastId],
  );
  const { data, error } = useAsyncData(fetchEpisodes);
  return { episodes: data ?? [], error };
};
