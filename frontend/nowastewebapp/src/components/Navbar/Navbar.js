'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = ({ userType }) => {
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `/dashboards/${userType}`;

  const navItems = [
    { name: 'Dashboard', path: basePath },
    { name: 'Pickups', path: `${basePath}/pickups` },
  ];

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    
    // Redirect to home page
    router.push('/');
  };

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
      <div className={styles.rightSection}>
        <Link href={`${basePath}/account`} className={styles.accountLink}>
          Account
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 