import { ReactNode } from 'react';
import styles from './LayoutWithoutHeader.module.scss';

const LayoutWithoutHeader = ({ children }: { children: ReactNode }) => (
  <>
    <main className={styles.mainWrapper}>{children}</main>
  </>
);

export default LayoutWithoutHeader;
