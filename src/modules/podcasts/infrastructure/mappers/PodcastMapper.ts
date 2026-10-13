import type { Podcast } from '@/modules/podcasts/domain/Podcast';
import type { PodcastsResponseApiDto } from '../types/PodcastApiDto';

export const mapPodcastApiDtoToPodcast = (dto: PodcastsResponseApiDto): Podcast[] => {
  return dto.feed.entry.map((entry) => {
    return {
      id: entry.id.attributes['im:id'],
      title: entry['im:name'].label,
      description: entry.summary.label,
      author: entry['im:artist'].label,
      imageUrl: entry['im:image'].at(-1)?.label ?? '',
    };
  });
};
