import type { Episode } from './Episode';
import type { Podcast } from './Podcast';

export interface PodcastDetail {
  podcast: Podcast;
  episodes: Episode[];
}
