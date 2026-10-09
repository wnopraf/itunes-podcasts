import type { Podcast } from './Podcast';
import type { Episode } from './Episode';

export interface PodcastRepository {
  getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]>;
  getEpisodes(id: string, signal?: AbortSignal): Promise<Episode[]>;
}
