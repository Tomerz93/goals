import cx from 'classnames';
import styles from './Badge.module.scss';

interface BadgeProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  pill?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, variant, ...props }) => {
  const classes = cx({
    [styles.badge]: true,
    'variant-primary': variant === 'primary',
    'variant-success': variant === 'success',
  });
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
