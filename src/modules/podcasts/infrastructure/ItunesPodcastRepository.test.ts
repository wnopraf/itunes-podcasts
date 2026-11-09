import podcastsFixture from '@/test/fixtures/podcasts.json';
import episodesFixture from '@/test/fixtures/episodes.json';
import { fixturePodcastDetail, fixturePodcasts } from '@/test/fixtures/podcastFixtures';
import { PodcastNotFoundError } from '../domain/PodcastNotFoundError';
import type { ItunesUrlBuilder } from './ItunesUrlBuilder';
import { ItunesPodcastRepository } from './ItunesPodcastRepository';

const TOP_URL = 'https://api.example.com/top';
const DETAIL_URL = 'https://api.example.com/detail';

const createUrlBuilder = () =>
  ({
    podcastsList: vi.fn().mockReturnValue(TOP_URL),
    podcastDetail: vi.fn().mockReturnValue(DETAIL_URL),
  }) as unknown as ItunesUrlBuilder;

const ok = (body: unknown) => ({ ok: true, status: 200, json: async () => body });
const fail = (status: number) => ({ ok: false, status, json: async () => {} });

describe('ItunesPodcastRepository', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getTopPodcasts', () => {
    it('fetches and maps the top podcasts', async () => {
      const urlBuilder = createUrlBuilder();
      const repository = new ItunesPodcastRepository(urlBuilder);
      const signal = new AbortController().signal;
      fetchMock.mockResolvedValue(ok(podcastsFixture));

      const podcasts = await repository.getTopPodcasts(signal);

      expect(urlBuilder.podcastsList).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledWith(TOP_URL, { signal });
      expect(podcasts).toEqual(fixturePodcasts);
    });

    it('throws and logs on a failed response', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const repository = new ItunesPodcastRepository(createUrlBuilder());
      fetchMock.mockResolvedValue(fail(500));

      await expect(repository.getTopPodcasts()).rejects.toThrow(
        `Request failed with status 500: ${TOP_URL}`,
      );
      expect(errorSpy).toHaveBeenCalled();
    });

    it('does not log aborted requests', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const repository = new ItunesPodcastRepository(createUrlBuilder());
      const controller = new AbortController();
      controller.abort();
      fetchMock.mockRejectedValue(new Error('Aborted'));

      await expect(repository.getTopPodcasts(controller.signal)).rejects.toThrow('Aborted');
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  describe('getPodcastDetail', () => {
    it('fetches and maps the podcast detail', async () => {
      const urlBuilder = createUrlBuilder();
      const repository = new ItunesPodcastRepository(urlBuilder);
      fetchMock.mockResolvedValue(ok(episodesFixture));

      const detail = await repository.getPodcastDetail('788236947');

      expect(urlBuilder.podcastDetail).toHaveBeenCalledWith('788236947');
      expect(detail).toEqual(fixturePodcastDetail);
    });

    it('throws PodcastNotFoundError when the lookup has no podcast', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const repository = new ItunesPodcastRepository(createUrlBuilder());
      fetchMock.mockResolvedValue(ok({ resultCount: 0, results: [] }));

      await expect(repository.getPodcastDetail('0')).rejects.toBeInstanceOf(PodcastNotFoundError);
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('throws and logs on a failed response', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const repository = new ItunesPodcastRepository(createUrlBuilder());
      fetchMock.mockResolvedValue(fail(404));

      await expect(repository.getPodcastDetail('788236947')).rejects.toThrow(
        `Request failed with status 404: ${DETAIL_URL}`,
      );
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
