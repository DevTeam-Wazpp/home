import React, { useState, useEffect } from 'react';
import { Check, Zap, Sparkles, ArrowRight, Shield, HelpCircle, MessageSquare, RefreshCw } from 'lucide-react';

// Fallback plans if API is loading or network is temporarily unavailable
const FALLBACK_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Essential WhatsApp automation tools for small businesses and growing teams.',
    limits: {
      contacts: 1000,
      campaigns: 10,
      bot_flows: 3,
      bot_replies: 1000,
      custom_fields: 15,
      team_members: 2
    },
    ai_bot_enabled: false,
    api_access_enabled: false,
    pricing: [
      { id: 'monthly', name: 'Monthly', interval: 'month', interval_count: 1, amount: 999, enabled: true },
      { id: 'quarterly', name: 'Quarterly', interval: 'month', interval_count: 3, amount: 2699, enabled: true },
      { id: 'yearly', name: 'Yearly', interval: 'year', interval_count: 1, amount: 9599, enabled: true }
    ],
    features: [
      '1,000 Verified Contacts',
      '2 Shared Team Inbox Members',
      '3 WhatsApp Bot Flows',
      '1,000 Automated Bot Replies',
      'Broadcast Campaigns with Analytics',
      'Live Chat & Standard Support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Advanced automations, CRM integrations, and higher limits for scaling businesses.',
    limits: {
      contacts: 10000,
      campaigns: 50,
      bot_flows: 15,
      bot_replies: 10000,
      custom_fields: 50,
      team_members: 5
    },
    ai_bot_enabled: true,
    api_access_enabled: true,
    pricing: [
      { id: 'monthly', name: 'Monthly', interval: 'month', interval_count: 1, amount: 2499, enabled: true },
      { id: 'quarterly', name: 'Quarterly', interval: 'month', interval_count: 3, amount: 6749, enabled: true },
      { id: 'yearly', name: 'Yearly', interval: 'year', interval_count: 1, amount: 23999, enabled: true }
    ],
    features: [
      '10,000 Verified Contacts',
      '5 Shared Team Inbox Members',
      '15 Visual Flow Builder Workflows',
      '10,000 Automated Bot Replies',
      'AI Voice & Intelligent Agent Bot',
      'REST API & Webhooks Access',
      'Facebook Lead Ads & Google Sheets Sync',
      'Priority Support & Onboarding'
    ],
    is_popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Unlimited power, dedicated infrastructure, and bespoke automation solutions.',
    limits: {
      contacts: -1,
      campaigns: -1,
      bot_flows: -1,
      bot_replies: -1,
      custom_fields: -1,
      team_members: -1
    },
    ai_bot_enabled: true,
    api_access_enabled: true,
    pricing: [
      { id: 'monthly', name: 'Monthly', interval: 'month', interval_count: 1, amount: 5999, enabled: true },
      { id: 'quarterly', name: 'Quarterly', interval: 'month', interval_count: 3, amount: 16199, enabled: true },
      { id: 'yearly', name: 'Yearly', interval: 'year', interval_count: 1, amount: 57599, enabled: true }
    ],
    features: [
      'Unlimited Contacts & Lists',
      'Unlimited Team Members',
      'Unlimited Flow Builder Workflows',
      'Unlimited Bot Automation Replies',
      'Advanced Multi-Agent Routing',
      'High-Speed Dedicated Throughput',
      'Custom Webhook & CRM Architecture',
      'Dedicated Account Manager'
    ]
  }
];

export default function Pricing({ navigateTo }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState('monthly');
  const [availableCycles, setAvailableCycles] = useState(['monthly', 'yearly']);
  const [apiOnline, setApiOnline] = useState(false);

  // Fetch live plans from Wazpp backend API
  useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      setLoading(true);
      const apiEndpoints = [
        // 1. Configured Vite API URL
        import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/public/plans` : null,
        // 2. Production Wazpp API
        'https://app.wazpp.com/api/public/plans',
        // 3. Alternate production subdomain
        'https://server.wazpp.com/api/public/plans',
        // 4. Local dev server fallback
        'http://localhost:5000/api/public/plans'
      ].filter(Boolean);

      let fetchedData = null;

      for (const endpoint of apiEndpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const res = await fetch(endpoint, {
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.plans) && data.plans.length > 0) {
              fetchedData = data.plans;
              break;
            }
          }
        } catch (_) {
          // Try next endpoint
        }
      }

      if (!isMounted) return;

      if (fetchedData && fetchedData.length > 0) {
        setPlans(fetchedData);
        setApiOnline(true);

        // Collect all pricing cycle IDs available across active plans
        const cyclesSet = new Set();
        fetchedData.forEach(p => {
          if (Array.isArray(p.pricing)) {
            p.pricing.forEach(pr => {
              if (pr.enabled !== false && pr.id) cyclesSet.add(pr.id);
            });
          }
        });

        const cycles = Array.from(cyclesSet);
        if (cycles.length > 0) {
          // Preferred order: monthly, quarterly, half_yearly, yearly
          const order = ['monthly', 'quarterly', 'half_yearly', 'yearly'];
          cycles.sort((a, b) => {
            const ia = order.indexOf(a);
            const ib = order.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            return (ia !== -1) ? -1 : (ib !== -1) ? 1 : 0;
          });
          setAvailableCycles(cycles);
          if (!cycles.includes(selectedCycle)) {
            setSelectedCycle(cycles[0]);
          }
        }
      } else {
        // Fallback gracefully so page is always functional and beautiful
        setPlans(FALLBACK_PLANS);
        setApiOnline(false);
      }

      setLoading(false);
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const getPriceForPlan = (plan, cycleId) => {
    if (!plan || !Array.isArray(plan.pricing) || plan.pricing.length === 0) {
      return null;
    }
    const match = plan.pricing.find(p => p.id === cycleId && p.enabled !== false);
    return match || plan.pricing[0];
  };

  const formatCycleLabel = (cycleId) => {
    switch (cycleId) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'half_yearly': return 'Half-Yearly';
      case 'yearly': return 'Yearly';
      default: return cycleId.charAt(0).toUpperCase() + cycleId.slice(1);
    }
  };

  const formatLimit = (value, unit) => {
    if (value === -1 || value === '-1' || value === undefined) return `Unlimited ${unit}`;
    return `${Number(value).toLocaleString()} ${unit}`;
  };

  const handleChoosePlan = (plan) => {
    if (navigateTo) {
      // Direct navigation to contact with context
      window.sessionStorage?.setItem('wazpp_selected_plan', plan.name);
      navigateTo('contact');
    } else {
      window.location.href = `https://app.wazpp.com/#/contact?plan=${encodeURIComponent(plan.name)}`;
    }
  };

  return (
    <main>
      {/* Hero Section - Matching Home Design */}
      <section className="shell hero" aria-labelledby="pricing-hero-title">
        <div>
          <div className="eyebrow-badge">
            <span className="badge-dot" />
            <span>Transparent Pricing &amp; Plans</span>
            {apiOnline && (
              <span style={{ fontSize: '0.68rem', opacity: 0.9, marginLeft: 4, color: 'var(--green)' }}>
                • Live Synced
              </span>
            )}
          </div>

          <h1 id="pricing-hero-title">
            Plans @Waz<span className="hero-title-accent">p</span>p to grow.
          </h1>

          <p className="intro">
            Simple, honest pricing to scale your business with WhatsApp automation. No hidden setup fees. Multi-agent shared inbox, visual flow builder, and intelligent bots included.
          </p>

          <div className="actions">
            <button 
              className="button primary" 
              onClick={() => {
                const el = document.getElementById('plans-grid-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
            >
              Choose your plan
              <ArrowRight size={15} />
            </button>
            <button 
              className="button secondary" 
              onClick={() => navigateTo('contact')}
              type="button"
            >
              Talk to sales
            </button>
          </div>
        </div>

        <div className="orbital" aria-label="Wazpp pricing and plans">
          <div className="orbital-ring one" />
          <div className="orbital-ring two" />
          <span className="spark one" />
          <span className="spark two" />
          
          <div className="core">
            <div>
              <div className="hero-logo-mark">
                <img src="/web-logo.png" alt="Wazpp" />
              </div>
              <small>Plans that grow with you</small>
            </div>
          </div>

          <div className="floating-pill">
            <span className="pulse-dot-online" />
            <span>{apiOnline ? 'Live Engine Synced' : 'Official WhatsApp API'}</span>
          </div>
        </div>
      </section>

      {/* Pricing Header & Cycle Selector */}
      <section className="section shell" id="plans-grid-section" style={{ paddingTop: 0 }}>
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div>
            <div className="eyebrow">Flexible Inclusions</div>
            <h2>Pick the plan that fits your growth.</h2>
          </div>
          <p>
            Upgrade or switch cycles at any time. All plans connect directly to Meta WhatsApp Cloud API with zero markup.
          </p>
        </div>

        {/* Billing Cycle Selector */}
        {availableCycles.length > 1 && (
          <div className="pricing-toggle-wrap">
            <div className="pricing-toggle-pill">
              {availableCycles.map(cycle => (
                <button
                  key={cycle}
                  type="button"
                  className={`pricing-toggle-btn ${selectedCycle === cycle ? 'active' : ''}`}
                  onClick={() => setSelectedCycle(cycle)}
                >
                  {formatCycleLabel(cycle)}
                  {cycle === 'yearly' && (
                    <span className="pricing-save-badge">Save ~20%</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            <div className="loading-spinner" />
            <p style={{ marginTop: 16 }}>Loading latest plan details...</p>
          </div>
        )}

        {!loading && (
          <div className="pricing-grid">
            {plans.map((plan, idx) => {
              const priceInfo = getPriceForPlan(plan, selectedCycle);
              const isPopular = plan.is_popular || idx === 1 || plan.name.toLowerCase().includes('growth');

              return (
                <div
                  key={plan.id || idx}
                  className={`pricing-card ${isPopular ? 'popular' : ''}`}
                >
                  {isPopular && (
                    <div className="popular-badge">
                      <Sparkles size={12} />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="pricing-card-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-desc">
                      {plan.description || 'Complete WhatsApp automation suite tailored for modern business communication.'}
                    </p>
                  </div>

                  <div className="pricing-price-wrap">
                    {priceInfo ? (
                      <div className="price-display">
                        <span className="price-currency">₹</span>
                        <span className="price-amount">
                          {Number(priceInfo.amount).toLocaleString()}
                        </span>
                        <span className="price-interval">
                          /{priceInfo.interval === 'year' ? 'year' : priceInfo.interval === 'month' ? 'month' : priceInfo.interval}
                        </span>
                      </div>
                    ) : (
                      <div className="price-display">
                        <span className="price-amount" style={{ fontSize: '2rem' }}>Custom</span>
                      </div>
                    )}
                    <div className="price-subtext">
                      Billed {formatCycleLabel(selectedCycle).toLowerCase()} • WhatsApp Cloud API
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`button ${isPopular ? 'primary' : 'secondary'} plan-cta-btn`}
                    onClick={() => handleChoosePlan(plan)}
                  >
                    <span>Get started with {plan.name}</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="plan-divider" />

                  {/* Limits and Included Features */}
                  <div className="plan-features-list">
                    <div className="features-label">Platform Limits &amp; Inclusions:</div>

                    {/* Standardized Core Limits */}
                    {plan.limits && (
                      <>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span><strong>{formatLimit(plan.limits.contacts, 'Contacts')}</strong></span>
                        </div>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span><strong>{formatLimit(plan.limits.team_members, 'Team Members')}</strong></span>
                        </div>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span><strong>{formatLimit(plan.limits.campaigns, 'Broadcast Campaigns')}</strong></span>
                        </div>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span><strong>{formatLimit(plan.limits.bot_flows, 'Interactive Bot Flows')}</strong></span>
                        </div>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span>{formatLimit(plan.limits.bot_replies, 'Automated Bot Replies')}</span>
                        </div>
                        <div className="feature-item">
                          <span className="check-bullet"><Check size={14} /></span>
                          <span>{formatLimit(plan.limits.custom_fields, 'Custom Contact Fields')}</span>
                        </div>
                      </>
                    )}

                    {/* Additional Capabilities */}
                    {plan.ai_bot_enabled && (
                      <div className="feature-item highlight">
                        <span className="check-bullet"><Zap size={14} /></span>
                        <span><strong>AI Voice &amp; Knowledge Agent Included</strong></span>
                      </div>
                    )}

                    {plan.api_access_enabled && (
                      <div className="feature-item highlight">
                        <span className="check-bullet"><Zap size={14} /></span>
                        <span><strong>Full Developer REST API &amp; Webhooks</strong></span>
                      </div>
                    )}

                    {/* Custom Plan Features from DB if present */}
                    {Array.isArray(plan.features) && plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="feature-item">
                        <span className="check-bullet"><Check size={14} /></span>
                        <span>{feat}</span>
                      </div>
                    ))}

                    <div className="feature-item">
                      <span className="check-bullet"><Check size={14} /></span>
                      <span>Shared Team Inbox &amp; Agent Live Chat</span>
                    </div>

                    <div className="feature-item">
                      <span className="check-bullet"><Check size={14} /></span>
                      <span>Real-time Campaign Analytics</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Enterprise Custom Banner */}
      <section className="section shell" style={{ paddingTop: 30 }}>
        <div className="enterprise-banner">
          <div>
            <div className="eyebrow lime">Enterprise &amp; High Volume</div>
            <h2 style={{ color: 'var(--white)', margin: '8px 0 14px' }}>
              Have custom requirements or over 100,000+ contacts?
            </h2>
            <p style={{ color: 'var(--muted-light)', maxWidth: '580px', margin: 0 }}>
              We build custom dedicated instances, high-throughput WhatsApp Cloud API channels, custom CRM bi-directional syncing, and tailored SLA support.
            </p>
          </div>
          <button
            type="button"
            className="button primary"
            onClick={() => navigateTo('contact')}
          >
            Contact our Solutions Team
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section shell" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">Clear Answers</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <p>
            Everything you need to know about billing, Meta WhatsApp Cloud API conversations, and onboarding.
          </p>
        </div>

        <div className="grid two" style={{ gap: 24 }}>
          <div className="faq-box">
            <h4>Can I switch or upgrade plans at any time?</h4>
            <p>
              Yes. You can upgrade, downgrade, or update your subscription cycles whenever your business needs change directly from your Wazpp workspace.
            </p>
          </div>

          <div className="faq-box">
            <h4>How does WhatsApp conversation billing work?</h4>
            <p>
              Wazpp connects to official Meta WhatsApp Cloud API. Conversation costs (service, authentication, utility, or marketing) are billed directly via your Meta Business Manager with zero markup.
            </p>
          </div>

          <div className="faq-box">
            <h4>Can I keep my existing WhatsApp phone number?</h4>
            <p>
              Yes. Any standard mobile, landline, or virtual number can be registered on Meta WhatsApp Cloud API. We guide you step-by-step through verification.
            </p>
          </div>

          <div className="faq-box">
            <h4>Is technical setup or coding required?</h4>
            <p>
              No coding is required. Our drag-and-drop Visual Flow Builder, multi-agent inbox, and automated broadcast campaigns are completely no-code and ready out of the box.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
