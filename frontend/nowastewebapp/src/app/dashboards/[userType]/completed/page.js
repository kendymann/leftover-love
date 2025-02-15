'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

// Function to fetch completed pickups based on user type
async function fetchCompletedPickups(userType) {
  try {
    const token = localStorage.getItem('token');
    const endpoint = userType === 'Restaurant' 
      ? buildApiUrl('restaurants/pickups/completed')
      : buildApiUrl('charities/pickups/completed');

    const response = await fetch(endpoint, {
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
    // Return mock data if fetch fails
    if (userType === 'Restaurant') {
      return {
        stats: {
          totalPickups: 45,
          totalKgSaved: 534,
          peopleHelped: 1240,
          averageRating: 4.5
        },
        pickups: [
          {
            id: 1,
            organizationName: "Local Food Bank",
            date: "2024-03-15",
            time: "14:30",
            items: "Bread (5kg), Vegetables (8kg), Prepared Meals (10 portions)",
            impact: "Helped feed 25 people",
            rating: 5,
            feedback: "Great quality food, thank you!"
          },
          {
            id: 2,
            organizationName: "Community Shelter",
            date: "2024-03-14",
            time: "15:45",
            items: "Dairy Products (3kg), Fruits (6kg)",
            impact: "Helped feed 15 people",
            rating: 4,
            feedback: "Very well packaged and on time"
          }
        ]
      };
    } else {
      return {
        stats: {
          totalPickups: 38,
          totalKgSaved: 423,
          peopleHelped: 980,
          averageRating: 4.7
        },
        pickups: [
          {
            id: 1,
            organizationName: "Fresh Bites Restaurant",
            date: "2024-03-15",
            time: "14:30",
            items: "Bread (5kg), Vegetables (8kg), Prepared Meals (10 portions)",
            foodSaved: "23kg",
            peopleHelped: 25,
            rating: 5,
            feedback: "Excellent quality and quantity"
          },
          {
            id: 2,
            organizationName: "Green Kitchen",
            date: "2024-03-14",
            time: "15:45",
            items: "Dairy Products (3kg), Fruits (6kg)",
            foodSaved: "9kg",
            peopleHelped: 15,
            rating: 4,
            feedback: "Good variety of fresh produce"
          }
        ]
      };
    }
  }
}

export default function CompletedPickups() {
  const { userType } = useParams();
  const [completedData, setCompletedData] = useState({
    stats: {
      totalPickups: 0,
      totalKgSaved: 0,
      peopleHelped: 0,
      averageRating: 0
    },
    pickups: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompletedPickups();
  }, [userType]); // Re-fetch when userType changes

  async function loadCompletedPickups() {
    try {
      setIsLoading(true);
      const data = await fetchCompletedPickups(userType);
      setCompletedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => loadCompletedPickups()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.completedPage}>
      <h1 className={styles.title}>Completed Pickups</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Pickups</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : completedData.stats.totalPickups}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Food Saved</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : `${completedData.stats.totalKgSaved}kg`}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>People Helped</h3>
          <p className={styles.statNumber}>
            {isLoading ? '...' : completedData.stats.peopleHelped}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3>Average Rating</h3>
          <div className={styles.ratingContainer}>
            <p className={styles.statNumber}>
              {isLoading ? '...' : completedData.stats.averageRating}
            </p>
            <span className={styles.stars}>
              {isLoading ? '' : renderStars(Math.round(completedData.stats.averageRating))}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.pickupsList}>
        {isLoading ? (
          <div className={styles.loading}>Loading completed pickups...</div>
        ) : completedData.pickups.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No completed pickups yet</p>
          </div>
        ) : (
          completedData.pickups.map((pickup) => (
            <div key={pickup.id} className={styles.pickupCard}>
              <div className={styles.pickupHeader}>
                <h3 className={styles.organizationName}>
                  {pickup.organizationName}
                </h3>
                <span className={styles.rating}>
                  {renderStars(pickup.rating)}
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
                  <span className={styles.label}>
                    {userType === 'Restaurant' ? 'Impact:' : 'Food Saved:'}
                  </span>
                  <span>
                    {userType === 'Restaurant' ? pickup.impact : pickup.foodSaved}
                  </span>
                </div>
                {pickup.feedback && (
                  <div className={styles.feedback}>
                    <p className={styles.feedbackLabel}>Feedback:</p>
                    <p className={styles.feedbackText}>{pickup.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 