'use client';
import styles from './page.module.css';

export default function RestaurantDashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Restaurant Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Active Pickups</h3>
          <p className={styles.statNumber}>5</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Donations</h3>
          <p className={styles.statNumber}>127</p>
        </div>
        <div className={styles.statCard}>
          <h3>Food Saved (kg)</h3>
          <p className={styles.statNumber}>534</p>
        </div>
        <div className={styles.statCard}>
          <h3>Impact Score</h3>
          <p className={styles.statNumber}>89</p>
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
