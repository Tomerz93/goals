import Image from 'next/image';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  round?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ round }) => (
  <div className={styles.AvatarContainer} style={{ minWidth: '50px' }}>
    <Image
      src="/images/avatar.jpeg"
      alt="avatar"
      width={50}
      height={50}
      layout="fixed"
      objectFit="cover"
      className={round ? 'round' : ''}
    />
  </div>
);
export default Avatar;
