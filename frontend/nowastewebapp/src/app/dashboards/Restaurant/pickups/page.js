'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

// Function to fetch scheduled pickups
async function fetchScheduledPickups() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl('restaurants/pickups/scheduled'), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch scheduled pickups');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching scheduled pickups:', error);
    return [
      {
        id: 1,
        charityName: "Local Food Bank",
        date: "2024-03-20",
        time: "14:00",
        items: "Bread, Vegetables, Prepared Meals",
        status: "Confirmed"
      },
      {
        id: 2,
        charityName: "Community Shelter",
        date: "2024-03-21",
        time: "15:30",
        items: "Dairy Products, Fruits",
        status: "Pending"
      }
    ];
  }
}

// Function to fetch completed pickups
async function fetchCompletedPickups() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl('restaurants/pickups/completed'), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch completed pickups');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching completed pickups:', error);
    return [
      {
        id: 1,
        charityName: "Local Food Bank",
        date: "2024-03-15",
        time: "14:00",
        items: "Bread, Vegetables",
        foodDonated: "15kg",
        peopleHelped: 40,
        completedAt: "2024-03-15T14:45:00Z"
      },
      {
        id: 2,
        charityName: "Community Shelter",
        date: "2024-03-14",
        time: "15:30",
        items: "Prepared Meals, Fruits",
        foodDonated: "12kg",
        peopleHelped: 30,
        completedAt: "2024-03-14T16:00:00Z"
      }
    ];
  }
}

export default function RestaurantPickups() {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOfferForm, setShowOfferForm] = useState(false);

  useEffect(() => {
    loadPickups();
  }, []);

  async function loadPickups() {
    try {
      setIsLoading(true);
      const [scheduled, completed] = await Promise.all([
        fetchScheduledPickups(),
        fetchCompletedPickups()
      ]);
      setScheduledPickups(scheduled);
      setCompletedPickups(completed);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (pickup) => {
    // Implement edit functionality
    console.log('Edit pickup:', pickup);
  };

  const handleDelete = async (pickupId) => {
    if (window.confirm('Are you sure you want to delete this pickup?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(buildApiUrl(`restaurants/food-items/${pickupId}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete pickup');
        }

        setScheduledPickups(prev => prev.filter(pickup => pickup.id !== pickupId));
      } catch (err) {
        setError('Failed to delete pickup');
        console.error('Error deleting pickup:', err);
      }
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
          onClick={() => loadPickups()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pickupsPage}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>My Donations</h1>
          <p className={styles.subtitle}>
            Manage your food donation offers and track their impact
          </p>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setShowOfferForm(true)}
        >
          Create New Offer
        </button>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'scheduled' ? styles.active : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            Active Offers ({scheduledPickups.length})
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'completed' ? styles.active : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Donation History ({completedPickups.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        {isLoading ? (
          <div className={styles.loading}>Loading donations...</div>
        ) : activeTab === 'scheduled' ? (
          <div className={styles.pickupsList}>
            {scheduledPickups.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No active offers</h3>
                <p>Create a new food donation offer to help your community</p>
              </div>
            ) : (
              scheduledPickups.map((pickup) => (
                <div key={pickup.id} className={styles.pickupCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.charityName}>{pickup.charityName}</h3>
                    <span className={`${styles.statusBadge} ${styles[`status${pickup.status}`]}`}>
                      {pickup.status}
                    </span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Date:</span>
                      <span>{pickup.date}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Time:</span>
                      <span>{pickup.time}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Items:</span>
                      <span>{pickup.items}</span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button 
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => handleEdit(pickup)}
                    >
                      Edit
                    </button>
                    <button 
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDelete(pickup.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={styles.pickupsList}>
            {completedPickups.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No completed donations</h3>
                <p>Your donation history will appear here</p>
              </div>
            ) : (
              completedPickups.map((pickup) => (
                <div key={pickup.id} className={styles.pickupCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.charityName}>{pickup.charityName}</h3>
                    <span className={styles.completedBadge}>Completed</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Date:</span>
                      <span>{pickup.date}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Items:</span>
                      <span>{pickup.items}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Food Donated:</span>
                      <span>{pickup.foodDonated}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>People Helped:</span>
                      <span>{pickup.peopleHelped}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Completed:</span>
                      <span>{formatDate(pickup.completedAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
