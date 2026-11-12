import { createPodcastUseCases } from '@/modules/podcasts/application/PodcastUseCases';
import { CachedPodcastRepository } from '@/modules/podcasts/infrastructure/CachedPodcastRepository';
import { ItunesPodcastRepository } from '@/modules/podcasts/infrastructure/ItunesPodcastRepository';
import { ItunesUrlBuilder } from '@/modules/podcasts/infrastructure/ItunesUrlBuilder';
import { PodcastCache } from '@/modules/podcasts/infrastructure/PodcastCache';
import { LocalStorageCache } from '@/shared/infrastructure/cache/LocalStorageCache';
import { CORS_PROXY_URL, ITUNES_BASE_URL } from './config';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const podcastCache = new PodcastCache(new LocalStorageCache('podcaster:v2:'), ONE_DAY_MS);

const podcastRepository = new CachedPodcastRepository(
  new ItunesPodcastRepository(new ItunesUrlBuilder(CORS_PROXY_URL, ITUNES_BASE_URL)),
  podcastCache,
);

export const podcastUseCases = createPodcastUseCases(podcastRepository, podcastCache);
