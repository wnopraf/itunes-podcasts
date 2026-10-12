import { useEffect, useState } from 'react';
import { useSetLoading } from '../contexts/LoadingContext';

const toError = (error: unknown) => (error instanceof Error ? error : new Error(String(error)));

export const useAsyncData = <T>(fetcher: (signal: AbortSignal) => Promise<T>) => {
  const setLoading = useSetLoading();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(controller.signal);
        if (controller.signal.aborted) return;
        setData(result);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(toError(err));
      }

      setLoading(false);
    };

    loadData();

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [fetcher, setLoading]);

  return { data, error };
};
