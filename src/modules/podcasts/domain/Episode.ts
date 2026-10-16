export interface Episode {
  id: number;
  title: string;
  description: string;
  durationMs?: number;
  pubDate: Date;
  url: string;
  podcastId: number;
}
