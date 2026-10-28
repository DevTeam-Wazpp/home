import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ currentPage, navigateTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="shell nav-wrap">
        <a 
          className="logo" 
          href="/" 
          onClick={(e) => handleNavClick('home', e)}
          aria-label="Wazpp home"
        >
          <img src="/web-logo.png" alt="Wazpp - Chat to Grow" width="154" height="46" />
        </a>

        <button 
          className="menu-toggle" 
          aria-expanded={mobileMenuOpen} 
          aria-controls="site-nav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <nav 
          className={`site-nav ${mobileMenuOpen ? 'open' : ''}`} 
          id="site-nav" 
          aria-label="Main navigation"
        >
          <a 
            href="#home"
            className={currentPage === 'home' ? 'active' : ''}
            onClick={(e) => handleNavClick('home', e)}
          >
            Home
          </a>
          <a 
            href="#platform"
            className={currentPage === 'platform' ? 'active' : ''}
            onClick={(e) => handleNavClick('platform', e)}
          >
            Platform
          </a>
          <a 
            href="#about"
            className={currentPage === 'about' ? 'active' : ''}
            onClick={(e) => handleNavClick('about', e)}
          >
            About
          </a>
          <a 
            href="#contact"
            className={currentPage === 'contact' ? 'active' : ''}
            onClick={(e) => handleNavClick('contact', e)}
          >
            Contact
          </a>
          <a 
            className="nav-button" 
            href="#contact"
            onClick={(e) => handleNavClick('contact', e)}
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}
