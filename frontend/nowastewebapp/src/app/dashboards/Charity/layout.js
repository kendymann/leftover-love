'use client';
import Navbar from '@/components/Navbar/Navbar';
import styles from './layout.module.css';

export default function CharityDashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar userType="Charity" />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
} 