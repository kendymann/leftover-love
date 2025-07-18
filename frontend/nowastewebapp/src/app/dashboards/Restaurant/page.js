'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
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
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Welcome Back, Food Partner</h1>
          <p className={styles.subtitle}>Your generosity is transforming our community, one meal at a time</p>
        </div>
        <div className={styles.brandImage}>
          <Image
            src="/donations.jpg"
            alt="Food Partnership"
            width={120}
            height={120}
            style={{ 
              objectFit: 'cover', 
              borderRadius: '50%',
              border: '3px solid rgba(255, 255, 255, 0.3)'
            }}
          />
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.activePickups}
          </div>
          <div className={styles.metricLabel}>Active Pickups</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.totalDonations}
          </div>
          <div className={styles.metricLabel}>Total Donations</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.foodSaved}kg
          </div>
          <div className={styles.metricLabel}>Food Saved</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.impactScore}
          </div>
          <div className={styles.metricLabel}>Impact Score</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.activitySection}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        {isLoading ? (
          <div className={styles.loading}>Loading activities...</div>
        ) : (
          <div className={styles.activityList}>
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityContent}>
                  <div className={styles.activityMessage}>{activity.message}</div>
                  <div className={styles.activityDetails}>
                    {activity.scheduledFor && (
                      <span className={styles.activityDetail}>
                        Scheduled: {formatDate(activity.scheduledFor)}
                      </span>
                    )}
                    {activity.items && (
                      <span className={styles.activityDetail}>
                        Items: {activity.items}
                      </span>
                    )}
                    {activity.foodSaved && (
                      <span className={styles.activityDetail}>
                        Food saved: {activity.foodSaved}
                      </span>
                    )}
                    {activity.peopleHelped && (
                      <span className={styles.activityDetail}>
                        People helped: {activity.peopleHelped}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.activityTime}>
                  {formatDate(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
