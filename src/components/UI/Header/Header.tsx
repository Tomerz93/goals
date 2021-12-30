import styles from './Header.module.scss';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

const Header = () => (
  <header className={styles.Header}>
    <CgProfile />
    <MdOutlineExplore />
  </header>
);

export default Header;
