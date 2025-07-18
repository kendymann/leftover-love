'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function CharityAccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({ email: "", phone: "", address: "" });

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFormData({
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\(\d{3}\)\s?)?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSave = async () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Update localStorage
        const updatedUser = { ...userData, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setIsEditing(false);

        // Here you would typically also send the update to your backend
        console.log('User data updated:', updatedUser);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
      });
    }
    setIsEditing(false);
    setErrors({});
  };

  if (!userData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading account information...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your charity account information and preferences</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Profile Information</h2>
            {!isEditing ? (
              <button 
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.saveButton}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button 
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Organization Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter organization name"
                />
              ) : (
                <div className={styles.displayValue}>{userData.username || 'Not provided'}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <div className={styles.errorText}>{errors.email}</div>}
                </div>
              ) : (
                <div className={styles.displayValue}>{userData.email || 'Not provided'}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
                </div>
              ) : (
                <div className={styles.displayValue}>{userData.phone || 'Not provided'}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              {isEditing ? (
                <div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                    placeholder="Enter organization address"
                    rows={3}
                  />
                  {errors.address && <div className={styles.errorText}>{errors.address}</div>}
                </div>
              ) : (
                <div className={styles.displayValue}>{userData.address || 'Not provided'}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Account Type</label>
              <div className={styles.accountType}>
                <span className={styles.charityBadge}>Charity Organization</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsCard}>
          <h3 className={styles.cardTitle}>Impact Summary</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>127</div>
              <div className={styles.statLabel}>Food Collections</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>2,340</div>
              <div className={styles.statLabel}>People Fed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>845kg</div>
              <div className={styles.statLabel}>Food Rescued</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>92%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
