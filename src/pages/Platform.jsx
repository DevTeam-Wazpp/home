import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Users, 
  Cpu, 
  BarChart3, 
  Workflow, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const FEATURES = [
  {
    num: '01 / Engage',
    title: 'Auto replies',
    description: 'Answer common questions instantly with helpful, on-brand conversations that never sleep.',
    icon: Bot
  },
  {
    num: '02 / Reach',
    title: 'Bulk campaigns',
    description: 'Send targeted broadcast messages at scale while keeping every campaign thoughtful and relevant.',
    icon: Send
  },
  {
    num: '03 / Collaborate',
    title: 'Multi-agent inbox',
    description: 'Give support and sales teams one shared view of every conversation, handoff, and next step.',
    icon: Users
  },
  {
    num: '04 / Connect',
    title: 'CRM + API',
    description: 'Connect the tools you already use and make WhatsApp part of the way your business operates.',
    icon: Cpu
  },
  {
    num: '05 / Understand',
    title: 'Live analytics',
    description: 'See response times, campaign performance, and customer signals as they happen.',
    icon: BarChart3
  },
  {
    num: '06 / Grow',
    title: 'Smart workflows',
    description: 'Turn repeatable moments in marketing, sales, and support into reliable automations.',
    icon: Workflow
  }
];

export default function Platform({ navigateTo }) {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const workflowExamples = [
    {
      title: 'E-commerce Order & Tracking Flow',
      steps: ['Customer places order', 'Instant WhatsApp invoice sent', 'Live courier tracking trigger', 'Auto follow-up for product review']
    },
    {
      title: 'B2B Lead Qualification & Booking',
      steps: ['Lead clicks WhatsApp ad', 'Bot asks 3 qualifying questions', 'Calendar sync sends booking link', 'Sales rep notified via Slack / CRM']
    },
    {
      title: '24/7 Tier-1 Support Deflection',
      steps: ['Inbound customer FAQ', 'Instant contextual solution sent', 'Satisfaction check-in trigger', 'Human agent escalation if unresolved']
    }
  ];

  return (
    <main>
      {/* Page Hero */}
      <section className="shell page-hero">
        <div className="eyebrow-badge">
          <span className="badge-dot" />
          <span>The Wazpp platform</span>
        </div>
        <h1>Every conversation, working harder.</h1>
        <p className="intro">
          Wazpp brings automation, teamwork, and insight into one WhatsApp-powered customer engagement platform.
        </p>
        <button 
          className="button primary" 
          onClick={() => navigateTo('contact')}
          type="button"
        >
          Build your workflow
          <ArrowRight size={15} />
        </button>
      </section>

      {/* 6 Capabilities Grid */}
      <section className="section shell" aria-labelledby="capabilities-title">
        <div className="section-head">
          <div>
            <div className="eyebrow">Enterprise Capabilities</div>
            <h2 id="capabilities-title">Tools for<br />the whole journey.</h2>
          </div>
          <p>From the first question to the follow-up sale, Wazpp helps your team respond with speed and context.</p>
        </div>

        <div className="grid three">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <article key={index} className="feature-card">
                <div className="number">
                  <span>{feat.num}</span>
                  <div className="feature-icon-bubble">
                    <Icon size={18} />
                  </div>
                </div>
                <div>
                  <h3>{feat.title}</h3>
                  <p>{feat.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Interactive Workflow Visualizer */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Workflow Blueprints</div>
            <h2>Pre-built templates that scale.</h2>
          </div>
          <p>Deploy production-ready conversational workflows tailored to your exact industry in minutes.</p>
        </div>

        <div style={{
          background: 'var(--paper-elevated)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {workflowExamples.map((wf, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveWorkflow(idx)}
                className="button"
                style={{
                  background: activeWorkflow === idx ? 'var(--ink)' : 'var(--paper)',
                  color: activeWorkflow === idx ? 'var(--white)' : 'var(--ink)',
                  borderColor: activeWorkflow === idx ? 'var(--ink)' : 'var(--line)',
                  minHeight: '42px',
                  padding: '0 18px',
                  fontSize: '0.7rem'
                }}
              >
                {wf.title}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            position: 'relative'
          }}>
            {workflowExamples[activeWorkflow].steps.map((step, sIdx) => (
              <div 
                key={sIdx}
                style={{
                  padding: '20px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontFamily: 'var(--font-eyebrow)', 
                    fontWeight: 700,
                    color: 'var(--green)' 
                  }}>
                    STEP 0{sIdx + 1}
                  </span>
                  <Zap size={14} color="var(--green)" />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made to Scale Green Band */}
      <section className="band green">
        <div className="shell split">
          <div>
            <div className="eyebrow lime">Made to scale</div>
            <h2>Start simple.<br />Go further.</h2>
          </div>
          <ul className="check-list">
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Launch your first automated conversation in minutes.</span>
            </li>
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Add teammates, channels, and integrations as you grow.</span>
            </li>
            <li>
              <span className="check-icon"><Check size={14} /></span>
              <span>Keep the human touch where it matters most.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shell cta">
        <div>
          <div className="eyebrow">Ready when you are</div>
          <h2>Chat to grow.</h2>
        </div>
        <div className="cta-box">
          <p>Bring your next customer conversation into focus with Wazpp.</p>
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
