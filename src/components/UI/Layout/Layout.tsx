import { ReactNode } from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => <main className={styles.mainWrapper}>{children}</main>

export default Layout
