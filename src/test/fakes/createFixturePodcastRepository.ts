import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { mapEpisodeApiDtoToEpisode } from '@/modules/podcasts/infrastructure/mappers/EpisodeMapper';
import { mapPodcastApiDtoToPodcast } from '@/modules/podcasts/infrastructure/mappers/PodcastMapper';
import type { PodcastDetailResponseApiDto } from '@/modules/podcasts/infrastructure/types/EpisodeApiDto';
import type { PodcastsResponseApiDto } from '@/modules/podcasts/infrastructure/types/PodcastApiDto';
import episodesFixture from '../fixtures/episodes.json';
import podcastsFixture from '../fixtures/podcasts.json';

export const createFixturePodcastRepository = (): PodcastRepository => {
  const podcasts = mapPodcastApiDtoToPodcast(podcastsFixture as unknown as PodcastsResponseApiDto);
  const episodes = mapEpisodeApiDtoToEpisode(
    episodesFixture as unknown as PodcastDetailResponseApiDto,
  );

  return {
    getTopPodcasts: async () => podcasts,
    getEpisodes: async (_podcastId) => {
      void _podcastId;
      return episodes;
    },
  };
};
