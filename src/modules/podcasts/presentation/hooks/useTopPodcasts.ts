import { useCallback, useMemo } from 'react';
import { useAsyncData } from '@/shared/presentation/hooks/useAsyncData';
import type { Podcast } from '../../domain/Podcast';
import { usePodcastUseCases } from '../contexts/PodcastUseCasesContext';

export const useTopPodcasts = (): Podcast[] | null => {
  const { getTopPodcasts } = usePodcastUseCases();
  const cachedPodcasts = useMemo(() => getTopPodcasts.getCached(), [getTopPodcasts]);
  const fetchPodcasts = useCallback(
    (signal: AbortSignal) => getTopPodcasts.execute(signal),
    [getTopPodcasts],
  );
  const fetchedPodcasts = useAsyncData(fetchPodcasts, { enabled: !cachedPodcasts });
  return cachedPodcasts ?? fetchedPodcasts;
};
