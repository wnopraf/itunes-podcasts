import { useParams } from 'react-router';
import { EpisodeDetail } from '@/modules/podcasts/presentation/components/EpisodeDetail/EpisodeDetail';
import { EpisodeDetailSkeleton } from '@/modules/podcasts/presentation/components/EpisodeDetail/EpisodeDetailSkeleton';
import { usePodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PageTitle } from '@/shared/presentation/components/PageTitle/PageTitle';

export const EpisodePlayerPage = () => {
  const { episodeId } = useParams<'episodeId'>();
  if (!episodeId) throw new Error('EpisodePlayerPage requires an :episodeId route param');
  const { detail } = usePodcastOutletContext();
  if (!detail) {
    return (
      <>
        <PageTitle />
        <EpisodeDetailSkeleton />
      </>
    );
  }

  const episode = detail.episodes.find(({ id }) => id === episodeId);
  if (!episode) return <NotFoundPage />;

  return (
    <>
      <PageTitle title={episode.title} />
      <EpisodeDetail episode={episode} />
    </>
  );
};
