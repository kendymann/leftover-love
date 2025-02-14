"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/navbar";
import { FaRecycle, FaShippingFast, FaTrashAlt, FaRegHandshake, FaCalendarAlt, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    
    <div className={styles.pageWrapper}>
        {/* Navbar */}
        <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>No Waste Platform</h1>
        <p>
          Connecting businesses with excess waste to collection services, ensuring sustainability and reducing waste.
        </p>
      </section>

      {/* Image Section */}
      <section className={styles.imageSection}>
        <Image src="/donations.jpg" alt="Donations" width={800} height={400} className={styles.image} />
      </section>

      {/* About Us Section */}
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p>
          The No Waste Platform is a sustainability-driven initiative that connects businesses with surplus waste
          to collection services and recycling partners. Our goal is to minimize landfill waste, promote responsible
          disposal practices, and create a more eco-friendly world. Whether you're a business looking to donate, recycle,
          or efficiently dispose of waste, our platform streamlines the process for maximum impact.
        </p>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <h2>Total Benefits</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitBox}>
            <FaRecycle className={styles.icon} />
            <h3>Waste Reduction</h3>
            <p>
              Reduce the amount of waste sent to landfills by connecting businesses with local waste collection services.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaShippingFast className={styles.icon} />
            <h3>Efficient Pickup</h3>
            <p>
              Schedule convenient waste pickups that fit into your business's routine, ensuring no waste is left behind.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaTrashAlt className={styles.icon} />
            <h3>Proper Disposal</h3>
            <p>
              Ensure that all waste is disposed of in an environmentally friendly and responsible manner.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaRegHandshake className={styles.icon} />
            <h3>Business Partnerships</h3>
            <p>
              Build partnerships with like-minded businesses that are committed to sustainability and waste reduction.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaCalendarAlt className={styles.icon} />
            <h3>Scheduled Collection</h3>
            <p>
              Easily plan and schedule waste pickups to fit your business needs and ensure minimal disruption.
            </p>
          </div>
          <div className={styles.benefitBox}>
            <FaChartLine className={styles.icon} />
            <h3>Sustainability Reports</h3>
            <p>
              Track and measure your business's sustainability progress with detailed reports on waste reduction.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2>No Waste Platform</h2>
          <p>&copy; 2025 No Waste Platform. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
