import { useMemo, useState, type PropsWithChildren } from 'react';
import {
  LoadingStateContext,
  LoadingTrackerContext,
  type LoadingTracker,
} from '../contexts/LoadingContext';

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const tracker = useMemo<LoadingTracker>(
    () => ({
      startLoad: () => setLoadingCount((count) => count + 1),
      endLoad: () => setLoadingCount((count) => (count > 0 ? count - 1 : 0)),
    }),
    [],
  );

  return (
    <LoadingTrackerContext value={tracker}>
      <LoadingStateContext value={loadingCount > 0}>{children}</LoadingStateContext>
    </LoadingTrackerContext>
  );
};
