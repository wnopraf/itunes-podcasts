import { useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

type SearchInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'onChange'> & {
  label: string;
  hideLabel?: boolean;
  value: string;
  onValueChange: (value: string) => void;
};

export const Input = ({
  label,
  hideLabel = false,
  value,
  onValueChange,
  id,
  className,
  ...rest
}: SearchInputProps) => {
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
        type="search"
        className={styles.root}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};
