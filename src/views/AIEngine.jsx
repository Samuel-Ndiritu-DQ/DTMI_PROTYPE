import { useState, useRef, useEffect } from 'react';
import { aiResponses, aiSuggestedQueries, severityBadge } from '../data/mockData';
import { Send, Bot, AlertTriangle, Loader, RotateCcw, ArrowRight, Sparkles, Zap } from 'lucide-react';

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: 'var(--brand-orange)',
            animation: `ai-bounce 0.9s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes ai-bounce{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  );
}

/* ── Risk row ── */
function RiskRow({ risk }) {
  const s = severityBadge[risk.level];
  const accent = { Critical: 'var(--brand-orange)', High: '#f59e0b', Medium: '#06b6d4', Low: '#10b981' };
  return (
    <div
      className="flex items-center justify-between px-3 py-2.5 border-b last:border-0"
      style={{ borderColor: 'var(--brand-border)', borderLeft: `3px solid ${accent[risk.level] || '#94a3b8'}` }}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={11} style={{ color: accent[risk.level] }} />
        <span className="text-[13px]" style={{ color: 'var(--brand-dark)' }}>{risk.label}</span>
      </div>
      <span
        className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm shrink-0"
        style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
      >
        {risk.level}
      </span>
    </div>
  );
}

/* ── AI response bubble ── */
function AIMessage({ msg }) {
  const r = msg.response;
  return (
    <div className="rounded-sm border p-5 space-y-4" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
      <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'var(--brand-border)' }}>
        <Sparkles size={14} style={{ color: 'var(--brand-orange)' }} />
        <h3 className="text-[14px] font-black" style={{ color: 'var(--brand-navy)' }}>{r.title}</h3>
      </div>
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--brand-muted)' }}>{r.summary}</p>
      {r.risks?.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-muted)' }}>
            Identified Risks
          </p>
          <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
            {r.risks.map((risk, i) => <RiskRow key={i} risk={risk} />)}
          </div>
        </div>
      )}
      {r.actions?.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--brand-muted)' }}>
            Suggested Action Plan
          </p>
          <div className="space-y-2">
            {r.actions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]" style={{ color: 'var(--brand-dark)' }}>
                <span
                  className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-[10px] font-black shrink-0 mt-0.5"
                  style={{ background: 'var(--brand-orange)' }}
                >
                  {i + 1}
                </span>
                {action}
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-[10px] pt-2 border-t" style={{ color: '#c0c8d8', borderColor: 'var(--brand-border)' }}>
        {msg.timestamp} · DTMI AI Engine · Mock intelligence data
      </p>
    </div>
  );
}

/* ── User message bubble ── */
function UserMessage({ msg }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[78%] rounded-sm px-4 py-3 border"
        style={{ background: '#eef2ff', borderColor: '#c7d2fe' }}
      >
        <p className="text-[13px] font-medium" style={{ color: 'var(--brand-navy)' }}>{msg.content}</p>
        <p className="text-[10px] mt-1" style={{ color: '#94a3b8' }}>{msg.timestamp}</p>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function AIEngine() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      response: aiResponses.default,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const getResponse = (q) => {
    const lq = q.toLowerCase();
    if (lq.includes('ai') || lq.includes('artificial') || lq.includes('machine')) return aiResponses.ai;
    if (lq.includes('cloud') || lq.includes('migration') || lq.includes('saas'))   return aiResponses.cloud;
    if (lq.includes('cyber') || lq.includes('security') || lq.includes('threat'))  return aiResponses.cyber;
    if (lq.includes('govern') || lq.includes('regulat') || lq.includes('compli'))  return aiResponses.governance;
    return aiResponses.default;
  };

  const handleSend = async (queryText) => {
    const query = (queryText || input).trim();
    if (!query || typing) return;
    const ts = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: query, timestamp: ts }]);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));
    setTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        role: 'assistant',
        response: getResponse(query),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const reset = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      response: aiResponses.default,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
  };

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* ── Page header ── */}
        <div className="mb-6 pb-4 border-b" style={{ borderColor: 'var(--brand-border)' }}>
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'var(--brand-orange)' }}
            >
              <Zap size={17} className="text-white" fill="white" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>
                DTMI Intelligence
              </p>
              <h1 className="text-2xl font-black leading-tight" style={{ color: 'var(--brand-navy)' }}>
                AI Insight Engine
              </h1>
              <p className="text-[13px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>
                Query DTMI AI for executive intelligence, risk analysis, and strategic action plans
              </p>
            </div>
          </div>
        </div>

        {/* ── Main layout: sidebar left, chat right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

            {/* Engine status */}
            <div
              className="rounded-sm border p-4"
              style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: 'var(--brand-orange)' }}
                >
                  <Bot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-black leading-none">DTMI AI Engine</p>
                  <p className="text-[11px] flex items-center gap-1.5 mt-0.5" style={{ color: '#10b981' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
                    Online · Ready
                  </p>
                </div>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: '#94a3b8' }}>
                Ask about digital transformation risks, AI adoption, cloud strategy, cybersecurity posture, or governance compliance.
              </p>
            </div>

            {/* Suggested queries */}
            <div
              className="rounded-sm border p-4"
              style={{ background: 'white', borderColor: 'var(--brand-border)' }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>
                Suggested Queries
              </p>
              <div className="space-y-0.5">
                {aiSuggestedQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={typing}
                    className="w-full text-left flex items-start gap-2 px-2 py-2 rounded-sm transition-colors disabled:opacity-40 hover:bg-[var(--brand-light)]"
                    style={{ color: 'var(--brand-muted)' }}
                  >
                    <ArrowRight size={11} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-orange)' }} />
                    <span className="text-[12px] leading-snug">{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* New session */}
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border text-[12px] font-bold uppercase tracking-wide transition-all hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
              style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}
            >
              <RotateCcw size={12} />
              New Session
            </button>
          </aside>

          {/* ── Chat panel ── */}
          <div
            className="lg:col-span-3 flex flex-col rounded-sm border order-1 lg:order-2"
            style={{
              background: 'white',
              borderColor: 'var(--brand-border)',
              minHeight: '560px',
              height: 'clamp(560px, calc(100vh - 280px), 820px)',
            }}
          >
            {/* Chat header bar */}
            <div
              className="flex items-center gap-3 px-5 py-3.5 border-b shrink-0 rounded-t-sm"
              style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
                style={{ background: 'var(--brand-orange)' }}
              >
                <Bot size={13} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[13px] font-black leading-none">DTMI AI Insight Engine</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>
                  Executive intelligence · Real-time risk analysis
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-bold" style={{ color: '#10b981' }}>Active</span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-5"
              style={{ background: 'var(--brand-light)' }}
            >
              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.role === 'user' ? (
                    <UserMessage msg={msg} />
                  ) : (
                    <div className="flex gap-3">
                      <div
                        className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'var(--brand-orange)' }}
                      >
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <AIMessage msg={msg} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-3">
                  <div
                    className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: 'var(--brand-orange)' }}
                  >
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="rounded-sm border" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-5 py-4 border-t shrink-0"
              style={{ background: 'white', borderColor: 'var(--brand-border)' }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about digital transformation risks, AI trends, cloud strategy..."
                  disabled={typing}
                  className="flex-1 text-[13px] px-4 py-2.5 rounded-sm focus:outline-none transition-colors disabled:opacity-50"
                  style={{
                    background: 'var(--brand-light)',
                    border: '1px solid var(--brand-border)',
                    color: 'var(--brand-dark)',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--brand-orange)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--brand-border)')}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || typing}
                  className="px-4 py-2.5 rounded-sm text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                  style={{ background: 'var(--brand-orange)', minWidth: '48px' }}
                >
                  {typing ? <Loader size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>
              <p className="text-[11px] mt-2 text-center" style={{ color: '#c0c8d8' }}>
                DTMI AI Engine · Mock intelligence data for prototype demonstration
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
