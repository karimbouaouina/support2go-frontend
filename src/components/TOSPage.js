import React from 'react';
import styles from './TermsOfService.module.css';

function TermsOfService() {
  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>Terms of Service</h1>
      <p>Last updated: April 2024</p>
      <h2 className={styles.subheading}>1. Introduction</h2>
      <p>Welcome to the Support2Go Ticketing Platform. By accessing our service, you agree to be bound by these Terms of Service. Please read them carefully.</p>
      
      <h2 className={styles.subheading}>2. Privacy Policy</h2>
      <p>Our Privacy Policy describes how we handle the information you provide to us when you use our services. You understand that through your use of our services, you consent to the collection and use of this information.</p>
      
      <h2 className={styles.subheading}>3. Service Use</h2>
      <p>The services we provide are intended for business use. You agree not to misuse the services ("Service") or help anyone else do so.</p>
      
      <h2 className={styles.subheading}>4. Your Commitments</h2>
      <p>In return for our commitment to provide the Service, we require you to make the below commitments to us. Your agreement not to engage in prohibited activities is an essential part of the contract that we have with you.</p>
      
      <h2 className={styles.subheading}>5. Modifications to the Service</h2>
      <p>We constantly change and improve our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.</p>
      
      <h2 className={styles.subheading}>6. Liability for our Services</h2>
      <p>Except where prohibited, the Service Provider shall not be liable for any indirect, special, incidental, consequential, or exemplary damages arising from your use of the services or any third party’s use of the services.</p>
      
      <h2 className={styles.subheading}>7. General</h2>
      <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our services. You should look at the terms regularly.</p>
      
      <h2 className={styles.subheading}>8. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at support2go@ticketingplatform.com</p>
    </div>
  );
}

export default TermsOfService;
