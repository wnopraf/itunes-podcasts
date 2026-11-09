import { ItunesUrlBuilder } from './ItunesUrlBuilder';

const API_URL = 'https://itunes.apple.com';
const PROXY_URL = 'https://proxy.example.com';

const createBuilder = (proxyUrl = PROXY_URL, apiUrl = API_URL) =>
  new ItunesUrlBuilder(proxyUrl, apiUrl);

describe('ItunesUrlBuilder', () => {
  describe('podcastsList', () => {
    it('builds the top podcasts URL with default query params', () => {
      const url = new URL(createBuilder().podcastsList());

      expect(url.origin).toBe(PROXY_URL);
      expect(url.searchParams.get('url')).toBe(
        `${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
      );
    });

    it('overrides the default query params', () => {
      const target = new URL(createBuilder().podcastsList({ limit: 10, genre: 99 }));
      const url = new URL(target.searchParams.get('url')!);

      expect(url.pathname).toBe('/us/rss/toppodcasts/limit=10/genre=99/json');
    });
  });

  describe('podcastDetail', () => {
    it('builds the podcast detail URL with the default episode limit', () => {
      const target = new URL(createBuilder().podcastDetail('788236947'));
      const url = new URL(target.searchParams.get('url')!);

      expect(url.pathname).toBe('/lookup');
      expect(url.searchParams.get('id')).toBe('788236947');
      expect(url.searchParams.get('media')).toBe('podcast');
      expect(url.searchParams.get('entity')).toBe('podcastEpisode');
      expect(url.searchParams.get('limit')).toBe('20');
    });

    it('encodes the podcast id', () => {
      const target = new URL(createBuilder().podcastDetail('id with spaces'));
      const url = new URL(target.searchParams.get('url')!);

      expect(url.searchParams.get('id')).toBe('id with spaces');
    });
  });

  describe('proxy', () => {
    it('returns the raw API URL when no proxy is configured', () => {
      const url = createBuilder('').podcastsList();

      expect(url).toBe(`${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
    });

    it('strips the trailing slash from the API URL', () => {
      const target = new URL(createBuilder(PROXY_URL, `${API_URL}/`).podcastsList());
      const url = new URL(target.searchParams.get('url')!);

      expect(url.origin + url.pathname).toBe(
        `${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
      );
    });
  });
});
