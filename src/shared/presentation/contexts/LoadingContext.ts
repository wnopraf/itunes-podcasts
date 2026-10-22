import { createContext, use } from 'react';

export interface LoadingTracker {
  startLoad: () => void;
  endLoad: () => void;
}

export const LoadingStateContext = createContext<boolean | null>(null);
export const LoadingTrackerContext = createContext<LoadingTracker | null>(null);

export const useIsLoading = (): boolean => {
  const isLoading = use(LoadingStateContext);
  if (isLoading === null) throw new Error('useIsLoading must be used within LoadingProvider');
  return isLoading;
};

export const useLoadingTracker = (): LoadingTracker => {
  const tracker = use(LoadingTrackerContext);
  if (!tracker) throw new Error('useLoadingTracker must be used within LoadingProvider');
  return tracker;
};
