const APP_NAME = 'Podcaster';

type PageTitleProps = {
  title?: string;
};

export const PageTitle = ({ title }: PageTitleProps) => (
  <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
);
