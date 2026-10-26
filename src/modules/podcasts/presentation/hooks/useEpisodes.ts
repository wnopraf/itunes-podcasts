import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { Episode } from '../../domain/Episode';
import { usePodcastCacheReader } from '../contexts/PodcastCacheReaderContext';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const useEpisodes = (podcastId: string): Episode[] | null => {
  const repository = usePodcastRepository();
  const cacheReader = usePodcastCacheReader();
  const cachedEpisodes = useMemo(
    () => cacheReader?.getEpisodes(podcastId) ?? null,
    [cacheReader, podcastId],
  );
  const fetchEpisodes = useCallback(
    (signal: AbortSignal) => repository.getEpisodes(podcastId, signal),
    [repository, podcastId],
  );
  const fetchedEpisodes = useAsyncData(fetchEpisodes, { enabled: !cachedEpisodes });
  return cachedEpisodes ?? fetchedEpisodes;
};
