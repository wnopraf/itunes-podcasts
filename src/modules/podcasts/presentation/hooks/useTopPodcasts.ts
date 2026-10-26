import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { Podcast } from '../../domain/Podcast';
import { usePodcastCacheReader } from '../contexts/PodcastCacheReaderContext';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useTopPodcasts = (): Podcast[] | null => {
  const repository = usePodcastRepository();
  const cacheReader = usePodcastCacheReader();
  const cachedPodcasts = useMemo(() => cacheReader?.getTopPodcasts() ?? null, [cacheReader]);
  const fetchPodcasts = useCallback(
    (signal: AbortSignal) => repository.getTopPodcasts(signal),
    [repository],
  );
  const fetchedPodcasts = useAsyncData(fetchPodcasts, { enabled: !cachedPodcasts });
  return cachedPodcasts ?? fetchedPodcasts;
};
