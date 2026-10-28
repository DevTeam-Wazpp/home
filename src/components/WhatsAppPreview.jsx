import React, { useState } from 'react';
import { CheckCheck, Send, Bot, Users, Zap } from 'lucide-react';

const DEMOS = {
  support: {
    title: 'Customer Support Flow',
    messages: [
      { sender: 'user', text: 'Hi! Do you have international shipping available for the Pro plan?', time: '10:42 AM' },
      { 
        sender: 'bot', 
        badge: 'Automated Instant Reply',
        text: 'Hello! 👋 Yes, Wazpp ships globally with local server compliance in 30+ regions. Would you like a 14-day test access link?', 
        time: '10:42 AM' 
      },
      { sender: 'user', text: 'Yes please, send the signup link!', time: '10:43 AM' },
      { 
        sender: 'bot', 
        badge: 'Smart Workflow',
        text: 'Awesome! Your VIP activation link: https://wazpp.com/start-now 🚀 Our support agent Sarah is also on standby.', 
        time: '10:43 AM' 
      }
    ]
  },
  campaign: {
    title: 'Automated Broadcast Campaign',
    messages: [
      { 
        sender: 'bot', 
        badge: 'Targeted Campaign',
        text: '🔥 Flash Growth Week: Unlock 3x higher WhatsApp open rates with Wazpp Multi-Inbox. Reply "GROW" for 20% launch credit.', 
        time: '02:15 PM' 
      },
      { sender: 'user', text: 'GROW', time: '02:16 PM' },
      { 
        sender: 'bot', 
        badge: 'Instant CRM Sync',
        text: 'Confirmed! 20% discount code WAZPP20 attached to your account. Account manager assigned.', 
        time: '02:16 PM' 
      }
    ]
  },
  handover: {
    title: 'Multi-Agent Human Handover',
    messages: [
      { sender: 'user', text: 'We have an enterprise question regarding custom CRM webhook security.', time: '11:10 AM' },
      { 
        sender: 'bot', 
        badge: 'Bot Triage',
        text: 'Routing you directly to an Enterprise Solution Architect...', 
        time: '11:10 AM' 
      },
      { 
        sender: 'bot', 
        badge: 'Live Agent: Alex (Solutions)',
        text: 'Hi there! Alex here from Engineering. Our webhooks support HMAC SHA-256 signatures and mutual TLS. How can I assist?', 
        time: '11:11 AM' 
      }
    ]
  }
};

export default function WhatsAppPreview() {
  const [activeTab, setActiveTab] = useState('support');
  const currentDemo = DEMOS[activeTab];

  return (
    <div className="preview-container" aria-label="Wazpp WhatsApp Interactive Demo">
      <div className="preview-header">
        <div className="preview-profile">
          <div className="preview-avatar">W</div>
          <div>
            <div className="preview-title">Wazpp Business Hub</div>
            <div className="preview-status">
              <span className="pulse-dot-online" />
              Verified WhatsApp Business API
            </div>
          </div>
        </div>
      </div>

      <div className="preview-tabs">
        <button 
          className={`preview-tab-btn ${activeTab === 'support' ? 'active' : ''}`}
          onClick={() => setActiveTab('support')}
          type="button"
        >
          <Bot size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          Smart Auto-Reply
        </button>
        <button 
          className={`preview-tab-btn ${activeTab === 'campaign' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaign')}
          type="button"
        >
          <Zap size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          Broadcast Campaign
        </button>
        <button 
          className={`preview-tab-btn ${activeTab === 'handover' ? 'active' : ''}`}
          onClick={() => setActiveTab('handover')}
          type="button"
        >
          <Users size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
          Multi-Agent Handover
        </button>
      </div>

      <div className="preview-body">
        {currentDemo.messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-bubble ${msg.sender === 'user' ? 'inbound' : 'outbound'}`}
          >
            {msg.badge && (
              <div className="chat-badge">{msg.badge}</div>
            )}
            <div>{msg.text}</div>
            <div className="chat-meta">
              <span>{msg.time}</span>
              {msg.sender === 'bot' && <CheckCheck size={14} color="#53bdeb" />}
            </div>
          </div>
        ))}
      </div>

      <div className="preview-input-bar">
        <span style={{ fontSize: '0.8rem', color: '#8696a0' }}>Automated via Wazpp Engine (Sub-50ms latency)</span>
      </div>
    </div>
  );
}
