import { useParams } from 'react-router';
import { EpisodeDetail } from '@/modules/podcasts/presentation/components/EpisodeDetail/EpisodeDetail';
import { usePodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const EpisodePlayerPage = () => {
  const { episodeId = '' } = useParams();
  const { detail } = usePodcastOutletContext();
  if (!detail) return null;

  const episode = detail.episodes.find(({ id }) => id === episodeId);
  if (!episode) return <NotFoundPage />;

  return <EpisodeDetail episode={episode} />;
};
