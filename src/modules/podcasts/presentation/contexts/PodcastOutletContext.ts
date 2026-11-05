import { useOutletContext } from 'react-router';
import type { PodcastDetail } from '../../domain/PodcastDetail';

export interface PodcastOutletContext {
  detail: PodcastDetail | null;
}

export const usePodcastOutletContext = () => useOutletContext<PodcastOutletContext>();
