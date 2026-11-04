import type { Episode } from '@/modules/podcasts/domain/Episode';
import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import type { PodcastDetail } from '@/modules/podcasts/domain/PodcastDetail';
import type { PodcastLookupApiDto } from '../types/PodcastApiDto';
import type { EpisodeApiDto, PodcastDetailResponseApiDto } from '../types/PodcastDetailApiDto';

type LookupResultApiDto = PodcastLookupApiDto | EpisodeApiDto;

const isPodcast = (result: LookupResultApiDto): result is PodcastLookupApiDto =>
  result.wrapperType === 'track' && result.kind === 'podcast';

const isEpisode = (result: LookupResultApiDto): result is EpisodeApiDto =>
  result.wrapperType === 'podcastEpisode';

const mapPodcast = (dto: PodcastLookupApiDto): Podcast => ({
  id: dto.collectionId.toString(),
  title: dto.collectionName,
  author: dto.artistName,
  imageUrl: dto.artworkUrl600,
});

const mapEpisode = (dto: EpisodeApiDto): Episode => ({
  id: dto.trackId.toString(),
  title: dto.trackName,
  description: dto.description ?? dto.shortDescription ?? '',
  durationMs: dto.trackTimeMillis,
  pubDate: new Date(dto.releaseDate),
  url: dto.episodeUrl,
  podcastId: dto.collectionId.toString(),
});

export const mapPodcastDetailApiDtoToPodcastDetail = (
  dto: PodcastDetailResponseApiDto,
): PodcastDetail | null => {
  const results: LookupResultApiDto[] = dto.results;
  const podcast = results.find(isPodcast);
  if (!podcast) return null;

  return {
    podcast: mapPodcast(podcast),
    episodes: results.filter(isEpisode).map(mapEpisode),
  };
};
