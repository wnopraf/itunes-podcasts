import { useOutletContext } from 'react-router';
import type { Episode } from '../../domain/Episode';
import type { Podcast } from '../../domain/Podcast';

export interface PodcastOutletContext {
  podcast: Podcast | null;
  episodes: Episode[] | null;
}

export const usePodcastOutletContext = () => useOutletContext<PodcastOutletContext>();
