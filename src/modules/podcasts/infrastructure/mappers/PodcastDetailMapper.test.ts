import episodesFixture from '@/test/fixtures/episodes.json';
import type { PodcastDetailResponseApiDto } from '../types/PodcastDetailApiDto';
import { mapPodcastDetailApiDtoToPodcastDetail } from './PodcastDetailMapper';

const dto = episodesFixture as unknown as PodcastDetailResponseApiDto;

const createDetailDto = (episode: Record<string, unknown>): PodcastDetailResponseApiDto =>
  ({
    resultCount: 2,
    results: [
      {
        wrapperType: 'track',
        kind: 'podcast',
        collectionId: 1,
        trackId: 1,
        artistName: 'Author',
        collectionName: 'Podcast',
        trackName: 'Podcast',
        artworkUrl600: 'https://img.example.com/600.jpg',
      },
      episode,
    ],
  }) as unknown as PodcastDetailResponseApiDto;

const baseEpisode = {
  wrapperType: 'podcastEpisode',
  kind: 'podcast-episode',
  trackId: 2,
  trackName: 'Episode',
  collectionId: 1,
  releaseDate: '2024-01-01T00:00:00Z',
  episodeUrl: 'https://example.com/ep.mp3',
};

describe('mapPodcastDetailApiDtoToPodcastDetail', () => {
  it('maps the podcast from the first lookup result', () => {
    const detail = mapPodcastDetailApiDtoToPodcastDetail(dto);

    expect(detail?.podcast).toEqual({
      id: '788236947',
      title: 'Song Exploder',
      author: 'Hrishikesh Hirway',
      imageUrl: dto.results[0]?.artworkUrl600,
    });
  });

  it('maps the remaining lookup results to episodes with string ids', () => {
    const detail = mapPodcastDetailApiDtoToPodcastDetail(dto);
    const episodeCount = dto.results.filter((r) => r.wrapperType === 'podcastEpisode').length;

    expect(detail?.episodes).toHaveLength(episodeCount);
    expect(detail?.episodes[0]).toMatchObject({
      id: expect.any(String),
      podcastId: '788236947',
      pubDate: expect.any(Date),
    });
  });

  it('returns null when the lookup has no results', () => {
    expect(mapPodcastDetailApiDtoToPodcastDetail({ resultCount: 0, results: [] })).toBeNull();
  });

  it.each([
    ['description', { description: 'Full description' }, 'Full description'],
    ['shortDescription', { shortDescription: 'Short description' }, 'Short description'],
    ['an empty string', {}, ''],
  ])('maps the episode description from %s', (_, overrides, expected) => {
    const detail = mapPodcastDetailApiDtoToPodcastDetail(
      createDetailDto({ ...baseEpisode, ...overrides }),
    );

    expect(detail?.episodes[0]?.description).toBe(expected);
  });
});
