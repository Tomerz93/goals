import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { capitalize } from '@lib/utils/helpers';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'gradient' | 'tab' | 'minimal' | 'styleless';
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  isSelected?: boolean;
  handleOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'link';
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  handleOnClick,
  style = {},
  isSelected,
  variant = 'primary',
  type = 'button',
}) => {
  const classes = cx({
    [styles.btn]: true,
    [styles.btnSelected]: isSelected,
    [styles.btnTab]: variant === 'tab',
    [styles.btnStyleless]: variant === 'styleless',
    [styles.btnMinimal]: variant === 'minimal',
    [styles[`btn${capitalize(variant)}`]]: true,
    [styles.disabled]: disabled,
    [`${className}`]: className,
  });
  return (
    <button
      style={style}
      className={classes}
      disabled={disabled}
      onClick={handleOnClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  children: null,
  disabled: false,
  type: 'button',
};

export default Button;
