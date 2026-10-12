import { useCallback } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { Episode } from '../../domain/Episode';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useEpisodes = (podcastId: string): Episode[] | null => {
  const repository = usePodcastRepository();
  const fetchEpisodes = useCallback(
    (signal: AbortSignal) => repository.getEpisodes(podcastId, signal),
    [repository, podcastId],
  );
  return useAsyncData(fetchEpisodes);
};
