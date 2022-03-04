import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Header.module.scss';
import { MdOutlineExplore, MdOutlineAdd } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { GOALS_ROUTES } from '@lib/routes';
import { FlexContainer } from '..';

interface HeaderProps {
  openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const router = useRouter();
  const { pathname } = router;
  const { data } = useSession();
  const { user = null, username = '', image = '' } = data ?? {};
  return (
    <header className={styles.Header}>
      <span>Logo</span>
      <FlexContainer alignItems="center" justifyContent="center">
        <div className="mobile-only">
          <CgProfile
            onClick={() => {
              openDrawer();
            }}
          />
        </div>
        <div
          className={
            pathname === GOALS_ROUTES.GOAL_FEED ? styles.activeLink : ''
          }
        >
          <Link passHref href={GOALS_ROUTES.GOAL_FEED}>
            <MdOutlineExplore />
          </Link>
        </div>
        <div
          className={
            pathname === GOALS_ROUTES.GOAL_CREATE ? styles.activeLink : ''
          }
        >
          <Link href={GOALS_ROUTES.GOAL_CREATE}>
            <MdOutlineAdd />
          </Link>
        </div>
      </FlexContainer>
      <FlexContainer className="desktop-only" alignItems="center">
        <Image
          src={user?.image ?? '/images/avatar.jpeg'}
          alt="avatar"
          width={40}
          height={40}
          layout="fixed"
          className="round"
          objectFit="cover"
        />
        <span>{username}</span>
      </FlexContainer>
    </header>
  );
};

export default Header;
