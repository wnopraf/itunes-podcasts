import { createContext, use, type Dispatch, type SetStateAction } from 'react';

export const LoadingStateContext = createContext<boolean | null>(null);
export const LoadingSetterContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);

export const useIsLoading = (): boolean => {
  const isLoading = use(LoadingStateContext);
  if (isLoading === null) throw new Error('useIsLoading must be used within LoadingProvider');
  return isLoading;
};

export const useSetLoading = (): Dispatch<SetStateAction<boolean>> => {
  const setLoading = use(LoadingSetterContext);
  if (!setLoading) throw new Error('useSetLoading must be used within LoadingProvider');
  return setLoading;
};
