import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';
import type { PodcastRepository } from '../domain/PodcastRepository';
import type { ItunesUrlBuilder } from './ItunesUrlBuilder';
import { mapEpisodeApiDtoToEpisode } from './mappers/EpisodeMapper';
import { mapPodcastApiDtoToPodcast } from './mappers/PodcastMapper';
import type { PodcastDetailResponseApiDto } from './types/EpisodeApiDto';
import type { PodcastsResponseApiDto } from './types/PodcastApiDto';

export class ItunesPodcastRepository implements PodcastRepository {
  private readonly urlBuilder: ItunesUrlBuilder;

  constructor(urlBuilder: ItunesUrlBuilder) {
    this.urlBuilder = urlBuilder;
  }

  async getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]> {
    const url = this.urlBuilder.podcastsList();
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}: ${url}`);
      const dto: PodcastsResponseApiDto = await response.json();
      return mapPodcastApiDtoToPodcast(dto);
    } catch (error) {
      if (!signal?.aborted) console.error('[ItunesPodcastRepository] getTopPodcasts', error);
      throw error;
    }
  }

  async getEpisodes(podcastId: string, signal?: AbortSignal): Promise<Episode[]> {
    const url = this.urlBuilder.podcastDetail(podcastId);
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}: ${url}`);
      const dto: PodcastDetailResponseApiDto = await response.json();
      return mapEpisodeApiDtoToEpisode(dto);
    } catch (error) {
      if (!signal?.aborted) console.error('[ItunesPodcastRepository] getEpisodes', error);
      throw error;
    }
  }
}
