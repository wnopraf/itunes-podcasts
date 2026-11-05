import episodesFixture from '@/test/fixtures/episodes.json';
import type { PodcastDetailResponseApiDto } from '../types/PodcastDetailApiDto';
import { mapPodcastDetailApiDtoToPodcastDetail } from './PodcastDetailMapper';

const dto = episodesFixture as unknown as PodcastDetailResponseApiDto;

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
});
