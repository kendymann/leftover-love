'use client';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

export default function CompletedPickups() {
  const { userType } = useParams();

  // This will be replaced with actual data from the backend
  const completedPickups = {
    restaurant: [
      {
        id: 1,
        charityName: "Local Food Bank",
        date: "2024-03-15",
        time: "14:30",
        items: "Bread (5kg), Vegetables (8kg), Prepared Meals (10 portions)",
        impact: "Helped feed 25 people",
        rating: 5
      },
      {
        id: 2,
        charityName: "Community Shelter",
        date: "2024-03-14",
        time: "15:45",
        items: "Dairy Products (3kg), Fruits (6kg)",
        impact: "Helped feed 15 people",
        rating: 4
      }
    ],
    charity: [
      {
        id: 1,
        restaurantName: "Fresh Bites Restaurant",
        date: "2024-03-15",
        time: "14:30",
        items: "Bread (5kg), Vegetables (8kg), Prepared Meals (10 portions)",
        peopleHelped: 25,
        foodSaved: "23kg",
        rating: 5
      },
      {
        id: 2,
        restaurantName: "Green Kitchen",
        date: "2024-03-14",
        time: "15:45",
        items: "Dairy Products (3kg), Fruits (6kg)",
        peopleHelped: 15,
        foodSaved: "9kg",
        rating: 4
      }
    ]
  };

  const data = userType === 'Restaurant' ? completedPickups.restaurant : completedPickups.charity;

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className={styles.completedPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Completed Pickups</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Pickups</h3>
            <p className={styles.statNumber}>{data.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>{userType === 'Restaurant' ? 'People Helped' : 'Food Saved'}</h3>
            <p className={styles.statNumber}>
              {userType === 'Restaurant' ? '40' : '32kg'}
            </p>
          </div>
          <div className={styles.statCard}>
            <h3>Average Rating</h3>
            <p className={styles.statNumber}>4.5</p>
          </div>
        </div>
      </div>

      <div className={styles.pickupsList}>
        {data.map((pickup) => (
          <div key={pickup.id} className={styles.pickupCard}>
            <div className={styles.pickupHeader}>
              <h3 className={styles.organizationName}>
                {userType === 'Restaurant' ? pickup.charityName : pickup.restaurantName}
              </h3>
              <span className={styles.rating}>{renderStars(pickup.rating)}</span>
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
                  {userType === 'Restaurant' ? 'Impact:' : 'People Helped:'}
                </span>
                <span>
                  {userType === 'Restaurant' ? pickup.impact : `${pickup.peopleHelped} people`}
                </span>
              </div>
              {userType === 'Charity' && (
                <div className={styles.detail}>
                  <span className={styles.label}>Food Saved:</span>
                  <span>{pickup.foodSaved}</span>
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 