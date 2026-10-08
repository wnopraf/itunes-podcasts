interface PodcastsQueryDefaults {
  limit: number;
  genre: number;
}
interface EpisodeQueryDefaults {
  limit: number;
}
interface ApiQueryParams {
  podcasts: PodcastsQueryDefaults;
  episodes: EpisodeQueryDefaults;
}
const APIQUERYDEFAULTS: Readonly<ApiQueryParams> = {
  podcasts: {
    limit: 100,
    genre: 1310,
  },
  episodes: {
    limit: 20,
  },
} as const;

export class ApiEndpoints {
  private readonly DEFAULTS: Readonly<ApiQueryParams> = APIQUERYDEFAULTS;
  private baseUrl: string;

  constructor(proxyUrl: string, apiUrl: string) {
    this.baseUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;
  }

  topPodcasts(queryParams: Readonly<ApiQueryParams> = this.DEFAULTS) {
    return `${this.baseUrl}/us/rss/toppodcasts/limit=${queryParams.podcasts.limit}/genre=${queryParams.podcasts.genre}/json`;
  }

  podcastDetail(podcastId: string) {
    return `${this.baseUrl}/lookup?id=${encodeURIComponent(podcastId)}&media=podcast&entity=podcastEpisode&limit=${this.DEFAULTS.episodes.limit}`;
  }
}
