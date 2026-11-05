export class PodcastNotFoundError extends Error {
  readonly podcastId: string;

  constructor(podcastId: string) {
    super(`Podcast not found: ${podcastId}`);
    this.name = 'PodcastNotFoundError';
    this.podcastId = podcastId;
  }
}
