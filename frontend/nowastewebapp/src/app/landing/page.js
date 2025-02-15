"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/navbar";
import { FaRecycle, FaShippingFast, FaTrashAlt, FaRegHandshake, FaCalendarAlt, FaChartLine, FaHeart } from "react-icons/fa";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <FaHeart className={styles.heartIcon} />
          <h1>Leftover Love</h1>
          <p>
            Spreading love through food rescue - connecting restaurants with charities to share surplus with those in need.
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image src="/donations.jpg" alt="Food Donations" width={800} height={400} className={styles.image} />
          <div className={styles.imageOverlay}></div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutUs}>
        <h2>Sharing More Than Just Food</h2>
        <p>
          Leftover Love is a heartfelt initiative bringing together restaurants and charities to reduce food waste
          while helping those in need. We believe every meal has the potential to make a difference, turning
          surplus into smiles and waste into warmth. Our platform makes it easy to donate, collect, and track
          your impact in creating a more sustainable and caring community.
        </p>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <h2>Making a Difference Together</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitBox}>
            <FaHeart className={styles.icon} />
            <h3>Community Impact</h3>
            <p>
              Transform surplus food into meaningful meals for those in need, strengthening community bonds.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaShippingFast className={styles.icon} />
            <h3>Swift Delivery</h3>
            <p>
              Quick and efficient pickup system ensuring food reaches those who need it while it's fresh.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaRecycle className={styles.icon} />
            <h3>Zero Waste</h3>
            <p>
              Minimize environmental impact by redirecting surplus food from landfills to loving homes.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaRegHandshake className={styles.icon} />
            <h3>Meaningful Partnerships</h3>
            <p>
              Connect with like-minded organizations committed to making a positive difference.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaCalendarAlt className={styles.icon} />
            <h3>Flexible Scheduling</h3>
            <p>
              Easy-to-use scheduling system that works around your business hours.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaChartLine className={styles.icon} />
            <h3>Impact Tracking</h3>
            <p>
              Monitor your contribution to the community with detailed impact reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <FaHeart className={styles.footerIcon} />
            <h2>Leftover Love</h2>
          </div>
          <p>Turning surplus into smiles, waste into warmth.</p>
          <div className={styles.socialLinks}>
            <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a>
          </div>
          <p className={styles.copyright}>&copy; 2024 Leftover Love. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
