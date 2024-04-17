import React from 'react';
import styles from './FrequentlyAskedQuestions.module.css';

function FrequentlyAskedQuestions() {
  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>Frequently Asked Questions (FAQ)</h1>
      <p>Last updated: April 2024</p>
      <h2 className={styles.subheading}>How do I create a new support ticket?</h2>
      <p>To create a new support ticket, simply log in to your account, navigate to the dashboard, and click on "Submit a Ticket." Fill out the form with your issue details and submit.</p>
      
      <h2 className={styles.subheading}>Can I use Support2Go without an account?</h2>
      <p>You need an account to submit a support ticket. This helps us provide a personalized and secure experience. Creating an account is quick and easy!</p>
      
      <h2 className={styles.subheading}>How long does it take to get a response to my ticket?</h2>
      <p>Our team strives to respond to all tickets within 24 hours. However, response times may vary depending on the complexity of the issue and current ticket volume.</p>
      
      <h2 className={styles.subheading}>How can I track the status of my support ticket?</h2>
      <p>You can track your support ticket status through your dashboard. You'll also receive email notifications for any updates or resolutions.</p>
      
      <h2 className={styles.subheading}>Is my personal information safe with Support2Go?</h2>
      <p>Absolutely. We prioritize the privacy and security of your data. Please refer to our Privacy Policy for more information on how we protect your information.</p>
      <h2 className={styles.subheading}><br></br></h2>
      <h2 className={styles.subheading}>Thank you for choosing Support2Go!</h2>
    </div>
  );
}

export default FrequentlyAskedQuestions;
