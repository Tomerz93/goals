import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import { Header } from '@components/UI';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className={styles.mainWrapper}>{children}</main>
  </>
);

export default Layout;
