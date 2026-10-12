import { useCallback } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { Podcast } from '../../domain/Podcast';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useTopPodcasts = (): Podcast[] | null => {
  const repository = usePodcastRepository();
  const fetchPodcasts = useCallback(
    (signal: AbortSignal) => repository.getTopPodcasts(signal),
    [repository],
  );
  return useAsyncData(fetchPodcasts);
};
