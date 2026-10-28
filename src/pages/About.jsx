import React from 'react';
import { ArrowRight, Sparkles, Target, Zap, Shield } from 'lucide-react';

export default function About({ navigateTo }) {
  return (
    <main>
      {/* Page Hero */}
      <section className="shell page-hero">
        <div className="eyebrow-badge">
          <span className="badge-dot" />
          <span>Why Wazpp exists</span>
        </div>
        <h1>Conversations are where growth begins.</h1>
        <p className="intro">
          Wazpp is a modern WhatsApp automation startup helping businesses communicate smarter, faster, and at scale.
        </p>
      </section>

      {/* Vision Band */}
      <section className="band green">
        <div className="shell split">
          <div>
            <div className="eyebrow lime">Our vision</div>
            <h2>Chat to grow.</h2>
          </div>
          <p>
            We believe every conversation has the potential to become a customer, a sale, or a lasting relationship. Wazpp eliminates repetitive manual messaging so teams can focus on meaningful interactions that drive business growth.
          </p>
        </div>
      </section>

      {/* Identity & Values */}
      <section className="section shell">
        <div className="split">
          <div>
            <div className="eyebrow">Our identity</div>
            <h2>Simple by design.<br />Built for momentum.</h2>
          </div>
          <div>
            <p style={{ marginTop: 0, marginBottom: 28, color: 'var(--muted)', fontSize: '1.12rem' }}>
              Wazpp represents speed, simplicity, and scalable communication. Our green-and-black visual language reflects trust, growth, and the directness of WhatsApp-powered communication. The identity is clean and confident because the product should feel that way too.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                padding: '20px',
                background: 'var(--paper-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <Zap size={20} color="var(--green)" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>Sub-50ms Speed</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Zero lag automated message pipeline and webhooks.</div>
              </div>
              <div style={{
                padding: '20px',
                background: 'var(--paper-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <Shield size={20} color="var(--green)" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>Bank-Grade Trust</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Official WhatsApp Business API partner compliance.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Methodology */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">How we build</div>
            <h2>Built around<br />real work.</h2>
          </div>
          <p>Whether you are launching a startup or scaling an established business, the infrastructure should keep up with the ambition.</p>
        </div>

        <div className="steps">
          <div className="step-card">
            <span className="step-num">01</span>
            <div>
              <h3>Make the busywork disappear.</h3>
              <p>Automate the questions and updates your team answers every day so your brightest minds can focus on high-impact interactions.</p>
            </div>
          </div>

          <div className="step-card">
            <span className="step-num">02</span>
            <div>
              <h3>Keep people in the loop.</h3>
              <p>Give every teammate context so handoffs feel natural and customers feel heard, eliminating communication silos across sales and support.</p>
            </div>
          </div>

          <div className="step-card">
            <span className="step-num">03</span>
            <div>
              <h3>Turn activity into insight.</h3>
              <p>Use real-time signals to make better decisions about customers and growth with actionable conversion metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="shell cta">
        <div>
          <div className="eyebrow">The next conversation</div>
          <h2>Could be the one.</h2>
        </div>
        <div className="cta-box">
          <p>See how Wazpp can help your business communicate with more intention.</p>
          <button 
            className="button" 
            onClick={() => navigateTo('contact')}
            type="button"
          >
            Start a conversation
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </main>
  );
}
