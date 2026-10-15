import type { ComponentPropsWithoutRef } from 'react';
import styles from './Card.module.css';

type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card = ({ className, children, ...rest }: CardProps) => {
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';
