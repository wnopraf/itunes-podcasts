import { EpisodeTable } from '@/modules/podcasts/presentation/components/EpisodeTable/EpisodeTable';
import { EpisodeTableSkeleton } from '@/modules/podcasts/presentation/components/EpisodeTable/EpisodeTableSkeleton';
import { EpisodeTableHeader } from '@/modules/podcasts/presentation/components/EpisodeTableHeader/EpisodeTableHeader';
import { EpisodeTableHeaderSkeleton } from '@/modules/podcasts/presentation/components/EpisodeTableHeader/EpisodeTableHeaderSkeleton';
import { usePodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';

export const EpisodeListPage = () => {
  const { detail } = usePodcastOutletContext();
  if (!detail) {
    return (
      <>
        <EpisodeTableHeaderSkeleton />
        <EpisodeTableSkeleton />
      </>
    );
  }

  return (
    <>
      <EpisodeTableHeader episodeCount={detail.episodes.length} />
      <EpisodeTable episodes={detail.episodes} />
    </>
  );
};
