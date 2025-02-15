"use client";

import Link from 'next/link';
import { FaRecycle } from 'react-icons/fa';
import styles from './navbar.module.css'; // assuming the css is in the same folder

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo/Icon on the left */}
      <div className={styles.navLeft}>
        <FaRecycle className={styles.icon} />
      </div>
      
      {/* Links on the right */}
      <div className={styles.navRight}>
        <Link href="/auth/login" className={styles.navLink}>Login</Link>
        <Link href="/auth/signup" className={styles.navLink}>Sign Up</Link>
      </div>
    </nav>
  );
}
