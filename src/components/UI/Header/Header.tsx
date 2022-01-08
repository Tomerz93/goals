import styles from './Header.module.scss';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

interface HeaderProps {
  openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => (
  <header className={styles.Header}>
    <CgProfile onClick={() => openDrawer()} />
    <MdOutlineExplore />
  </header>
);

export default Header;
