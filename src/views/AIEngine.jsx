import { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Sparkles, Plus, Search, MessageSquare, Menu, User, X, ChevronRight, Shield, Cloud, Brain, Globe } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const SUGGESTED_PROMPTS = [
  { icon: Brain, label: 'AI adoption trends in 2026', query: 'What are the top AI adoption trends in 2026?' },
  { icon: Shield, label: 'Cybersecurity threat landscape', query: 'What is the current cybersecurity threat landscape?' },
  { icon: Cloud, label: 'Cloud cost optimization', query: 'What are the best cloud cost optimization strategies?' },
  { icon: Globe, label: 'EU AI Act compliance', query: 'What do I need for EU AI Act compliance?' },
];

const aiResponses = {
  default: {
    title: 'DTMI Executive Intelligence Overview',
    summary: 'Welcome to the DTMI AI Insight Engine. Ask me about digital transformation risks, AI adoption trends, cloud strategy, cybersecurity posture, or governance compliance.',
    risks: [],
    actions: [],
  },
  ai: {
    title: 'AI Adoption Intelligence - Q2 2026',
    summary: 'AI adoption reached 61% in Q1 2026 - the highest level ever recorded. Generative AI is now integrated in 78% of Fortune 500 workflows. Organizations with AI governance frameworks report 3.2x better outcomes.',
    risks: [
      { label: 'AI governance gaps in 42% of enterprises', level: 'High' },
      { label: 'Model hallucination in critical decision workflows', level: 'Medium' },
    ],
    actions: [
      'Establish an AI governance committee with C-suite representation',
      'Audit existing AI deployments for compliance with EU AI Act',
    ],
  },
  cloud: {
    title: 'Cloud Strategy Intelligence - Q2 2026',
    summary: 'Multi-cloud adoption stands at 67% among enterprises. Organizations using multi-cloud report 18% cost reduction but 22% complexity overhead.',
    risks: [
      { label: 'Cloud cost overruns in 58% of migrations', level: 'High' },
      { label: 'Security misconfiguration in cloud environments', level: 'Critical' },
    ],
    actions: [
      'Conduct a cloud cost optimization audit across all workloads',
      'Implement a FinOps practice to govern cloud spend',
    ],
  },
  cyber: {
    title: 'Cybersecurity Posture Intelligence - Q2 2026',
    summary: 'Zero-trust adoption reached 74% among large enterprises. Ransomware attacks increased 34% YoY.',
    risks: [
      { label: 'Ransomware targeting OT/ICS environments', level: 'Critical' },
      { label: 'Supply chain compromise via third-party vendors', level: 'High' },
    ],
    actions: [
      'Accelerate zero-trust identity infrastructure deployment',
      'Conduct a third-party vendor security assessment',
    ],
  },
  governance: {
    title: 'Digital Governance & Compliance Intelligence - Q2 2026',
    summary: 'EU AI Act compliance deadline is Q3 2026. Only 31% of organizations are fully prepared.',
    risks: [
      { label: 'EU AI Act non-compliance exposure', level: 'Critical' },
      { label: 'Data sovereignty gaps across jurisdictions', level: 'High' },
    ],
    actions: [
      'Complete an EU AI Act readiness assessment immediately',
      'Establish a digital governance board with clear accountability',
    ],
  },
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400"
          style={{ animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}`}</style>
    </div>
  );
}

const riskColors = {
  Critical: { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626' },
  High:     { bg: '#fef3c7', text: '#d97706', dot: '#f59e0b' },
  Medium:   { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
};

function AIMessage({ msg }) {
  const r = msg.response;
  return (
    <div className="space-y-4">
      {r.title && (
        <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>
          {r.title}
        </p>
      )}
      <p className="text-[14px] leading-relaxed" style={{ color: '#1f2937' }}>{r.summary}</p>

      {r.risks?.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Risk Signals</p>
          {r.risks.map((risk, i) => {
            const c = riskColors[risk.level] || riskColors.Medium;
            return (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                <AlertTriangle size={13} className="shrink-0" style={{ color: '#f59e0b' }} />
                <span className="flex-1 text-[13px]" style={{ color: '#92400e' }}>{risk.label}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: c.bg, color: c.text }}>
                  {risk.level}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {r.actions?.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Recommended Actions</p>
          {r.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <ChevronRight size={13} className="shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
              <span className="text-[13px]" style={{ color: '#166534' }}>{action}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AIEngine({ activeSection, setActiveSection, onAdmin, onSignIn }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1, title: 'AI adoption trends in 2026', timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'What are the top AI adoption trends in 2026?' },
        { id: 2, role: 'assistant', response: aiResponses.ai },
      ],
    },
    {
      id: 2, title: 'Zero-trust security implementation', timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'How do I implement zero-trust security?' },
        { id: 2, role: 'assistant', response: aiResponses.cyber },
      ],
    },
    {
      id: 3, title: 'Cloud cost optimization strategies', timestamp: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'What are the best cloud cost optimization strategies?' },
        { id: 2, role: 'assistant', response: aiResponses.cloud },
      ],
    },
    {
      id: 4, title: 'Digital transformation roadmap', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'Help me create a digital transformation roadmap' },
        { id: 2, role: 'assistant', response: aiResponses.default },
      ],
    },
    {
      id: 5, title: 'EU AI Act compliance checklist', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'What do I need for EU AI Act compliance?' },
        { id: 2, role: 'assistant', response: aiResponses.governance },
      ],
    },
    {
      id: 6, title: 'DCO framework implementation', timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'Explain the DCO framework implementation' },
        { id: 2, role: 'assistant', response: aiResponses.default },
      ],
    },
    {
      id: 7, title: 'Cybersecurity threat landscape', timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
      messages: [
        { id: 1, role: 'user', content: 'What is the current cybersecurity threat landscape?' },
        { id: 2, role: 'assistant', response: aiResponses.cyber },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const getResponse = (q) => {
    const lq = q.toLowerCase();
    if (lq.includes('ai') || lq.includes('artificial') || lq.includes('machine learning')) return aiResponses.ai;
    if (lq.includes('cloud') || lq.includes('migration') || lq.includes('cost')) return aiResponses.cloud;
    if (lq.includes('cyber') || lq.includes('security') || lq.includes('ransomware') || lq.includes('zero-trust')) return aiResponses.cyber;
    if (lq.includes('govern') || lq.includes('regulat') || lq.includes('compliance') || lq.includes('eu ai')) return aiResponses.governance;
    return aiResponses.default;
  };

  const handleSend = async (queryText) => {
    const query = (queryText || input).trim();
    if (!query || typing) return;
    const newMessages = [...messages, { id: Date.now(), role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setTyping(true);
    if (isMobile) setSidebarOpen(false);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 700));
    setTyping(false);
    const updated = [...newMessages, { id: Date.now() + 1, role: 'assistant', response: getResponse(query) }];
    setMessages(updated);
    const title = query.length > 40 ? query.slice(0, 40) + '…' : query;
    if (currentChatId) {
      setChatHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, messages: updated, title, timestamp: new Date().toISOString() } : c));
    } else {
      const newChat = { id: Date.now(), title, messages: updated, timestamp: new Date().toISOString() };
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    if (isMobile) setSidebarOpen(false);
  };

  const reset = () => {
    setMessages([]);
    setInput('');
    setCurrentChatId(null);
    if (isMobile) setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const filteredHistory = chatHistory.filter(c =>
    !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showWelcome = messages.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar
        activeSection={activeSection || 'AI Engine'}
        setActiveSection={setActiveSection || (() => {})}
        onAdmin={onAdmin || (() => {})}
        onSignIn={onSignIn || (() => {})}
      />

      {/* Chat workspace - fills remaining space, height capped so it scrolls internally */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', overflow: 'hidden', position: 'relative', background: '#f3f4f6', minHeight: 0 }} className="ai-workspace">

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          style={{
            width: 260,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#111827',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            ...(isMobile ? {
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100dvh',
              zIndex: 50,
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.25s ease',
            } : {
              position: 'relative',
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-260px)',
              marginLeft: sidebarOpen ? 0 : -260,
              transition: 'transform 0.25s ease, margin-left 0.25s ease',
              alignSelf: 'stretch',
              height: 'auto',
            }),
          }}
        >
          {/* Sidebar header */}
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1 }}>DTMI AI</p>
                  <p style={{ fontSize: 10, color: '#6b7280', lineHeight: 1, marginTop: 2 }}>Intelligence Engine</p>
                </div>
              </div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={reset}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Plus size={14} /> New conversation
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                style={{ width: '100%', paddingLeft: 30, paddingRight: 10, paddingTop: 7, paddingBottom: 7, borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#d1d5db', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Chat list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
            <p style={{ padding: '8px 8px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4b5563' }}>Recent</p>
            {filteredHistory.map(chat => (
              <button
                key={chat.id}
                onClick={() => loadChat(chat)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 10px', borderRadius: 7, marginBottom: 1,
                  background: currentChatId === chat.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none', color: currentChatId === chat.id ? 'white' : '#9ca3af',
                  fontSize: 12, textAlign: 'left', cursor: 'pointer',
                  fontWeight: currentChatId === chat.id ? 600 : 400,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (currentChatId !== chat.id) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (currentChatId !== chat.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <MessageSquare size={12} style={{ flexShrink: 0, opacity: 0.7 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.title}</span>
              </button>
            ))}
          </div>

        </aside>

        {/* ── Main chat panel ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

          {/* Chat top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'white', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ padding: 7, borderRadius: 8, background: '#f3f4f6', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                aria-label="Toggle sidebar"
              >
                <Menu size={16} />
              </button>
              <div>
                <h1 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>DTMI AI Assistant</h1>
                <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Executive Intelligence Engine · Powered by DTMI</p>
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={14} color="white" />
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#f9fafb' }}>
            {showWelcome ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 20px', textAlign: 'center' }}>
                {/* Hero */}
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-orange), #ff6b35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 24px rgba(232,80,10,0.3)' }}>
                  <Sparkles size={26} color="white" />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 8 }}>DTMI AI Assistant</h2>
                <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 420, lineHeight: 1.7, marginBottom: 32 }}>
                  Your executive intelligence partner for digital transformation. Ask about AI adoption, cloud strategy, cybersecurity, or governance compliance.
                </p>

                {/* Suggested prompts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, width: '100%', maxWidth: 560 }}>
                  {SUGGESTED_PROMPTS.map(({ icon: Icon, label, query }) => (
                    <button
                      key={label}
                      onClick={() => handleSend(query)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'white', border: '1px solid #e5e7eb', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-orange)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,80,10,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                    >
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} style={{ color: 'var(--brand-orange)' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#374151', lineHeight: 1.3 }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: 780, margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                    {/* Avatar */}
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      {msg.role === 'user' ? (
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={13} color="white" />
                        </div>
                      ) : (
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sparkles size={13} color="white" />
                        </div>
                      )}
                    </div>
                    {/* Bubble */}
                    <div style={{
                      maxWidth: 'min(75%, 560px)',
                      padding: '12px 16px',
                      borderRadius: 16,
                      ...(msg.role === 'user' ? {
                        background: '#111827',
                        color: 'white',
                        borderBottomRightRadius: 4,
                        fontSize: 14,
                        lineHeight: 1.6,
                      } : {
                        background: 'white',
                        color: '#111827',
                        border: '1px solid #e5e7eb',
                        borderBottomLeftRadius: 4,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      })
                    }}>
                      {msg.role === 'user' ? msg.content : <AIMessage msg={msg} />}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <Sparkles size={13} color="white" />
                    </div>
                    <div style={{ padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: 4, background: 'white', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input bar */}
          <div style={{ flexShrink: 0, background: 'white', borderTop: '2px solid #e5e7eb', padding: '16px 20px' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', gap: 10, background: '#111827', border: '2px solid #1f2937', borderRadius: 14, padding: '10px 12px', transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                onFocus={() => {}}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                  }}
                  onFocus={e => { e.currentTarget.closest('div').style.borderColor = 'var(--brand-orange)'; e.currentTarget.closest('div').style.boxShadow = '0 4px 20px rgba(232,80,10,0.2)'; }}
                  onBlur={e => { e.currentTarget.closest('div').style.borderColor = '#1f2937'; e.currentTarget.closest('div').style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; }}
                  placeholder="Ask DTMI AI about digital transformation, AI strategy, cybersecurity..."
                  disabled={typing}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: 'white', resize: 'none', lineHeight: 1.6, maxHeight: 120, overflowY: 'auto', opacity: typing ? 0.5 : 1, fontFamily: 'inherit', caretColor: '#111827' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || typing}
                  style={{
                    width: 36, height: 36, borderRadius: 10, border: 'none', flexShrink: 0,
                    cursor: input.trim() && !typing ? 'pointer' : 'default',
                    background: input.trim() && !typing ? 'var(--brand-orange)' : '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s, transform 0.1s',
                  }}
                  onMouseEnter={e => { if (input.trim() && !typing) { e.currentTarget.style.background = 'var(--brand-orange2)'; e.currentTarget.style.transform = 'scale(1.05)'; } }}
                  onMouseLeave={e => { if (input.trim() && !typing) { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.transform = 'scale(1)'; } }}
                >
                  <Send size={15} color="white" />
                </button>
              </div>
              <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 8 }}>
                DTMI AI may produce inaccurate information. Always verify critical decisions with your team.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
