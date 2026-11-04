import type { PodcastDetail } from '@/modules/podcasts/domain/PodcastDetail';
import { mapEpisodeApiDtoToEpisode } from '@/modules/podcasts/infrastructure/mappers/EpisodeMapper';
import { mapPodcastDetailApiDtoToPodcastDetail } from '@/modules/podcasts/infrastructure/mappers/PodcastDetailMapper';
import { mapPodcastApiDtoToPodcast } from '@/modules/podcasts/infrastructure/mappers/PodcastMapper';
import type { PodcastDetailResponseApiDto } from '@/modules/podcasts/infrastructure/types/PodcastDetailApiDto';
import type { PodcastsResponseApiDto } from '@/modules/podcasts/infrastructure/types/PodcastApiDto';
import episodesFixture from './episodes.json';
import podcastsFixture from './podcasts.json';

export const fixturePodcasts = mapPodcastApiDtoToPodcast(
  podcastsFixture as unknown as PodcastsResponseApiDto,
);

export const fixtureEpisodes = mapEpisodeApiDtoToEpisode(
  episodesFixture as unknown as PodcastDetailResponseApiDto,
);

export const fixturePodcastDetail = mapPodcastDetailApiDtoToPodcastDetail(
  episodesFixture as unknown as PodcastDetailResponseApiDto,
) as PodcastDetail;
