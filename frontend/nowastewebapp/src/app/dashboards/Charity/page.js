'use client';
import styles from './page.module.css';

export default function CharityDashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Charity Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Available Pickups</h3>
          <p className={styles.statNumber}>8</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Collections</h3>
          <p className={styles.statNumber}>95</p>
        </div>
        <div className={styles.statCard}>
          <h3>Food Collected (kg)</h3>
          <p className={styles.statNumber}>423</p>
        </div>
        <div className={styles.statCard}>
          <h3>People Helped</h3>
          <p className={styles.statNumber}>1,240</p>
        </div>
      </div>
      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          {/* Activity items will be populated dynamically */}
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
