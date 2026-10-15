import type { ReactNode } from 'react';
import styles from './Card.module.css';
type CardProps = {
  className?: string;
  children: ReactNode;
};
export const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
Card.displayName = 'Card';
