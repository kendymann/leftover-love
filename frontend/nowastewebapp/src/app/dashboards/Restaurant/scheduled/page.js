'use client';
import styles from './page.module.css';

export default function RestaurantScheduledPickups() {
  // This will be replaced with actual data from the backend
  const scheduledPickups = [
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

  return (
    <div className={styles.scheduledPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Scheduled Pickups</h1>
        <button className={styles.addButton}>Schedule New Pickup</button>
      </div>

      <div className={styles.pickupsList}>
        {scheduledPickups.map((pickup) => (
          <div key={pickup.id} className={styles.pickupCard}>
            <div className={styles.pickupHeader}>
              <h3 className={styles.charityName}>{pickup.charityName}</h3>
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
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton}>Edit</button>
              <button className={`${styles.actionButton} ${styles.cancelButton}`}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 