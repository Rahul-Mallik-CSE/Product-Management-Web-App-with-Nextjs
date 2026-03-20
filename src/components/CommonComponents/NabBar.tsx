/** @format */
"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import styles from "../../scssstyle/NavBarStyles.module.scss";

const NavBar = () => {
  const pathname = usePathname();

  if (pathname == "/") return null;

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBarInner}>
        <div className={styles.leftSection}>
          {/* mobile menu button */}
          <div className={styles.sidebarTriggerWrapper}>
            <SidebarTrigger />
          </div>
          {/* Left side - Title */}
          <h1 className={styles.navTitle}>Products</h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
