import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import cx from 'classnames';
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
  return (
    <header className={styles.Header}>
      <span>Logo</span>
      <FlexContainer alignItems="center" justifyContent="center">
        <div>
          <CgProfile onClick={() => openDrawer()} />
        </div>
        <div
          className={
            pathname === GOALS_ROUTES.GOAL_FEED ? styles.activeLink : ''
          }
        >
          <Link href={GOALS_ROUTES.GOAL_FEED}>
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
    </header>
  );
};

export default Header;
