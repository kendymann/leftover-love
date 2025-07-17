'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

export default function SignUp() {
  const [selectedType, setSelectedType] = useState('restaurant');
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
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
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
        throw new Error(data.message || 'Sign up failed');
      }

      // Handle successful signup
      window.location.href = `/dashboards/${selectedType}`;
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <Image
          src="/charity1.jpg"
          alt="Community helping each other"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay} />
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/Leftover Love Logo Design.png"
            alt="Leftover Love"
            width={28}
            height={28}
            style={{ objectFit: 'contain' }}
          />
          <h3>Leftover Love</h3>
        </Link>
        <Link href="/auth/login" className={styles.loginLink}>
          Log In
        </Link>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <h1>Join Leftover Love</h1>
            <p>Start making a difference in your community today</p>
          </div>

          {/* User Type Selection */}
          <div className={styles.typeSelection}>
            <label className={styles.typeLabel}>I am a:</label>
            <div className={styles.typeButtons}>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'restaurant' ? styles.active : ''}`}
                onClick={() => setSelectedType('restaurant')}
              >
                Restaurant
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'charity' ? styles.active : ''}`}
                onClick={() => setSelectedType('charity')}
              >
                Charity
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {selectedType === 'restaurant' ? 'Restaurant Name' : 'Organization Name'}
              </label>
              <input
                type="text"
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={selectedType === 'restaurant' ? 'Your restaurant name' : 'Your organization name'}
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
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Create a password"
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
                  placeholder="Confirm password"
                />
              </div>
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
                placeholder="Your address"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                className={styles.input}
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="(555) 123-4567"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {selectedType === 'restaurant' ? 'About Your Restaurant' : 'About Your Organization'}
              </label>
              <textarea
                name="description"
                className={styles.textarea}
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder={selectedType === 'restaurant' 
                  ? 'Tell us about your restaurant and why you want to join Leftover Love'
                  : 'Tell us about your organization and the community you serve'
                }
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className={styles.link}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
