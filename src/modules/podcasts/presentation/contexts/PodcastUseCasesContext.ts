import { createContext, use } from 'react';
import type { PodcastUseCases } from '../../application/PodcastUseCases';

export const PodcastUseCasesContext = createContext<PodcastUseCases | null>(null);

export const usePodcastUseCases = (): PodcastUseCases => {
  const useCases = use(PodcastUseCasesContext);
  if (!useCases) {
    throw new Error('usePodcastUseCases must be used within PodcastUseCasesContext');
  }
  return useCases;
};
