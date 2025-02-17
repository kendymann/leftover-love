'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  const { userType } = useParams();

  return (
    <div className={styles.layout}>
      <Navbar userType={userType} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
} 