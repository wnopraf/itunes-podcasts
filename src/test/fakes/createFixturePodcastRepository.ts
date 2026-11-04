import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import {
  fixtureEpisodes,
  fixturePodcastDetail,
  fixturePodcasts,
} from '../fixtures/podcastFixtures';
import { sleep } from './utils';

export const createFixturePodcastRepository = (): PodcastRepository => ({
  getTopPodcasts: async () => {
    await sleep(500);
    return fixturePodcasts;
  },
  getEpisodes: async (_podcastId) => {
    await sleep(500);
    void _podcastId;
    return fixtureEpisodes;
  },
  getPodcastDetail: async (_podcastId) => {
    await sleep(500);
    void _podcastId;
    return fixturePodcastDetail;
  },
});
