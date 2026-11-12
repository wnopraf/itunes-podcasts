import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { PodcastDetail } from '../../domain/PodcastDetail';
import { usePodcastUseCases } from '../contexts/PodcastUseCasesContext';

export const usePodcastDetail = (podcastId: string): PodcastDetail | null => {
  const { getPodcastDetail } = usePodcastUseCases();
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
