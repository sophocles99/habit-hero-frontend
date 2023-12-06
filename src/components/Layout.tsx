import { Outlet } from "react-router-dom";
import styles from '../styles/Layout.module.css'

const Layout = () => {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
};

export default Layout;
