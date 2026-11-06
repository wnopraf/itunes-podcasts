import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import { GetTopPodcasts } from '../../application/GetTopPodcasts';
import type { Podcast } from '../../domain/Podcast';
import { usePodcastCacheReader } from '../contexts/PodcastCacheReaderContext';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useTopPodcasts = (): Podcast[] | null => {
  const repository = usePodcastRepository();
  const cacheReader = usePodcastCacheReader();
  const getTopPodcasts = useMemo(
    () => new GetTopPodcasts(repository, cacheReader),
    [repository, cacheReader],
  );
  const cachedPodcasts = useMemo(() => getTopPodcasts.getCached(), [getTopPodcasts]);
  const fetchPodcasts = useCallback(
    (signal: AbortSignal) => getTopPodcasts.execute(signal),
    [getTopPodcasts],
  );
  const fetchedPodcasts = useAsyncData(fetchPodcasts, { enabled: !cachedPodcasts });
  return cachedPodcasts ?? fetchedPodcasts;
};
