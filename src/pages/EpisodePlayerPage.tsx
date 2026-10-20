import { useParams } from 'react-router';
import { EpisodeDetail } from '@/modules/podcasts/presentation/components/EpisodeDetail/EpisodeDetail';
import { usePodcastOutletContext } from '@/modules/podcasts/presentation/contexts/PodcastOutletContext';
import { NotFoundPage } from './NotFoundPage';

export const EpisodePlayerPage = () => {
  const { episodeId = '' } = useParams();
  const { episodes } = usePodcastOutletContext();
  if (!episodes) return null;

  const episode = episodes.find(({ id }) => id.toString() === episodeId);
  if (!episode) return <NotFoundPage />;

  return <EpisodeDetail episode={episode} />;
};
