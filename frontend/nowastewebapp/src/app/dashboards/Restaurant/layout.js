'use client';
import Navbar from '@/components/Navbar/Navbar';
import styles from './layout.module.css';

export default function RestaurantDashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar userType="Restaurant" />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
} 