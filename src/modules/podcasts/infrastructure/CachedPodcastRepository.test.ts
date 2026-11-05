import { createMemoryCacheStore } from '@/test/fakes/createMemoryCacheStore';
import { fixturePodcastDetail, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { CachedPodcastRepository } from './CachedPodcastRepository';
import { PodcastCache } from './PodcastCache';
import type { PodcastRepository } from '../domain/PodcastRepository';

const setup = () => {
  const repository = {
    getTopPodcasts: vi.fn<PodcastRepository['getTopPodcasts']>().mockResolvedValue(fixturePodcasts),
    getPodcastDetail: vi
      .fn<PodcastRepository['getPodcastDetail']>()
      .mockResolvedValue(fixturePodcastDetail),
  };
  const cache = new PodcastCache(createMemoryCacheStore(), 1000);
  return { repository, cache, cachedRepository: new CachedPodcastRepository(repository, cache) };
};

describe('CachedPodcastRepository', () => {
  it('fetches top podcasts once and then serves them from cache', async () => {
    const { repository, cachedRepository } = setup();

    await cachedRepository.getTopPodcasts();
    const podcasts = await cachedRepository.getTopPodcasts();

    expect(podcasts).toEqual(fixturePodcasts);
    expect(repository.getTopPodcasts).toHaveBeenCalledTimes(1);
  });

  it('fetches podcast detail once and restores episode dates from cache', async () => {
    const { repository, cache, cachedRepository } = setup();

    await cachedRepository.getPodcastDetail('788236947');
    const detail = await cachedRepository.getPodcastDetail('788236947');

    expect(detail).toEqual(fixturePodcastDetail);
    expect(detail.episodes[0]?.pubDate).toBeInstanceOf(Date);
    expect(cache.getPodcastDetail('788236947')).toEqual(fixturePodcastDetail);
    expect(repository.getPodcastDetail).toHaveBeenCalledTimes(1);
  });

  it('does not cache failed requests', async () => {
    const { repository, cachedRepository } = setup();
    repository.getPodcastDetail.mockRejectedValueOnce(new Error('Network down'));

    await expect(cachedRepository.getPodcastDetail('788236947')).rejects.toThrow('Network down');
    await cachedRepository.getPodcastDetail('788236947');

    expect(repository.getPodcastDetail).toHaveBeenCalledTimes(2);
  });
});
