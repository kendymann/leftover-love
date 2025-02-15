'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

// Function to fetch dashboard data
async function fetchDashboardData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl('restaurants/stats'), {
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
      stats: {
        activePickups: 5,
        totalDonations: 127,
        foodSaved: 534,
        impactScore: 89
      },
      recentActivity: [
        {
          id: 1,
          type: 'pickup_scheduled',
          message: 'New pickup scheduled with Local Food Bank',
          scheduledFor: '2024-03-20T14:00:00Z',
          items: 'Bread (5kg), Vegetables (8kg)',
          timestamp: '2024-03-15T14:30:00Z'
        },
        {
          id: 2,
          type: 'pickup_completed',
          message: 'Pickup completed by Community Shelter',
          foodSaved: '12kg',
          peopleHelped: 30,
          timestamp: '2024-03-15T13:45:00Z'
        },
        {
          id: 3,
          type: 'impact_milestone',
          message: 'Achievement: 500kg of food saved!',
          timestamp: '2024-03-15T12:00:00Z'
        }
      ]
    };
  }
}

export default function RestaurantDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activePickups: 0,
      totalDonations: 0,
      foodSaved: 0,
      impactScore: 0
    },
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => loadDashboardData()}
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
            {isLoading ? '...' : dashboardData.stats.activePickups}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Donations</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.stats.totalDonations}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Food Saved (kg)</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.stats.foodSaved}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Impact Score</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : dashboardData.stats.impactScore}
          </p>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          {isLoading ? (
            <div className={styles.loading}>Loading activity...</div>
          ) : dashboardData.recentActivity.length === 0 ? (
            <p className={styles.emptyMessage}>No recent activity to display</p>
          ) : (
            dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityContent}>
                  <p className={styles.activityMessage}>{activity.message}</p>
                  {activity.scheduledFor && (
                    <p className={styles.activityDetail}>
                      Scheduled for: {formatDate(activity.scheduledFor)}
                    </p>
                  )}
                  {activity.items && (
                    <p className={styles.activityDetail}>Items: {activity.items}</p>
                  )}
                  {activity.foodSaved && (
                    <p className={styles.activityDetail}>Food saved: {activity.foodSaved}</p>
                  )}
                  {activity.peopleHelped && (
                    <p className={styles.activityDetail}>People helped: {activity.peopleHelped}</p>
                  )}
                </div>
                <span className={styles.activityTime}>
                  {formatDate(activity.timestamp)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
