import Image from 'next/image';
import styles from './Avatar.module.scss';
import { useRouter } from 'next/router';
interface AvatarProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  round?: boolean;
  size?: string;
  username?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  round,
  src,
  size = 's',
  username,
}) => {
  const sizes = {
    xs: 50,
    s: 75,
    m: 100,
    l: 200,
  };
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => router.push(`/user/${username}`)}
      className={styles.AvatarContainer}
    >
      <Image
        src={src ?? '/images/avatar.jpeg'}
        alt="avatar"
        width={sizes[size]}
        height={sizes[size]}
        layout="fixed"
        objectFit="cover"
        className={round ? 'round' : ''}
      />
    </div>
  );
};
export default Avatar;
