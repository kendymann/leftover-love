'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

export default function SignUp() {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch(buildApiUrl('auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userType: selectedType,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Sign-up failed');
      }
  
      // Redirect to login page after successful signup
      alert('Account created successfully! Please log in.');
      window.location.href = '/auth/login';
    } catch (error) {
      alert(error.message || 'An error occurred during sign-up');
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderForm = () => {
    return (
      <motion.form 
        className={styles.form}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>Organization Name</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={styles.input}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            className={styles.input}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            className={styles.input}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            className={styles.input}
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder={selectedType === 'restaurant' 
              ? 'Tell us about your restaurant...'
              : 'Tell us about your organization...'}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </motion.form>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        {!selectedType ? (
          <div className={styles.selectionContainer}>
            <h1 className={styles.title}>Join NoWaste</h1>
            <p className={styles.subtitle}>Select Your Account Type</p>
            <motion.div
              className={styles.selectionButton}
              onClick={() => setSelectedType('restaurant')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Restaurant
            </motion.div>
            <motion.div
              className={styles.selectionButton}
              onClick={() => setSelectedType('foodbank')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Food Bank / Charity
            </motion.div>
          </div>
        ) : (
          renderForm()
        )}
      </div>
      <p className={styles.switchText}>
        Already have an account?{' '}
        <Link href="/auth/login" className={styles.switchLink}>
          Log in
        </Link>
      </p>
    </div>
  );
}
