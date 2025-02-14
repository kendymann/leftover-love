'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

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
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token in localStorage or a secure cookie
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', userType);

      // Redirect to the appropriate dashboard
      router.push(`/dashboards/${userType}`);
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.glassCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Welcome Back</h1>
        
        <div className={styles.typeSelector}>
          <button
            className={`${styles.typeButton} ${userType === 'restaurant' ? styles.active : ''}`}
            onClick={() => setUserType('restaurant')}
          >
            Restaurant
          </button>
          <button
            className={`${styles.typeButton} ${userType === 'foodbank' ? styles.active : ''}`}
            onClick={() => setUserType('foodbank')}
          >
            Food Bank / Charity
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className={styles.switchText}>
          Don't have an account?
          <Link href="/auth/signup" className={styles.switchLink}>
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
