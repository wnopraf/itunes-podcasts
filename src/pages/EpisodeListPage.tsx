import { EpisodeTable } from '@/modules/podcasts/presentation/components/EpisodeTable/EpisodeTable';
import { EpisodeTableHeader } from '@/modules/podcasts/presentation/components/EpisodeTableHeader/EpisodeTableHeader';
import { usePodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';

export const EpisodeListPage = () => {
  const { episodes } = usePodcastOutletContext();
  if (!episodes) return <div>Episodes skeleton</div>;

  return (
    <>
      <EpisodeTableHeader episodeCount={episodes.length} />
      <EpisodeTable episodes={episodes} />
    </>
  );
};
