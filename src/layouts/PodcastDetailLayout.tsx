import { Outlet, useParams } from 'react-router';

export const PodcastDetailLayout = () => {
  const { podcastId = '' } = useParams();

  return (
    <div>
      <aside>Podcast {podcastId}</aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
