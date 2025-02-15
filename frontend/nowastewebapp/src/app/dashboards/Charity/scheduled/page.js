'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Function to fetch scheduled pickups
async function fetchScheduledPickups() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/charities/pickups/scheduled', {
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
    // Return mock data if fetch fails
    return [
      {
        id: 1,
        restaurantName: "Fresh Bites Restaurant",
        date: "2024-03-20",
        time: "14:00",
        items: "Bread, Vegetables, Prepared Meals",
        address: "123 Main St, City",
        status: "Confirmed"
      },
      {
        id: 2,
        restaurantName: "Green Kitchen",
        date: "2024-03-21",
        time: "15:30",
        items: "Dairy Products, Fruits",
        address: "456 Oak Ave, City",
        status: "Pending"
      }
    ];
  }
}

export default function CharityScheduledPickups() {
  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadScheduledPickups();
  }, []);

  async function loadScheduledPickups() {
    try {
      setIsLoading(true);
      const data = await fetchScheduledPickups();
      setScheduledPickups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => loadScheduledPickups()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.scheduledPage}>
      <h1 className={styles.title}>Scheduled Pickups</h1>

      <div className={styles.pickupsList}>
        {isLoading ? (
          <div className={styles.loading}>Loading scheduled pickups...</div>
        ) : scheduledPickups.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No scheduled pickups yet</p>
          </div>
        ) : (
          scheduledPickups.map((pickup) => (
            <div key={pickup.id} className={styles.pickupCard}>
              <div className={styles.pickupHeader}>
                <h3 className={styles.restaurantName}>{pickup.restaurantName}</h3>
                <span className={`${styles.status} ${styles[pickup.status.toLowerCase()]}`}>
                  {pickup.status}
                </span>
              </div>
              <div className={styles.pickupDetails}>
                <div className={styles.detail}>
                  <span className={styles.label}>Date:</span>
                  <span>{pickup.date}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Time:</span>
                  <span>{pickup.time}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Items:</span>
                  <span>{pickup.items}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Address:</span>
                  <span>{pickup.address}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={`${styles.actionButton} ${styles.cancelButton}`}>
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 