import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer({ navigateTo }) {
  const [statusText, setStatusText] = useState('Available for select projects');

  const toggleStatus = () => {
    setStatusText(prev => 
      prev.includes('Available') 
        ? 'Chat to grow with us 🚀' 
        : 'Available for select projects'
    );
  };

  const handleLink = (page, e) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="shell site-footer">
      <span>© 2026 Wazpp</span>
      
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="#platform" onClick={(e) => handleLink('platform', e)}>Platform</a>
        <a href="#about" onClick={(e) => handleLink('about', e)}>About</a>
        <a href="#contact" onClick={(e) => handleLink('contact', e)}>Contact</a>
        <a 
          href="https://www.instagram.com/wazpp_/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </nav>

      <div className="status-wrap">
        <button 
          type="button" 
          className="status-badge" 
          id="status" 
          onClick={toggleStatus}
          title="Click to toggle status message"
        >
          <span className="badge-dot" />
          <span>{statusText}</span>
        </button>
      </div>
    </footer>
  );
}
