import type { PodcastEntryApiDto, PodcastsResponseApiDto } from '../types/PodcastApiDto';
import { mapPodcastApiDtoToPodcast } from './PodcastMapper';

const createEntry = (overrides: Partial<PodcastEntryApiDto> = {}): PodcastEntryApiDto =>
  ({
    id: { label: '123', attributes: { 'im:id': '123' } },
    'im:name': { label: 'Podcast Title' },
    summary: { label: 'Podcast Description' },
    'im:artist': { label: 'Podcast Author', attributes: { href: '' } },
    'im:image': [
      { label: 'https://img.example.com/small.jpg', attributes: { height: '55' } },
      { label: 'https://img.example.com/large.jpg', attributes: { height: '600' } },
    ],
    ...overrides,
  }) as PodcastEntryApiDto;

const createDto = (entry: PodcastEntryApiDto): PodcastsResponseApiDto =>
  ({ feed: { entry: [entry] } }) as PodcastsResponseApiDto;

describe('mapPodcastApiDtoToPodcast', () => {
  it('maps the DTO fields to a Podcast', () => {
    const podcasts = mapPodcastApiDtoToPodcast(createDto(createEntry()));

    expect(podcasts).toEqual([
      {
        id: '123',
        title: 'Podcast Title',
        description: 'Podcast Description',
        author: 'Podcast Author',
        imageUrl: 'https://img.example.com/large.jpg',
      },
    ]);
  });

  it('uses the last image as the cover and falls back to empty string', () => {
    const withEmptyImages = mapPodcastApiDtoToPodcast(createDto(createEntry({ 'im:image': [] })));

    expect(withEmptyImages[0]?.imageUrl).toBe('');
  });
});
