import { fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import type { PodcastCacheReader } from './ports/PodcastCacheReader';
import { GetTopPodcasts } from './GetTopPodcasts';
import type { PodcastRepository } from '../domain/PodcastRepository';

const createRepository = (overrides: Partial<PodcastRepository> = {}): PodcastRepository => ({
  getTopPodcasts: vi.fn().mockResolvedValue(fixturePodcasts),
  getPodcastDetail: vi.fn(),
  ...overrides,
});

const createCacheReader = (overrides: Partial<PodcastCacheReader> = {}): PodcastCacheReader => ({
  getTopPodcasts: () => fixturePodcasts,
  getPodcastDetail: () => null,
  ...overrides,
});

describe('GetTopPodcasts', () => {
  describe('execute', () => {
    it('returns top podcasts from the repository', async () => {
      const repository = createRepository();
      const signal = new AbortController().signal;

      const podcasts = await new GetTopPodcasts(repository).execute(signal);

      expect(podcasts).toBe(fixturePodcasts);
      expect(repository.getTopPodcasts).toHaveBeenCalledWith(signal);
    });

    it('propagates repository errors', async () => {
      const repository = createRepository({
        getTopPodcasts: vi.fn().mockRejectedValue(new Error('Network down')),
      });
      const result = new GetTopPodcasts(repository).execute();
      await expect(result).rejects.toThrow('Network down');
    });
  });

  describe('getCached', () => {
    it('returns cached top podcasts', () => {
      const useCase = new GetTopPodcasts(createRepository(), createCacheReader());

      expect(useCase.getCached()).toBe(fixturePodcasts);
    });

    it('returns null when top podcasts are not cached', () => {
      const useCase = new GetTopPodcasts(
        createRepository(),
        createCacheReader({ getTopPodcasts: () => null }),
      );

      expect(useCase.getCached()).toBeNull();
    });

    it('returns null without a cache reader', () => {
      expect(new GetTopPodcasts(createRepository()).getCached()).toBeNull();
    });
  });
});
