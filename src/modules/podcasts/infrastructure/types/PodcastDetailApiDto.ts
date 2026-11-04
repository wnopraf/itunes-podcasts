import type { PodcastLookupApiDto } from './PodcastApiDto';

export interface EpisodeApiDto {
  wrapperType: 'podcastEpisode';
  kind: 'podcast-episode';
  trackId: number;
  trackName: string;
  collectionId: number;
  collectionName: string;
  description?: string;
  shortDescription?: string;
  releaseDate: string;
  trackTimeMillis?: number;
  episodeUrl: string;
  previewUrl?: string;
  episodeFileExtension: string;
  episodeContentType: string;
  episodeGuid: string;
  feedUrl: string;
  trackViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl160: string;
  artworkUrl600: string;
  closedCaptioning: string;
  contentAdvisoryRating?: string;
  country: string;
  artistIds: number[];
  genres: { name: string; id: string }[];
}

export interface PodcastDetailResponseApiDto {
  resultCount: number;
  results: [PodcastLookupApiDto, ...EpisodeApiDto[]] | [];
}
