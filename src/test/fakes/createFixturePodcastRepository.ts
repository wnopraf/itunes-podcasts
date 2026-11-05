import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { fixturePodcastDetail, fixturePodcasts } from '../fixtures/podcastFixtures';
import { sleep } from './utils';

export const createFixturePodcastRepository = (): PodcastRepository => ({
  getTopPodcasts: async () => {
    await sleep(500);
    return fixturePodcasts;
  },
  getPodcastDetail: async (_podcastId) => {
    await sleep(500);
    void _podcastId;
    return fixturePodcastDetail;
  },
});
