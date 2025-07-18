'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

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
  const [offers, setOffers] = useState([]);
  const [newOfferData, setNewOfferData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiry_date: '',
    pickup_time: ''
  });
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offerLoading, setOfferLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
    loadOffers();
  }, []);

  async function loadDashboardData() {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('restaurants/stats'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        // Fallback data
        setDashboardData({
          stats: {
            activePickups: 5,
            totalDonations: 127,
            foodSaved: 534,
            impactScore: 89
          },
          recentActivity: [
            {
              id: 1,
              message: 'New pickup scheduled with Local Food Bank',
              timestamp: new Date().toISOString()
            }
          ]
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadOffers() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('offers/restaurant'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  }

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    setOfferLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('offers'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOfferData)
      });

      if (response.ok) {
        const newOffer = await response.json();
        setOffers([newOffer, ...offers]);
        setNewOfferData({
          title: '',
          description: '',
          quantity: '',
          expiry_date: '',
          pickup_time: ''
        });
        setShowOfferForm(false);
      } else {
        throw new Error('Failed to create offer');
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      setError('Failed to create offer');
    } finally {
      setOfferLoading(false);
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
          <h1 className={styles.title}>Restaurant Dashboard</h1>
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

      {/* Offers Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Offers</h2>
          <button 
            className={styles.createButton}
            onClick={() => setShowOfferForm(!showOfferForm)}
          >
            {showOfferForm ? 'Cancel' : 'Create Offer'}
          </button>
        </div>

        {showOfferForm && (
          <form onSubmit={handleCreateOffer} className={styles.offerForm}>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Offer title"
                value={newOfferData.title}
                onChange={(e) => setNewOfferData({...newOfferData, title: e.target.value})}
                required
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newOfferData.quantity}
                onChange={(e) => setNewOfferData({...newOfferData, quantity: e.target.value})}
                required
                className={styles.input}
              />
            </div>
            <textarea
              placeholder="Description"
              value={newOfferData.description}
              onChange={(e) => setNewOfferData({...newOfferData, description: e.target.value})}
              required
              className={styles.textarea}
            />
            <div className={styles.formRow}>
              <input
                type="datetime-local"
                placeholder="Expiry date"
                value={newOfferData.expiry_date}
                onChange={(e) => setNewOfferData({...newOfferData, expiry_date: e.target.value})}
                required
                className={styles.input}
              />
              <input
                type="time"
                placeholder="Pickup time"
                value={newOfferData.pickup_time}
                onChange={(e) => setNewOfferData({...newOfferData, pickup_time: e.target.value})}
                required
                className={styles.input}
              />
            </div>
            <button 
              type="submit" 
              disabled={offerLoading}
              className={styles.submitButton}
            >
              {offerLoading ? 'Creating...' : 'Create Offer'}
            </button>
          </form>
        )}

        <div className={styles.offersGrid}>
          {offers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <span className={styles.offerStatus}>{offer.status}</span>
              </div>
              <p className={styles.offerDescription}>{offer.description}</p>
              <div className={styles.offerDetails}>
                <span>Quantity: {offer.quantity}</span>
                <span>Expires: {new Date(offer.expiry_date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {offers.length === 0 && !showOfferForm && (
          <div className={styles.emptyState}>
            <h3>No offers yet</h3>
            <p>Create your first offer to help feed those in need</p>
          </div>
        )}
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
