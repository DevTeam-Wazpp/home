import React from 'react';
import { ArrowRight, Bot, Users, BarChart3, Check } from 'lucide-react';
import WhatsAppPreview from '../components/WhatsAppPreview';

export default function Home({ navigateTo }) {
  return (
    <main>
      {/* Hero Section */}
      <section className="shell hero" aria-labelledby="hero-title">
        <div>
          <div className="eyebrow-badge">
            <span className="badge-dot" />
            <span>WhatsApp automation for modern era</span>
          </div>

          <h1 id="hero-title">
            Chat @Waz<span className="hero-title-accent">p</span>p to grow.
          </h1>

          <p className="intro">
            Wazpp helps businesses communicate smarter, faster, and at scale. Turn everyday conversations into customers, sales, and lasting relationships.
          </p>

          <div className="actions">
            <button 
              className="button primary" 
              onClick={() => navigateTo('contact')}
              type="button"
            >
              Get started
              <ArrowRight size={15} />
            </button>
            <button 
              className="button secondary" 
              onClick={() => navigateTo('platform')}
              type="button"
            >
              Explore the platform
            </button>
          </div>
        </div>

        <div className="orbital" aria-label="Wazpp turns chats into growth">
          <div className="orbital-ring one" />
          <div className="orbital-ring two" />
          <span className="spark one" />
          <span className="spark two" />
          
          <div className="core">
            <div>
              <div className="hero-logo-mark">
                <img src="/web-logo.png" alt="Wazpp" />
              </div>
              <small>Conversations that grow</small>
            </div>
          </div>

          <div className="floating-pill">
            <span className="pulse-dot-online" />
            <span>Live Automation Active</span>
          </div>
        </div>
      </section>

      {/* Interactive WhatsApp Live Demonstration */}
      <section className="section shell" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Real-Time Experience</div>
            <h2>See the engine in motion.</h2>
          </div>
          <p>
            Experience how Wazpp eliminates manual typing while maintaining human warmth across your entire customer lifecycle.
          </p>
        </div>
        <WhatsAppPreview />
      </section>

      {/* Core 3 Pillars */}
      <section className="section shell" aria-labelledby="platform-title">
        <div className="section-head">
          <div>
            <div className="eyebrow">Platform Capabilities</div>
            <h2 id="platform-title">Your best<br />conversations.</h2>
          </div>
          <p>One clear platform for the messages, workflows, and customer moments that move your business forward.</p>
        </div>

        <div className="grid three">
          <article className="feature-card">
            <div className="number">
              <span>01 / Automate</span>
              <div className="feature-icon-bubble">
                <Bot size={18} />
              </div>
            </div>
            <div>
              <h3>Reply in real time.</h3>
              <p>Handle repetitive questions with helpful automated replies, day or night.</p>
            </div>
          </article>

          <article className="feature-card">
            <div className="number">
              <span>02 / Coordinate</span>
              <div className="feature-icon-bubble">
                <Users size={18} />
              </div>
            </div>
            <div>
              <h3>Work as one team.</h3>
              <p>Bring support, sales, and marketing into one shared multi-agent inbox.</p>
            </div>
          </article>

          <article className="feature-card">
            <div className="number">
              <span>03 / Understand</span>
              <div className="feature-icon-bubble">
                <BarChart3 size={18} />
              </div>
            </div>
            <div>
              <h3>See what works.</h3>
              <p>Use live analytics to learn from every campaign and customer interaction.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Brand Commitment Band */}
      <section className="band green">
        <div className="shell split">
          <div>
            <div className="eyebrow lime">Built for business</div>
            <h2>From first hello<br />to lasting loyalty.</h2>
          </div>
          <ul className="check-list">
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Automated customer support that still feels human.</span>
            </li>
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Targeted campaigns that reach the right people.</span>
            </li>
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>CRM and API integrations that fit your workflow.</span>
            </li>
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Sales and marketing automations that scale with you.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shell cta">
        <div>
          <div className="eyebrow">Less manual. More meaningful.</div>
          <h2>Make every chat count.</h2>
        </div>
        <div className="cta-box">
          <p>Wazpp gives your team the automation infrastructure to communicate efficiently and grow confidently.</p>
          <button 
            className="button" 
            onClick={() => navigateTo('contact')}
            type="button"
          >
            Talk to our team
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </main>
  );
}
