import { useState, type PropsWithChildren } from 'react';
import { LoadingSetterContext, LoadingStateContext } from '../contexts/LoadingContext';

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingSetterContext value={setIsLoading}>
      <LoadingStateContext value={isLoading}>{children}</LoadingStateContext>
    </LoadingSetterContext>
  );
};
