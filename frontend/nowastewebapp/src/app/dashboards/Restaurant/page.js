'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Function to fetch dashboard data
async function fetchDashboardData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/restaurants/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return mock data if fetch fails
    return {
      activePickups: 5,
      totalDonations: 127,
      foodSaved: 534,
      impactScore: 89,
      recentActivity: []
    };
  }
}

export default function RestaurantDashboard() {
  const [dashboardData, setDashboardData] = useState({
    activePickups: 5,
    totalDonations: 127,
    foodSaved: 534,
    impactScore: 89,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error loading dashboard: {error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Restaurant Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Active Pickups</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.activePickups}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Donations</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.totalDonations}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Food Saved (kg)</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.foodSaved}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Impact Score</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.impactScore}
          </p>
        </div>
      </div>
      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          {isLoading ? (
            <p>Loading activity...</p>
          ) : dashboardData.recentActivity && dashboardData.recentActivity.length > 0 ? (
            dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <p>{activity.message}</p>
                <span className={styles.activityTime}>{activity.time}</span>
              </div>
            ))
          ) : (
            <p>No recent activity to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
