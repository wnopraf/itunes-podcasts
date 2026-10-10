interface ApiQueryParams {
  limit: number;
}

interface PodcastsApiQueryParams extends ApiQueryParams {
  genre: number;
}
type PodcastDetailApiQueryParams = ApiQueryParams;

const PODCASTS_API_QUERY_DEFAULT = {
  limit: 100,
  genre: 1310,
} as const satisfies PodcastsApiQueryParams;

const PODCAST_DETAIL_API_QUERY_DEFAULT = {
  limit: 20,
} as const satisfies PodcastDetailApiQueryParams;

const PODCASTS_API_PATH = '/us/rss/toppodcasts/limit={limit}/genre={genre}/json';
const PODCAST_DETAIL_API_PATH = '/lookup?id={id}&media=podcast&entity=podcastEpisode&limit={limit}';

export class ItunesUrlBuilder {
  private readonly apiUrl: string;
  private readonly proxyUrl: string;

  constructor(proxyUrl: string, apiUrl: string) {
    this.apiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    this.proxyUrl = proxyUrl;
  }

  private buildPodcastsPath(queryParams: Partial<PodcastsApiQueryParams>) {
    const { limit, genre } = { ...PODCASTS_API_QUERY_DEFAULT, ...queryParams };
    return PODCASTS_API_PATH.replace('{limit}', limit.toString()).replace(
      '{genre}',
      genre.toString(),
    );
  }

  private buildPodcastDetailPath(podcastId: string) {
    return PODCAST_DETAIL_API_PATH.replace('{id}', encodeURIComponent(podcastId)).replace(
      '{limit}',
      PODCAST_DETAIL_API_QUERY_DEFAULT.limit.toString(),
    );
  }

  private withProxy(targetUrl: string) {
    const url = new URL(this.proxyUrl);
    url.searchParams.set('url', targetUrl);
    return url.toString();
  }

  podcastsList(queryParams: Partial<PodcastsApiQueryParams> = {}) {
    return this.withProxy(this.apiUrl + this.buildPodcastsPath(queryParams));
  }

  podcastDetail(podcastId: string) {
    return this.withProxy(this.apiUrl + this.buildPodcastDetailPath(podcastId));
  }
}
