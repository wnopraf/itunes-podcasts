import { useEffect, useState } from 'react';
import { useLoadingTracker } from '../contexts/LoadingContext';

const toError = (error: unknown) => (error instanceof Error ? error : new Error(String(error)));

type AsyncDataOptions = {
  enabled?: boolean;
};

export const useAsyncData = <T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  { enabled = true }: AsyncDataOptions = {},
): T | null => {
  const { startLoad, endLoad } = useLoadingTracker();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const loadData = async () => {
      startLoad();
      setError(null);
      try {
        const result = await fetcher(controller.signal);
        if (!controller.signal.aborted) setData(result);
      } catch (err) {
        if (!controller.signal.aborted) setError(toError(err));
      }
      endLoad();
    };

    loadData();

    return () => controller.abort();
  }, [enabled, fetcher, startLoad, endLoad]);

  if (error) throw error;
  return data;
};
