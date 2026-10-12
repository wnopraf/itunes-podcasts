import { useCallback } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useTopPodcasts = () => {
  const repository = usePodcastRepository();
  const fetchPodcasts = useCallback(
    (signal: AbortSignal) => repository.getTopPodcasts(signal),
    [repository],
  );
  const { data, error } = useAsyncData(fetchPodcasts);
  return { podcasts: data ?? [], error };
};
