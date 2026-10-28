import React, { useState } from 'react';
import { Mail, Link, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    teamSize: '1-10'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate instantaneous, reliable submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '', teamSize: '1-10' });
    setSubmitted(false);
  };

  return (
    <main>
      {/* Page Hero */}
      <section className="shell page-hero">
        <div className="eyebrow-badge">
          <span className="badge-dot" />
          <span>Let's talk</span>
        </div>
        <h1>Bring us your next good problem.</h1>
        <p className="intro">
          Tell us where communication is slowing your business down. We will help you find the clearest way forward.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="section shell">
        <div className="contact-layout">
          {/* Left Column Info */}
          <div className="contact-info">
            <div className="eyebrow">Start a conversation</div>
            <h2>Make more room for growth.</h2>
            <p>
              Share a little about your team, your customers, and what you want to automate. A real person from Wazpp will follow up within 24 hours.
            </p>

            <div className="contact-card-box">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>hello@wazpp.com</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    For partnerships, product questions, or a quick hello.
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Link size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>@wazpp_</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Follow our journey and daily automation tips on Instagram.
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Average Response Time</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Under 2 hours during standard business hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div>
            {submitted ? (
              <div className="contact-form form-success-box">
                <CheckCircle2 size={48} color="var(--green)" style={{ margin: '0 auto 16px' }} />
                <h3>Message Received!</h3>
                <p>
                  Thanks <strong>{formData.name}</strong>. A dedicated Wazpp solutions specialist will be in touch with you at <strong>{formData.email}</strong> shortly.
                </p>
                <button 
                  type="button" 
                  className="button primary" 
                  onClick={handleReset}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form 
                className="contact-form" 
                id="contact-form" 
                onSubmit={handleSubmit}
              >
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Work email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="teamSize">Team Size</label>
                  <select 
                    id="teamSize" 
                    name="teamSize" 
                    value={formData.teamSize}
                    onChange={handleChange}
                  >
                    <option value="1-10">1 - 10 people (Startup / Boutique)</option>
                    <option value="11-50">11 - 50 people (Growing Business)</option>
                    <option value="51-200">51 - 200 people (Scale-up)</option>
                    <option value="200+">200+ people (Enterprise)</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">What are you building or looking to automate?</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="Tell us about your current messaging volume, customer journey, or CRM tools..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button 
                  className="button primary" 
                  type="submit" 
                  disabled={submitting}
                  style={{ width: '100%' }}
                >
                  {submitting ? 'Sending...' : 'Send message'}
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
