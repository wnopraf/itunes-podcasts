import { useParams } from 'react-router';

export const EpisodePlayerPage = () => {
  const { episodeId = '' } = useParams();

  return (
    <section>
      <h2>Episode {episodeId}</h2>
    </section>
  );
};
