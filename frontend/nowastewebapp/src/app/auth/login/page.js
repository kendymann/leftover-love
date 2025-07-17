'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { buildApiUrl } from '@/utils/config';

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState('restaurant');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await fetch(buildApiUrl('auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('token', data.access_token || data.token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify(data.user));

      // Redirect to appropriate dashboard
      router.push(`/dashboards/${userType}`);
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
          src="/charity2.jpg"
          alt="Community sharing food"
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
        <Link href="/auth/signup" className={styles.signupLink}>
          Sign Up
        </Link>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <h1>Welcome Back</h1>
            <p>Log in to continue making a difference</p>
          </div>

          {/* User Type Selection */}
          <div className={styles.typeSelection}>
            <label className={styles.typeLabel}>I am a:</label>
            <div className={styles.typeButtons}>
              <button
                type="button"
                className={`${styles.typeButton} ${userType === 'restaurant' ? styles.active : ''}`}
                onClick={() => setUserType('restaurant')}
              >
                Restaurant
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${userType === 'charity' ? styles.active : ''}`}
                onClick={() => setUserType('charity')}
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

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Don't have an account?{' '}
              <Link href="/auth/signup" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
