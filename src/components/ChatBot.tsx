import React, { useState, useRef, useEffect, useCallback } from "react";

export interface CitationItem {
  citation_id?: string;
  citation_label?: string;
  document_id?: string;
  filename?: string;
  page_numbers?: number[];
  section_headings?: string[];
  chunk_ids?: string[];
  relevance_score?: number;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  citations?: CitationItem[];
  audioUrl?: string;
  audioLoading?: boolean;
  actions?: Array<{
    label: string;
    href?: string;
    prompt?: string;
  }>;
  isError?: boolean;
}

interface ChatBotProps {
  onNavigate?: (href: string) => void;
}

const RAG_BASE_URL = "http://192.168.1.182:8000";
const CHAT_STREAM_URL = `${RAG_BASE_URL}/api/v1/chat/stream`;
const VOICE_SYNTHESIZE_URL = `${RAG_BASE_URL}/api/v1/voice/synthesize`;
const HEALTH_URL = `${RAG_BASE_URL}/api/v1/health`;

const SUGGESTED_QUESTIONS = [
  "What is MARS?",
  "How does ReconPlus work?",
  "What services do you provide?",
  "Tell me about transaction switching",
  "How can I contact sales?",
];

// Helper: Basic Markdown Parser for Assistant Responses
function renderMarkdownContent(text: string) {
  // Strip raw citation tags like [Doc 1: filename.md] so responses are clean and uncluttered
  const cleanedText = text
    .replace(/\[Doc\s+\d+:[^\]]*\]/g, "")
    .replace(/\s+([.,;:!?])/g, "$1");

  const lines = cleanedText.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`ul-${renderedElements.length}`} className="empay-chat-list">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Headings: ### or ##
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      flushList();
      const headingText = trimmed.replace(/^#{2,3}\s+/, "");
      renderedElements.push(
        <h4 key={`h-${lineIdx}`} className="empay-chat-heading">
          {renderInlineMarkdown(headingText)}
        </h4>
      );
      return;
    }

    // Bullet List Item: * or -
    if (/^[\*\-]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[\*\-]\s+/, "");
      currentList.push(
        <li key={`li-${lineIdx}`}>
          {renderInlineMarkdown(itemText)}
        </li>
      );
      return;
    }

    // Numbered List Item: 1. or 2.
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      currentList.push(
        <li key={`nli-${lineIdx}`}>
          {renderInlineMarkdown(itemText)}
        </li>
      );
      return;
    }

    // Regular paragraph
    flushList();
    renderedElements.push(
      <p key={`p-${lineIdx}`} className="empay-chat-p">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushList();
  return renderedElements;
}

// Helper: Inline tokens (bold, code)
function renderInlineMarkdown(str: string): React.ReactNode[] {
  const tokenRegex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = str.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} className="empay-chat-code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [activeAudioMsgId, setActiveAudioMsgId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "Hello! 👋 Welcome to Empay Software Solutions.\n\nI am connected to our **Intelligent RAG Assistant**. You can ask about our enterprise platforms (**MARS** & **ReconPlus**), clearing and settlement workflows, or switching applications.",
      timestamp: "Just now",
      actions: [
        { label: "What is MARS?", prompt: "What is MARS?" },
        { label: "How does ReconPlus work?", prompt: "How does ReconPlus work?" },
        { label: "Transaction Switching", prompt: "Tell me about transaction switching" },
        { label: "Contact Solutions", prompt: "How can I contact sales?" },
      ],
    },
  ]);

  const conversationIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const lastHealthCheckRef = useRef<number>(0);

  // Sync ref with state
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);

  // Check health (throttled to at most once per 60s to prevent spamming backend)
  const checkHealth = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastHealthCheckRef.current < 60000) {
      return;
    }
    lastHealthCheckRef.current = now;
    try {
      const res = await fetch(HEALTH_URL, { method: "GET" });
      if (res.ok) {
        setBackendStatus("online");
      } else {
        setBackendStatus("offline");
      }
    } catch {
      setBackendStatus("offline");
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Prevent parent scroll interference (Lenis / touch / wheel capture)
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };
    el.addEventListener("wheel", stopPropagation, { passive: true });
    el.addEventListener("touchmove", stopPropagation, { passive: true });
    return () => {
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, []);

  // Escape key handler: exit expanded mode first, or close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isExpanded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when new messages arrive or while tokens stream in
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isStreaming]);

  // When chat is opened: clear unread counter, focus input, and do a single throttled health check
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 250);
      checkHealth();
    }
  }, [isOpen, checkHealth]);

  // Stop any playing audio when chat unmounts or resets
  const stopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
      setActiveAudioMsgId(null);
    }
  };

  // Reset conversation (＋ New Chat)
  const handleResetChat = () => {
    stopAudio();
    conversationIdRef.current = null;
    setConversationId(null);
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: "bot",
        text: "Conversation refreshed. How can I assist you with Empay's payment solutions today?",
        timestamp: "Just now",
        actions: [
          { label: "What is MARS?", prompt: "What is MARS?" },
          { label: "How does ReconPlus work?", prompt: "How does ReconPlus work?" },
          { label: "Transaction Switching", prompt: "Tell me about transaction switching" },
          { label: "Contact Sales", prompt: "How can I contact sales?" },
        ],
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  // Send message with SSE streaming to Intelligent RAG Backend
  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || inputVal).trim();
    if (!userText || isStreaming) return;

    stopAudio();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMsgId = `bot-${Date.now()}`;
    const initialBotMsg: ChatMessage = {
      id: botMsgId,
      sender: "bot",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isStreaming: true,
      citations: [],
    };

    setMessages((prev) => [...prev, userMsg, initialBotMsg]);
    setInputVal("");
    setIsStreaming(true);

    try {
      const response = await fetch(CHAT_STREAM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({
          message: userText,
          conversation_id: conversationIdRef.current || null,
          mode: "text",
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned HTTP status ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No readable stream received from backend");
      }

      setBackendStatus("online");

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedText = "";
      let citationsList: CitationItem[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const eventBlocks = buffer.split(/\r?\n\r?\n/);
        buffer = eventBlocks.pop() || "";

        for (const block of eventBlocks) {
          if (!block.trim()) continue;

          const lines = block.split(/\r?\n/);
          let eventName = "message";
          const dataLines: string[] = [];

          for (const line of lines) {
            if (line.startsWith("event:")) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              dataLines.push(line.slice(5).trim());
            }
          }

          const dataRaw = dataLines.join("\n");
          if (!dataRaw) continue;

          if (eventName === "metadata") {
            try {
              const meta = JSON.parse(dataRaw);
              if (meta.conversation_id) {
                conversationIdRef.current = meta.conversation_id;
                setConversationId(meta.conversation_id);
              }
              if (meta.citations && Array.isArray(meta.citations)) {
                citationsList = meta.citations;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMsgId ? { ...m, citations: citationsList } : m
                  )
                );
              }
            } catch (err) {
              console.warn("Could not parse metadata JSON:", err);
            }
          } else if (eventName === "token") {
            try {
              const tokenData = JSON.parse(dataRaw);
              const delta = tokenData.delta !== undefined ? tokenData.delta : dataRaw;
              accumulatedText += delta;
            } catch {
              accumulatedText += dataRaw;
            }

            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId ? { ...m, text: accumulatedText } : m
              )
            );
          } else if (eventName === "done") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId ? { ...m, isStreaming: false } : m
              )
            );
          } else if (eventName === "error") {
            let errorMsg = "Error during token generation.";
            try {
              const parsed = JSON.parse(dataRaw);
              errorMsg = parsed.error || parsed.detail || errorMsg;
            } catch { }
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId
                  ? {
                    ...m,
                    isStreaming: false,
                    isError: true,
                    text: accumulatedText
                      ? `${accumulatedText}\n\n⚠️ ${errorMsg}`
                      : `⚠️ ${errorMsg}`,
                  }
                  : m
              )
            );
          } else {
            // General token or fallback event
            try {
              const parsed = JSON.parse(dataRaw);
              if (parsed.delta) {
                accumulatedText += parsed.delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMsgId ? { ...m, text: accumulatedText } : m
                  )
                );
              }
            } catch { }
          }
        }
      }

      // Mark streaming done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, isStreaming: false, text: accumulatedText || "(Empty response received)" }
            : m
        )
      );
    } catch (err) {
      console.error("RAG Stream error:", err);
      setBackendStatus("offline");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
              ...m,
              isStreaming: false,
              isError: true,
              text: "⚠️ Unable to reach RAG backend at 192.168.1.182:8000. Ensure the host PC is running and firewall allows port 8000.",
            }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  // Voice / TTS Synthesize & Playback
  const handlePlayTTS = async (msgId: string, rawText: string) => {
    // If this message is currently playing audio, toggle pause
    if (activeAudioMsgId === msgId && audioPlayerRef.current) {
      stopAudio();
      return;
    }

    // Stop existing audio
    stopAudio();

    // Clean text: strip markdown characters and document references [Doc X: ...]
    const cleanText = rawText
      .replace(/\[Doc\s+\d+:[^\]]*\]/g, "")
      .replace(/[#*`_]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    if (!cleanText) return;

    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, audioLoading: true } : m))
    );

    try {
      const res = await fetch(VOICE_SYNTHESIZE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText.slice(0, 1500), // comfortable chunk size for synthesis
          language: "en",
        }),
      });

      if (!res.ok) {
        throw new Error(`TTS synthesis returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const audioUrl = data.audio_url?.startsWith("http")
        ? data.audio_url
        : `${RAG_BASE_URL}${data.audio_url}`;

      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      setActiveAudioMsgId(msgId);

      audio.onended = () => {
        setActiveAudioMsgId(null);
        audioPlayerRef.current = null;
      };
      audio.onerror = () => {
        setActiveAudioMsgId(null);
        audioPlayerRef.current = null;
      };

      await audio.play();
    } catch (err) {
      console.error("Audio synthesis error:", err);
      alert("TTS audio playback is currently unavailable from 192.168.1.182:8000.");
      setActiveAudioMsgId(null);
    } finally {
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, audioLoading: false } : m))
      );
    }
  };

  const handleActionClick = (action: { label: string; href?: string; prompt?: string }) => {
    if (action.href) {
      if (onNavigate) {
        onNavigate(action.href);
      } else {
        const el = document.querySelector(action.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (action.prompt) {
      handleSendMessage(action.prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="empay-chat-root" aria-label="Empay Chat Assistant">
      {/* Floating Launcher Button */}
      <button
        type="button"
        id="chatbot-btn"
        className={`empay-chat-launcher ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? "Close Empay Assistant" : "Open Empay Assistant"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="empay-chat-launcher__icon" aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          )}
        </span>

        {/* Status dot */}
        {!isOpen && (
          <span
            className="empay-chat-launcher__status"
            title={`Backend Status: ${backendStatus}`}
          >
            <span
              className={`empay-chat-launcher__pulse ${backendStatus === "offline" ? "is-offline" : ""
                }`}
            />
          </span>
        )}

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="empay-chat-launcher__badge" aria-label="1 unread message">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dim backdrop when in full-screen view */}
      {isOpen && isExpanded && (
        <div
          className="empay-chat-backdrop is-visible"
          aria-hidden="true"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Chat Window Panel */}
      <div
        className={`empay-chat-panel ${isOpen ? "is-open" : ""} ${isExpanded ? "is-expanded" : ""
          }`}
        role="dialog"
        aria-modal={isExpanded}
        aria-label="Empay Intelligent RAG Chatbot"
        data-lenis-prevent="true"
      >
        {/* Panel Header */}
        <div
          className="empay-chat-header"
          onDoubleClick={() => setIsExpanded((prev) => !prev)}
          title="Double-click header to toggle full screen"
        >
          <div className="empay-chat-header__brand">
            <div className="empay-chat-avatar">
              <span>EP</span>
              <span
                className={`empay-chat-avatar__online ${backendStatus === "offline" ? "is-offline" : ""
                  }`}
              />
            </div>
            <div className="empay-chat-header__info">
              <div className="empay-chat-header__title">
                <strong>Empay Assistant</strong>
                <span className="empay-chat-header__tag">RAG AI</span>
              </div>
              <div className="empay-chat-header__sub-row">
                <span
                  className={`empay-chat-status-dot ${backendStatus}`}
                  title={`Backend: 192.168.1.182:8000 (${backendStatus})`}
                />
                <span className="empay-chat-header__sub">
                  {backendStatus === "online"
                    ? "RAG Connected"
                    : backendStatus === "offline"
                      ? "Backend Offline"
                      : "Connecting..."}
                </span>
              </div>
            </div>
          </div>

          <div className="empay-chat-header__actions">
            {/* ＋ New Chat Button */}
            <button
              type="button"
              className="empay-chat-header__new-btn"
              title="Start a new chat session (clears conversation memory)"
              aria-label="New Chat"
              onClick={handleResetChat}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>New Chat</span>
            </button>

            {/* Expand / Restore Full Screen Button */}
            <button
              type="button"
              className={`empay-chat-header__btn ${isExpanded ? "is-active" : ""}`}
              title={isExpanded ? "Exit Full Screen" : "Full Screen View"}
              aria-label={isExpanded ? "Exit Full Screen" : "Full Screen View"}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>

            {/* Close Button (✕) */}
            <button
              type="button"
              className="empay-chat-header__btn"
              title="Close Chat (Esc)"
              aria-label="Close Chat"
              onClick={() => {
                setIsExpanded(false);
                setIsOpen(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Carousel */}
        <div className="empay-chat-suggestions">
          <span className="empay-chat-suggestions__label">Quick Queries:</span>
          <div className="empay-chat-suggestions__pills" data-lenis-prevent="true">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                className="empay-chat-suggestion-chip"
                disabled={isStreaming}
                onClick={() => handleSendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Stream */}
        <div
          ref={messagesContainerRef}
          className="empay-chat-messages"
          role="log"
          aria-live="polite"
          data-lenis-prevent="true"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`empay-chat-msg empay-chat-msg--${m.sender} ${m.isError ? "empay-chat-msg--error" : ""
                }`}
            >
              <div className="empay-chat-msg__bubble">
                <div className="empay-chat-msg__text">
                  {m.text ? (
                    renderMarkdownContent(m.text)
                  ) : m.isStreaming ? (
                    <div className="empay-chat-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null}
                </div>

                {/* Predefined / Suggested Actions */}
                {m.actions && m.actions.length > 0 && (
                  <div className="empay-chat-msg__actions">
                    {m.actions.map((act) => (
                      <button
                        key={act.label}
                        type="button"
                        className="empay-chat-action-btn"
                        onClick={() => handleActionClick(act)}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Audio TTS Playback Button (for completed bot messages) */}
                {m.sender === "bot" && !m.isStreaming && !m.isError && m.text.length > 5 && (
                  <div className="empay-chat-tts-container">
                    <button
                      type="button"
                      className={`empay-chat-tts-btn ${activeAudioMsgId === m.id ? "is-playing" : ""
                        }`}
                      disabled={m.audioLoading}
                      onClick={() => handlePlayTTS(m.id, m.text)}
                      title={activeAudioMsgId === m.id ? "Stop Audio" : "Listen via TTS"}
                    >
                      {m.audioLoading ? (
                        <>
                          <span className="empay-chat-tts-spinner" />
                          <span>Synthesizing...</span>
                        </>
                      ) : activeAudioMsgId === m.id ? (
                        <>
                          <span className="empay-chat-tts-icon">⏹</span>
                          <span>Stop Listening</span>
                        </>
                      ) : (
                        <>
                          <span className="empay-chat-tts-icon">🔊</span>
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <span className="empay-chat-msg__time">
                {m.timestamp}
                {m.sender === "bot" && conversationId && (
                  <span className="empay-chat-session-tag"> · RAG Session Active</span>
                )}
              </span>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          className="empay-chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="empay-chat-input"
            placeholder={
              isStreaming
                ? "RAG assistant is responding..."
                : "Ask about MARS, ReconPlus, or payments..."
            }
            value={inputVal}
            disabled={isStreaming}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="empay-chat-send"
            disabled={!inputVal.trim() || isStreaming}
            aria-label="Send message"
          >
            {isStreaming ? (
              <span className="empay-chat-send-spinner" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
