'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

// Function to fetch charity dashboard data including available offers
async function fetchDashboardData() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl('charities/stats'), {
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
        availablePickups: 8,
        totalCollections: 95,
        foodCollected: 423,
        peopleHelped: 1240
      },
      availableOffers: [
        {
          id: 1,
          restaurantName: 'Fresh Bites Restaurant',
          restaurantAddress: '123 Main St, City',
          items: 'Bread (3kg), Vegetables (5kg), Prepared Meals (8 portions)',
          availableDate: '2024-03-16',
          availableTime: '14:00',
          preferredPickupTime: '2:00 PM - 4:00 PM',
          expiresAt: '2024-03-16T18:00:00Z'
        },
        {
          id: 2,
          restaurantName: 'Green Kitchen',
          restaurantAddress: '456 Oak Ave, City',
          items: 'Dairy Products (2kg), Fruits (4kg), Pastries (12 items)',
          availableDate: '2024-03-16',
          availableTime: '15:30',
          preferredPickupTime: '3:00 PM - 5:00 PM',
          expiresAt: '2024-03-16T19:00:00Z'
        },
        {
          id: 3,
          restaurantName: 'Italian Corner',
          restaurantAddress: '789 Pine St, City',
          items: 'Pasta (4kg), Sauce (2L), Bread (2kg)',
          availableDate: '2024-03-16',
          availableTime: '16:00',
          preferredPickupTime: '4:00 PM - 6:00 PM',
          expiresAt: '2024-03-16T20:00:00Z'
        }
      ],
      recentActivity: [
        {
          id: 1,
          type: 'pickup_completed',
          message: 'Completed pickup from Fresh Bites Restaurant',
          foodSaved: '15kg',
          peopleHelped: 35,
          timestamp: '2024-03-15T14:30:00Z'
        },
        {
          id: 2,
          type: 'pickup_scheduled',
          message: 'New pickup scheduled with Green Kitchen',
          scheduledFor: '2024-03-17T15:00:00Z',
          timestamp: '2024-03-15T13:45:00Z'
        },
        {
          id: 3,
          type: 'impact_milestone',
          message: 'Milestone: Helped feed 1000+ people this month!',
          timestamp: '2024-03-15T12:00:00Z'
        }
      ]
    };
  }
}

// Function to claim an offer
async function claimOffer(offerId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl(`charities/claim-offer/${offerId}`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to claim offer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error claiming offer:', error);
    throw error;
  }
}

export default function CharityDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      availablePickups: 0,
      totalCollections: 0,
      foodCollected: 0,
      peopleHelped: 0
    },
    availableOffers: [],
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

  const handleClaimOffer = async (offerId) => {
    try {
      await claimOffer(offerId);
      // Remove the claimed offer from the list
      setDashboardData(prev => ({
        ...prev,
        availableOffers: prev.availableOffers.filter(offer => offer.id !== offerId)
      }));
      // Refresh dashboard data to update stats
      loadDashboardData();
    } catch (err) {
      setError('Failed to claim offer');
    }
  };

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
          <h1 className={styles.title}>Charity Dashboard</h1>
          <p className={styles.subtitle}>
            Connect with restaurants, collect surplus food, and make a difference in your community.
          </p>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.availablePickups}
          </div>
          <div className={styles.metricLabel}>Available Offers</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.totalCollections}
          </div>
          <div className={styles.metricLabel}>Total Collections</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.foodCollected}kg
          </div>
          <div className={styles.metricLabel}>Food Collected</div>
        </div>
        
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {isLoading ? '...' : dashboardData.stats.peopleHelped}
          </div>
          <div className={styles.metricLabel}>People Helped</div>
        </div>
      </div>

      {/* Available Offers Section */}
      <div className={styles.offersSection}>
        <h2 className={styles.sectionTitle}>Available Food Offers</h2>
        <div className={styles.offersList}>
          {isLoading ? (
            <div className={styles.loading}>Loading available offers...</div>
          ) : dashboardData.availableOffers && dashboardData.availableOffers.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No food offers available at the moment. Check back later!</p>
            </div>
          ) : (
            dashboardData.availableOffers && dashboardData.availableOffers.map((offer) => (
              <div key={offer.id} className={styles.offerCard}>
                <div className={styles.offerHeader}>
                  <h3 className={styles.restaurantName}>{offer.restaurantName}</h3>
                  <button 
                    className={styles.claimButton}
                    onClick={() => handleClaimOffer(offer.id)}
                  >
                    Claim Offer
                  </button>
                </div>
                <div className={styles.offerDetails}>
                  <div className={styles.offerDetail}>
                    <span className={styles.offerLabel}>Items:</span>
                    <span>{offer.items}</span>
                  </div>
                  <div className={styles.offerDetail}>
                    <span className={styles.offerLabel}>Address:</span>
                    <span>{offer.restaurantAddress}</span>
                  </div>
                  <div className={styles.offerDetail}>
                    <span className={styles.offerLabel}>Pickup:</span>
                    <span>{offer.preferredPickupTime} on {offer.availableDate}</span>
                  </div>
                  <div className={styles.offerDetail}>
                    <span className={styles.offerLabel}>Expires:</span>
                    <span>{formatDate(offer.expiresAt)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
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
                    {activity.scheduledFor && (
                      <span className={styles.activityDetail}>
                        Scheduled: {formatDate(activity.scheduledFor)}
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
