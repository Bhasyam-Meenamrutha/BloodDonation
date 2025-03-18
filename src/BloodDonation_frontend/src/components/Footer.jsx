import React from 'react';
import { Droplet, Phone, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <Droplet size={24} />
            <h3>LifeStream</h3>
          </div>
          <p>Connecting blood donors with those in need, one drop at a time.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#eligibility">Donor Eligibility</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Emergency Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>24/7 Support</h3>
          <div className="contact-info">
            <p><Phone size={16} /> Emergency: +1 (800) 555-0123</p>
            <p><Mail size={16} /> support@lifestream.org</p>
            <p><MapPin size={16} /> 123 Blood Bank Ave, Medical District</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 LifeStream. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;