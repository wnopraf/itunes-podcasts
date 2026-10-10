import type { Episode } from '@/modules/podcasts/domain/Episode';
import type { EpisodeApiDto, PodcastDetailResponseApiDto } from '../types/EpisodeApiDto';
import type { PodcastLookupApiDto } from '../types/PodcastApiDto';

export const mapEpisodeApiDtoToEpisode = (dto: PodcastDetailResponseApiDto): Episode[] => {
  if (!dto.results.length) {
    return [];
  }
  const results: (PodcastLookupApiDto | EpisodeApiDto)[] = dto.results;
  return results
    .filter((episode): episode is EpisodeApiDto => episode.wrapperType === 'podcastEpisode')
    .map((episode) => ({
      id: episode.trackId.toString(),
      title: episode.trackName,
      description: episode.description ?? episode.shortDescription ?? '',
      durationMs: episode.trackTimeMillis,
      pubDate: new Date(episode.releaseDate),
      url: episode.episodeUrl,
      podcastId: episode.collectionId.toString(),
    }));
};
