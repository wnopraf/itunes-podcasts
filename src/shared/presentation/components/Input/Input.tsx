import { useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'onChange'> & {
  label: string;
  hideLabel?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  type?: 'text' | 'search' | 'email' | 'password' | 'tel' | 'url';
};

export const Input = ({
  label,
  hideLabel = false,
  value,
  onValueChange,
  id,
  className,
  type = 'text',
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={className ? `${styles.root} ${className}` : styles.root}>
      <label htmlFor={inputId} className={hideLabel ? 'visually-hidden' : styles.label}>
        {label}
      </label>
      <input
        {...rest}
        id={inputId}
        type={type}
        className={styles.field}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};
