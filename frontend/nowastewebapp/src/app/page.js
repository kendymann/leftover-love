/**
 * Leftover Love - Landing Page
 * 
 * Strava-inspired design with centered signup and full-width photos
 */

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Simple Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <h3>Leftover Love</h3>
          </div>
          <div className={styles.navLinks}>
            <Link href="/about">About</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/auth/login" className={styles.loginLink}>Log In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Strava Style */}
      <section className={styles.hero}>
        <div className={styles.heroLayout}>
          {/* Left Photo - Full Width */}
          <div className={styles.heroImageLeft}>
            <div className={styles.imageContainer}>
              <span>🍽️</span>
              <p>Add restaurant team photo:<br />public/restaurant-team.jpg</p>
            </div>
          </div>

          {/* Center Content */}
          <div className={styles.heroCenter}>
            <h1 className={styles.title}>Leftover Love</h1>
            <p className={styles.tagline}>Sharing More Than Just Food</p>
            
            <p className={styles.description}>
              The social network for food sharing. Connect restaurants with charities, 
              track your impact, and join a community making a difference.
            </p>

            <div className={styles.signupForm}>
              <h2 className={styles.signupTitle}>Join Leftover Love for free</h2>
              
              <div className={styles.buttonStack}>
                <Link href="/auth/signup?type=restaurant" className={styles.primaryButton}>
                  Sign up as Restaurant
                </Link>
                <Link href="/auth/signup?type=charity" className={styles.secondaryButton}>
                  Sign up as Charity
                </Link>
              </div>

              <div className={styles.divider}>
                <span>or</span>
              </div>

              <Link href="/auth/login" className={styles.loginButton}>
                Log In
              </Link>
            </div>
          </div>

          {/* Right Photo - Full Width */}
          <div className={styles.heroImageRight}>
            <div className={styles.imageContainer}>
              <span>❤️</span>
              <p>Add charity volunteers photo:<br />public/charity-volunteers.jpg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1,247</span>
            <span className={styles.statLabel}>Meals Saved</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>52</span>
            <span className={styles.statLabel}>Restaurants</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>28</span>
            <span className={styles.statLabel}>Charities</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>3.2k</span>
            <span className={styles.statLabel}>People Helped</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureImage}>
            <div className={styles.imagePlaceholder}>
              <span>📱</span>
              <p>Add app screenshot here:<br />public/restaurant-dashboard.jpg</p>
            </div>
          </div>
          <div className={styles.featureContent}>
            <h2>For Restaurants</h2>
            <p>List surplus food instead of discarding it. Track your environmental impact and make a difference in your community with just a few taps.</p>
            <ul className={styles.featureList}>
              <li>✓ Quick food listing</li>
              <li>✓ Impact tracking</li>
              <li>✓ Pickup coordination</li>
            </ul>
          </div>
        </div>

        <div className={styles.featureItem + ' ' + styles.featureReverse}>
          <div className={styles.featureContent}>
            <h2>For Charities</h2>
            <p>Discover available donations, schedule pickups, and bring fresh meals to those who need them most. Simple, efficient, impactful.</p>
            <ul className={styles.featureList}>
              <li>✓ Browse donations</li>
              <li>✓ Schedule pickups</li>
              <li>✓ Track community impact</li>
            </ul>
          </div>
          <div className={styles.featureImage}>
            <div className={styles.imagePlaceholder}>
              <span>🌟</span>
              <p>Add charity dashboard screenshot:<br />public/charity-dashboard.jpg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className={styles.community}>
        <div className={styles.communityContent}>
          <h2>Be Part of Something Bigger</h2>
          <p>Join thousands of restaurants and charities making a real difference in their communities.</p>
          
          <div className={styles.communityGrid}>
            <div className={styles.communityCard}>
              <div className={styles.imagePlaceholder}>
                <span>👥</span>
                <p>Happy community photo 1:<br />public/community-1.jpg</p>
              </div>
            </div>
            <div className={styles.communityCard}>
              <div className={styles.imagePlaceholder}>
                <span>🤝</span>
                <p>Happy community photo 2:<br />public/community-2.jpg</p>
              </div>
            </div>
            <div className={styles.communityCard}>
              <div className={styles.imagePlaceholder}>
                <span>🌟</span>
                <p>Happy community photo 3:<br />public/community-3.jpg</p>
              </div>
            </div>
          </div>
          
          <Link href="/auth/signup" className={styles.communityButton}>
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>Leftover Love</h3>
            <p>Turning waste into warmth, surplus into smiles.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Platform</h4>
              <Link href="/about">About</Link>
              <Link href="/how-it-works">How It Works</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 Leftover Love Team. Made with ❤️ for the community.</p>
        </div>
      </footer>
    </div>
  );
}
