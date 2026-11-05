import { generatePath } from 'react-router';

export const PODCAST_PATHS = {
  HOME: '/',
  PODCAST: '/podcast/:podcastId',
  EPISODE: '/podcast/:podcastId/episode/:episodeId',
} as const;

export const toPodcast = (podcastId: string) => generatePath(PODCAST_PATHS.PODCAST, { podcastId });

export const toEpisode = (podcastId: string, episodeId: string) =>
  generatePath(PODCAST_PATHS.EPISODE, { podcastId, episodeId });
