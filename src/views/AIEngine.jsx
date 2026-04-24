import { useState, useRef, useEffect } from 'react';
import { aiResponses, aiSuggestedQueries, severityBadge } from '../data/mockData';
import { Send, Bot, User, AlertTriangle, Loader, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#cc0000]"
          style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  );
}

function RiskRow({ risk }) {
  const s = severityBadge[risk.level];
  return (
    <div
      className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a] last:border-0"
      style={{ borderLeft: `3px solid ${s.text}` }}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={11} style={{ color: s.text }} />
        <span className="text-[#ccc] text-[12px]">{risk.label}</span>
      </div>
      <span
        className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm"
        style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
      >
        {risk.level}
      </span>
    </div>
  );
}

function AIMessage({ msg }) {
  const r = msg.response;
  return (
    <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 pb-2 border-b border-[#1a1a1a]">
        <Sparkles size={13} className="text-[#cc0000]" />
        <h3 className="text-white text-[13px] font-black">{r.title}</h3>
      </div>

      {/* Summary */}
      <p className="text-[#aaa] text-[12px] leading-relaxed">{r.summary}</p>

      {/* Risks */}
      {r.risks?.length > 0 && (
        <div>
          <p className="text-[#444] text-[10px] font-black uppercase tracking-wider mb-2">Identified Risks</p>
          <div className="border border-[#1a1a1a] bg-[#111]">
            {r.risks.map((risk, i) => <RiskRow key={i} risk={risk} />)}
          </div>
        </div>
      )}

      {/* Actions */}
      {r.actions?.length > 0 && (
        <div>
          <p className="text-[#444] text-[10px] font-black uppercase tracking-wider mb-2">Suggested Action Plan</p>
          <div className="space-y-1.5">
            {r.actions.map((action, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-[#ccc]">
                <span className="w-4 h-4 rounded-sm bg-[#cc0000]/20 border border-[#cc0000]/30 flex items-center justify-center text-[#cc0000] text-[9px] font-black shrink-0">
                  {i + 1}
                </span>
                {action}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[#333] text-[10px]">{msg.timestamp} · DTMI AI Engine · Mock intelligence data</p>
    </div>
  );
}

function UserMessage({ msg }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] bg-[#cc0000]/10 border border-[#cc0000]/20 px-4 py-3">
        <p className="text-white text-[13px]">{msg.content}</p>
        <p className="text-[#444] text-[10px] mt-1">{msg.timestamp}</p>
      </div>
    </div>
  );
}

export default function AIEngine() {
  const [messages, setMessages] = useState([
    {
      id: 1, role: 'assistant',
      response: aiResponses.default,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef(null);

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
    setMessages(prev => [...prev, {
      id: Date.now() + 1, role: 'assistant',
      response: getResponse(query),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const reset = () => {
    setMessages([{
      id: 1, role: 'assistant',
      response: aiResponses.default,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#1a1a1a]">
          <h1 className="text-white text-2xl font-black uppercase tracking-wide mb-1">AI Insight Engine</h1>
          <p className="text-[#666] text-[12px]">Query DTMI AI for executive intelligence, risk analysis, and action plans</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-260px)] min-h-[500px]">

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4 lg:order-first">
            {/* Status */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#cc0000] flex items-center justify-center rounded-sm">
                  <Bot size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-[12px] font-black">DTMI AI Engine</p>
                  <p className="text-[#00c853] text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c853]" /> Online
                  </p>
                </div>
              </div>
              <p className="text-[#666] text-[11px] leading-relaxed">
                Ask about digital transformation risks, AI adoption, cloud strategy, cybersecurity posture, governance, or request executive summaries.
              </p>
            </div>

            {/* Suggested queries */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4">
              <p className="text-[#444] text-[10px] font-black uppercase tracking-wider mb-3">Suggested Queries</p>
              <div className="space-y-1">
                {aiSuggestedQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={typing}
                    className="w-full text-left flex items-start gap-2 py-1.5 text-[11px] text-[#666] hover:text-white transition-colors disabled:opacity-40"
                  >
                    <ArrowRight size={10} className="text-[#cc0000] shrink-0 mt-0.5" />
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2 border border-[#222] text-[#555] text-[11px] font-bold uppercase tracking-wide hover:text-white hover:border-[#444] transition-colors"
            >
              <RotateCcw size={11} /> New Session
            </button>
          </aside>

          {/* ── CHAT ── */}
          <div className="lg:col-span-3 flex flex-col border border-[#1a1a1a] bg-[#0d0d0d]">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1a1a1a] bg-[#111]">
              <div className="w-6 h-6 bg-[#cc0000] flex items-center justify-center rounded-sm">
                <Bot size={12} className="text-white" />
              </div>
              <div>
                <p className="text-white text-[12px] font-black">DTMI AI Insight Engine</p>
                <p className="text-[#555] text-[10px]">Executive intelligence · Real-time risk analysis</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c853]" />
                <span className="text-[#00c853] text-[10px] font-bold">Active</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.role === 'user' ? (
                    <UserMessage msg={msg} />
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#cc0000] flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                        <Bot size={11} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <AIMessage msg={msg} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#cc0000] flex items-center justify-center rounded-sm shrink-0">
                    <Bot size={11} className="text-white" />
                  </div>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a]">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1a1a1a] bg-[#111]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about digital transformation risks, AI trends, cloud strategy..."
                  disabled={typing}
                  className="flex-1 bg-[#0a0a0a] border border-[#222] text-white text-[12px] px-4 py-2.5 focus:outline-none focus:border-[#cc0000] transition-colors placeholder-[#333] disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || typing}
                  className="px-4 py-2.5 bg-[#cc0000] text-white hover:bg-[#aa0000] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {typing ? <Loader size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>
              <p className="text-[#333] text-[10px] mt-2 text-center">
                DTMI AI Engine · Mock intelligence data for prototype demonstration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
