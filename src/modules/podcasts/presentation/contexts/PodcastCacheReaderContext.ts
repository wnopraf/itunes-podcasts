import { createContext, use } from 'react';
import type { PodcastCacheReader } from '../../application/ports/PodcastCacheReader';

export const PodcastCacheReaderContext = createContext<PodcastCacheReader | null>(null);

export const usePodcastCacheReader = (): PodcastCacheReader | null =>
  use(PodcastCacheReaderContext);
