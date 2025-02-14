'use client';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

export default function AccountPage() {
  const { userType } = useParams();
  
  // This will be replaced with actual data from the backend
  const accountData = {
    restaurant: {
      name: "Fresh Bites Restaurant",
      email: "contact@freshbites.com",
      address: "123 Main St, City",
      phone: "(555) 123-4567",
      description: "Family-owned restaurant specializing in fresh, local ingredients",
      operatingHours: "Mon-Sat: 11:00 AM - 10:00 PM",
      preferredPickupTimes: "2:00 PM - 4:00 PM"
    },
    charity: {
      name: "Local Food Bank",
      email: "help@localfoodbank.org",
      address: "456 Oak Ave, City",
      phone: "(555) 987-6543",
      description: "Non-profit organization helping to feed local communities",
      serviceArea: "Within 10 miles of city center",
      storageCapacity: "500 sq ft of refrigerated storage"
    }
  };

  const data = userType === 'Restaurant' ? accountData.restaurant : accountData.charity;

  return (
    <div className={styles.accountPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <button className={styles.saveButton}>Save Changes</button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Organization Name</label>
              <input
                type="text"
                className={styles.input}
                defaultValue={data.name}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                defaultValue={data.email}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                className={styles.input}
                defaultValue={data.phone}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input
                type="text"
                className={styles.input}
                defaultValue={data.address}
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Organization Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              defaultValue={data.description}
              rows={4}
            />
          </div>
          
          {userType === 'Restaurant' ? (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Operating Hours</label>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={data.operatingHours}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Preferred Pickup Times</label>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={data.preferredPickupTimes}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Service Area</label>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={data.serviceArea}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Storage Capacity</label>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={data.storageCapacity}
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Security</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Current Password</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Enter current password"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        <div className={styles.dangerZone}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <button className={styles.deleteButton}>Delete Account</button>
        </div>
      </div>
    </div>
  );
} 