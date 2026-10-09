export interface Episode {
  id: string;
  title: string;
  description: string;
  durationMs?: number;
  pubDate: Date;
  url: string;
  podcastId: string;
}
