import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import { Header, Drawer } from '@components/UI';
import { useToggle } from '@lib/hooks';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isVisible, toggle } = useToggle(false);
  return (
    <>
      <Header openDrawer={toggle} />
      <Drawer isVisible={isVisible} toggle={toggle} />
      <main className={styles.mainWrapper}>{children}</main>
    </>
  );
};

export default Layout;
