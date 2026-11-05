import { fixturePodcastDetail, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import type { PodcastCacheReader } from './ports/PodcastCacheReader';
import { GetPodcastDetail } from './GetPodcastDetail';
import { PodcastNotFoundError } from '../domain/PodcastNotFoundError';
import type { PodcastRepository } from '../domain/PodcastRepository';

const topPodcast = fixturePodcasts.find(({ id }) => id === fixturePodcastDetail.podcast.id)!;

const createRepository = (overrides: Partial<PodcastRepository> = {}): PodcastRepository => ({
  getTopPodcasts: vi.fn().mockResolvedValue(fixturePodcasts),
  getPodcastDetail: vi.fn().mockResolvedValue(fixturePodcastDetail),
  ...overrides,
});

const createCacheReader = (overrides: Partial<PodcastCacheReader> = {}): PodcastCacheReader => ({
  getTopPodcasts: () => fixturePodcasts,
  getPodcastDetail: () => fixturePodcastDetail,
  ...overrides,
});

describe('GetPodcastDetail', () => {
  describe('execute', () => {
    it('requests the podcast detail and top podcasts in parallel', async () => {
      const repository = createRepository();
      const signal = new AbortController().signal;

      await new GetPodcastDetail(repository).execute('788236947', signal);

      expect(repository.getPodcastDetail).toHaveBeenCalledWith('788236947', signal);
      expect(repository.getTopPodcasts).toHaveBeenCalledWith(signal);
    });

    it('adds the description when the podcast is in the top podcasts', async () => {
      const detail = await new GetPodcastDetail(createRepository()).execute('788236947');

      expect(detail.podcast.description).toBe(topPodcast.description);
      expect(detail.episodes).toBe(fixturePodcastDetail.episodes);
    });

    it('returns the podcast without description when it is not in the top podcasts', async () => {
      const repository = createRepository({ getTopPodcasts: vi.fn().mockResolvedValue([]) });

      const detail = await new GetPodcastDetail(repository).execute('788236947');

      expect(detail).toEqual(fixturePodcastDetail);
      expect(detail.podcast.description).toBeUndefined();
    });

    it('returns the podcast detail when top podcasts fail to load', async () => {
      const repository = createRepository({
        getTopPodcasts: vi.fn().mockRejectedValue(new Error('Network down')),
      });

      const detail = await new GetPodcastDetail(repository).execute('788236947');

      expect(detail).toEqual(fixturePodcastDetail);
    });

    it('propagates podcast detail errors', async () => {
      const repository = createRepository({
        getPodcastDetail: vi.fn().mockRejectedValue(new PodcastNotFoundError('0')),
      });

      await expect(new GetPodcastDetail(repository).execute('0')).rejects.toBeInstanceOf(
        PodcastNotFoundError,
      );
    });
  });

  describe('getCached', () => {
    it('returns the cached detail with the description from cached top podcasts', () => {
      const useCase = new GetPodcastDetail(createRepository(), createCacheReader());

      expect(useCase.getCached('788236947')?.podcast.description).toBe(topPodcast.description);
    });

    it.each([
      ['podcast detail', { getPodcastDetail: () => null }],
      ['top podcasts', { getTopPodcasts: () => null }],
    ])('returns null when %s are not cached', (_, overrides) => {
      const useCase = new GetPodcastDetail(createRepository(), createCacheReader(overrides));

      expect(useCase.getCached('788236947')).toBeNull();
    });

    it('returns null without a cache reader', () => {
      expect(new GetPodcastDetail(createRepository()).getCached('788236947')).toBeNull();
    });
  });
});
