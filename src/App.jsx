import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

const PAGE_METADATA = {
  home: {
    title: 'Wazpp | Chat to Grow - Modern WhatsApp Automation',
    description: 'Wazpp turns WhatsApp into a powerful customer engagement and sales platform.'
  },
  platform: {
    title: 'Platform | Wazpp - Tools for the Whole Journey',
    description: 'Explore the Wazpp WhatsApp automation platform for smarter customer communication.'
  },
  pricing: {
    title: 'Pricing & Plans | Wazpp - Chat to Grow',
    description: 'Explore Wazpp WhatsApp automation pricing and plans. Transparent, flexible pricing for teams of all sizes.'
  },
  about: {
    title: 'About Wazpp | Chat to Grow',
    description: 'Learn about Wazpp, the WhatsApp automation startup built around the idea Chat to Grow.'
  },
  contact: {
    title: 'Contact Wazpp | Start a Conversation',
    description: 'Talk to Wazpp about WhatsApp automation for your business.'
  }
};

export default function App() {
  const getPageFromRoute = () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const route = path || hash;

    if (route.startsWith('pricing') || ['pricing', 'plans', 'praicing'].includes(hash)) return 'pricing';
    if (route.startsWith('platform') || ['platform', 'features'].includes(hash)) return 'platform';
    if (route.startsWith('about') || hash === 'about') return 'about';
    if (route.startsWith('contact') || hash === 'contact') return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPage(getPageFromRoute());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    // Update document title and meta description dynamically
    const meta = PAGE_METADATA[currentPage] || PAGE_METADATA.home;
    document.title = meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateTo = (page) => {
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.history && window.history.pushState) {
      try {
        window.history.pushState({}, '', targetPath);
      } catch (_) {}
    }
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page);
  };

  return (
    <div className="app-layout">
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      
      {currentPage === 'home' && <Home navigateTo={navigateTo} />}
      {currentPage === 'platform' && <Platform navigateTo={navigateTo} />}
      {currentPage === 'pricing' && <Pricing navigateTo={navigateTo} />}
      {currentPage === 'about' && <About navigateTo={navigateTo} />}
      {currentPage === 'contact' && <Contact navigateTo={navigateTo} />}

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
