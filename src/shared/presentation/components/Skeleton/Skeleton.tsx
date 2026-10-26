import styles from './Skeleton.module.css';

type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
};

export const Skeleton = ({ width, height, radius, className }: SkeletonProps) => {
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <span
      aria-hidden="true"
      className={classes}
      style={{ inlineSize: width, blockSize: height, borderRadius: radius }}
    />
  );
};
