import type { Podcast } from '../domain/Podcast';
import type { PodcastDetail } from '../domain/PodcastDetail';
import { PodcastNotFoundError } from '../domain/PodcastNotFoundError';
import type { PodcastRepository } from '../domain/PodcastRepository';
import type { ItunesUrlBuilder } from './ItunesUrlBuilder';
import { mapPodcastDetailApiDtoToPodcastDetail } from './mappers/PodcastDetailMapper';
import { mapPodcastApiDtoToPodcast } from './mappers/PodcastMapper';
import type { PodcastDetailResponseApiDto } from './types/PodcastDetailApiDto';
import type { PodcastsResponseApiDto } from './types/PodcastApiDto';

export class ItunesPodcastRepository implements PodcastRepository {
  private readonly urlBuilder: ItunesUrlBuilder;

  constructor(urlBuilder: ItunesUrlBuilder) {
    this.urlBuilder = urlBuilder;
  }

  async getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]> {
    const url = this.urlBuilder.podcastsList();
    try {
      const dto = await this.fetchJson<PodcastsResponseApiDto>(url, signal);
      return mapPodcastApiDtoToPodcast(dto);
    } catch (error) {
      if (!signal?.aborted) console.error('[ItunesPodcastRepository] getTopPodcasts', error);
      throw error;
    }
  }

  async getPodcastDetail(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail> {
    const url = this.urlBuilder.podcastDetail(podcastId);
    try {
      const dto = await this.fetchJson<PodcastDetailResponseApiDto>(url, signal);
      const detail = mapPodcastDetailApiDtoToPodcastDetail(dto);
      if (!detail) throw new PodcastNotFoundError(podcastId);
      return detail;
    } catch (error) {
      if (!signal?.aborted && !(error instanceof PodcastNotFoundError)) {
        console.error('[ItunesPodcastRepository] getPodcastDetail', error);
      }
      throw error;
    }
  }

  private async fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}: ${url}`);
    return response.json() as Promise<T>;
  }
}
