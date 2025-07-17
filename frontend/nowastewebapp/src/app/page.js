/**
 * Leftover Love - Landing Page
 * 
 * Main landing page showcasing the platform's mission to connect
 * restaurants with charities to reduce food waste and help communities.
 */

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Leftover Love
            <span className={styles.subtitle}>Sharing More Than Just Food</span>
          </h1>
          
          <p className={styles.description}>
            Connecting restaurants with surplus food to charities and local food banks. 
            Together, we're turning waste into warmth and surplus into smiles.
          </p>

          <div className={styles.heroImage}>
            <Image 
              src="/donations.jpg" 
              alt="Food donation helping community"
              width={400}
              height={300}
              className={styles.donationImage}
            />
          </div>

          <div className={styles.actionButtons}>
            <Link href="/auth/signup" className={styles.primaryButton}>
              Get Started
            </Link>
            <Link href="/auth/login" className={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>How It Works</h2>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>🍽️ For Restaurants</h3>
            <p>List surplus food items instead of throwing them away. Track your environmental impact and help your community.</p>
          </div>
          
          <div className={styles.featureCard}>
            <h3>❤️ For Charities</h3>
            <p>Browse available food donations, schedule pickups, and provide meals to those who need them most.</p>
          </div>
          
          <div className={styles.featureCard}>
            <h3>📊 Track Impact</h3>
            <p>See how much food you've saved, how many people you've helped, and your contribution to reducing waste.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <h2 className={styles.statsTitle}>Making a Difference</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1000+</span>
            <span className={styles.statLabel}>Meals Saved</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Partner Restaurants</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Charities Helped</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Made with ❤️ by the Leftover Love Team</p>
        <div className={styles.footerLinks}>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
