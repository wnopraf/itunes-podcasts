import type { Podcast } from '../../domain/Podcast';
import { filterPodcasts } from './filterPodcasts';

const podcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Joe Budden Podcast',
    author: 'The Joe Budden Network',
    imageUrl: 'image.jpg',
  },
  { id: '2', title: 'Song Exploder', author: 'Hrishikesh Hirway', imageUrl: 'image.jpg' },
];

describe('filterPodcasts', () => {
  it('matches podcasts by title', () => {
    expect(filterPodcasts(podcasts, 'budden')).toEqual([podcasts[0]]);
  });

  it('matches podcasts by author', () => {
    expect(filterPodcasts(podcasts, 'hrishikesh')).toEqual([podcasts[1]]);
  });

  it('is case insensitive', () => {
    expect(filterPodcasts(podcasts, 'SONG')).toEqual([podcasts[1]]);
  });

  it('ignores leading and trailing whitespace in the query', () => {
    expect(filterPodcasts(podcasts, '  joe  ')).toEqual([podcasts[0]]);
  });

  it('returns every podcast for an empty query', () => {
    expect(filterPodcasts(podcasts, '')).toEqual(podcasts);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterPodcasts(podcasts, 'no match')).toEqual([]);
  });
});
