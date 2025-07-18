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
    // Return mock data if fetch fails
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

// Function to schedule new pickup
async function schedulePickup(pickupData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(buildApiUrl('restaurants/food-items'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pickupData)
    });

    if (!response.ok) {
      throw new Error('Failed to schedule pickup');
    }

    return await response.json();
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    throw error;
  }
}

export default function RestaurantScheduledPickups() {
  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingPickup, setEditingPickup] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    quantity_unit: 'kg',
    expiry_date: '',
    available_date: '',
    available_time: '',
    description: '',
    storage_instructions: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (pickup) => {
    setEditingPickup(pickup.id);
    setFormData({
      name: pickup.items,
      quantity: '',
      quantity_unit: 'kg',
      expiry_date: '',
      available_date: pickup.date,
      available_time: pickup.time,
      description: '',
      storage_instructions: ''
    });
    setShowScheduleForm(true);
  };

  const handleDelete = async (pickupId) => {
    if (window.confirm('Are you sure you want to cancel this pickup?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(buildApiUrl(`listings/${pickupId}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to cancel pickup');
        }

        // Remove from local state
        setScheduledPickups(prev => prev.filter(pickup => pickup.id !== pickupId));
      } catch (err) {
        setError('Failed to cancel pickup');
        console.error('Error deleting pickup:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      quantity: '',
      quantity_unit: 'kg',
      expiry_date: '',
      available_date: '',
      available_time: '',
      description: '',
      storage_instructions: ''
    });
    setEditingPickup(null);
    setShowScheduleForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPickup) {
        // Update existing pickup
        const token = localStorage.getItem('token');
        const response = await fetch(buildApiUrl(`listings/${editingPickup}`), {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            quantity: parseFloat(formData.quantity),
            quantity_unit: formData.quantity_unit,
            expiry_date: formData.expiry_date,
            available_date: formData.available_date,
            available_time: formData.available_time,
            description: formData.description,
            storage_instructions: formData.storage_instructions
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update pickup');
        }

        const updatedPickup = await response.json();
        setScheduledPickups(prev => 
          prev.map(pickup => 
            pickup.id === editingPickup 
              ? { 
                  ...pickup, 
                  items: updatedPickup.name, 
                  date: updatedPickup.available_date, 
                  time: updatedPickup.available_time 
                }
              : pickup
          )
        );
      } else {
        // Create new pickup
        await schedulePickup(formData);
        loadScheduledPickups();
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

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
      <div className={styles.header}>
        <h1 className={styles.title}>Scheduled Pickups</h1>
        <p className={styles.subtitle}>Manage your food donation schedule</p>
        <button 
          className={styles.addButton}
          onClick={() => setShowScheduleForm(true)}
        >
          Schedule New Pickup
        </button>
      </div>

      <div className={styles.pickupsList}>
        {isLoading ? (
          <div className={styles.loading}>Loading scheduled pickups...</div>
        ) : (
          scheduledPickups.map((pickup) => (
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
                <button 
                  className={styles.actionButton}
                  onClick={() => handleEdit(pickup)}
                >
                  Edit
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.cancelButton}`}
                  onClick={() => handleDelete(pickup.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showScheduleForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingPickup ? 'Edit Pickup' : 'Schedule New Pickup'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Food Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Unit</label>
                  <select
                    name="quantity_unit"
                    value={formData.quantity_unit}
                    onChange={handleInputChange}
                    className={styles.input}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="portions">Portions</option>
                    <option value="items">Items</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Available Date</label>
                  <input
                    type="date"
                    name="available_date"
                    value={formData.available_date}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Available Time</label>
                  <input
                    type="time"
                    name="available_time"
                    value={formData.available_time}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.textarea}`}
                  rows="3"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Storage Instructions</label>
                <textarea
                  name="storage_instructions"
                  value={formData.storage_instructions}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.textarea}`}
                  rows="2"
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.cancelButton}`}
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.actionButton}
                >
                  {editingPickup ? 'Update Pickup' : 'Schedule Pickup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 