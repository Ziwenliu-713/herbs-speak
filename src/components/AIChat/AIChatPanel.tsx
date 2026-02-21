import { useCallback, useRef, useState } from 'react';
import type { Language } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

type Message = { role: 'user' | 'assistant'; content: string };

const SYS_PROMPT_ZH = '你是木木，一个友好、专业的AI小助手，擅长中文与健康、语言学习相关的问题。回答简洁 helpful。';
const SYS_PROMPT_EN = 'You are Mumu, a friendly AI assistant. Answer concisely.';

function getApiKey(): string {
  return (import.meta as unknown as { env?: { VITE_GROQ_API_KEY?: string } }).env?.VITE_GROQ_API_KEY ?? '';
}

async function chatWithGroq(messages: Message[], apiKey: string): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYS_PROMPT_ZH },
        ...messages.map((m) => ({ role: m.role, content: m.content }))
      ],
      max_tokens: 512,
      temperature: 0.7
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data?.choices?.[0]?.message?.content;
  return content?.trim() || '';
}

interface AIChatPanelProps {
  lang: Language;
  onClose: () => void;
}

export function AIChatPanel({ lang, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const apiKey = getApiKey();
  const hasKey = !!apiKey.trim();

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!hasKey) {
      setError(lang === 'zh' ? '请配置 VITE_GROQ_API_KEY。在项目根目录创建 .env 并填入密钥（Groq 免费：console.groq.com）' : 'Configure VITE_GROQ_API_KEY in .env (free at console.groq.com)');
      return;
    }
    setInput('');
    setError(null);
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const reply = await chatWithGroq([...messages, userMsg], apiKey);
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      setTimeout(scrollToBottom, 100);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(lang === 'zh' ? `请求失败：${msg}` : `Request failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [input, loading, hasKey, messages, apiKey, lang, scrollToBottom]);

  return (
    <div className="aiChatBackdrop" onClick={onClose}>
      <div className="aiChatPanel" role="dialog" aria-label="AI 对话" onClick={(e) => e.stopPropagation()}>
        <div className="aiChatHeader">
          <h3 className="aiChatTitle">{pickText(ui.aiMascot.chatTitle, lang)}</h3>
          <button type="button" className="aiChatClose" onClick={onClose} aria-label={pickText(ui.aiMascot.close, lang)}>
            ×
          </button>
        </div>
        <div className="aiChatList" ref={listRef}>
          {messages.length === 0 && (
            <p className="aiChatPlaceholder">{pickText(ui.aiMascot.chatPlaceholder, lang)}</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`aiChatBubble aiChatBubble--${m.role}`}>
              <span className="aiChatBubbleLabel">{m.role === 'user' ? (lang === 'zh' ? '你' : 'You') : '木木'}</span>
              <p className="aiChatBubbleText">{m.content}</p>
            </div>
          ))}
        </div>
        {error && <p className="aiChatError">{error}</p>}
        <div className="aiChatFooter">
          <input
            type="text"
            className="aiChatInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={pickText(ui.aiMascot.chatInputPlaceholder, lang)}
            disabled={loading}
          />
          <button type="button" className="aiChatSend" onClick={send} disabled={loading}>
            {loading ? (lang === 'zh' ? '…' : '…') : (lang === 'zh' ? '发送' : 'Send')}
          </button>
        </div>
      </div>
    </div>
  );
}
