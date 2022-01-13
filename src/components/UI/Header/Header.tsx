import styles from './Header.module.scss';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { GOALS_ROUTES } from '@lib/routes';

interface HeaderProps {
  openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => (
  <header className={styles.Header}>
    <CgProfile onClick={() => openDrawer()} />
    <Link href={GOALS_ROUTES.GOAL_FEED}>
      <MdOutlineExplore />
    </Link>
  </header>
);

export default Header;
