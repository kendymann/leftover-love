'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = ({ userType }) => {
  const pathname = usePathname();
  const basePath = `/dashboards/${userType}`;

  const navItems = [
    { name: 'Dashboard', path: basePath },
    { name: 'Scheduled Pickups', path: `${basePath}/scheduled` },
    { name: 'Completed Pickups', path: `${basePath}/completed` },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navLink} ${
              pathname === item.path ? styles.active : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Link href={`${basePath}/account`} className={styles.accountLink}>
        Account
      </Link>
    </nav>
  );
};

export default Navbar; 