import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import { GetPodcastDetail } from '../../application/GetPodcastDetail';
import type { PodcastDetail } from '../../domain/PodcastDetail';
import { usePodcastCacheReader } from '../contexts/PodcastCacheReaderContext';
import { usePodcastRepository } from '../contexts/PodcastRepositoryContext';

export const usePodcastDetail = (podcastId: string): PodcastDetail | null => {
  const repository = usePodcastRepository();
  const cacheReader = usePodcastCacheReader();
  const getPodcastDetail = useMemo(
    () => new GetPodcastDetail(repository, cacheReader),
    [repository, cacheReader],
  );
  const cachedDetail = useMemo(
    () => getPodcastDetail.getCached(podcastId),
    [getPodcastDetail, podcastId],
  );
  const fetchDetail = useCallback(
    (signal: AbortSignal) => getPodcastDetail.execute(podcastId, signal),
    [getPodcastDetail, podcastId],
  );
  const fetchedDetail = useAsyncData(fetchDetail, { enabled: !cachedDetail });
  return cachedDetail ?? fetchedDetail;
};
