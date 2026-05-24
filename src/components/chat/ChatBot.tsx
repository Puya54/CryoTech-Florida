"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "¡Hola! Soy el asistente virtual de CryoTech Florida 🧊 ¿En qué puedo ayudarte hoy?",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const trimmedInput = input.trim();

  const sendMessage = async () => {
    if (!trimmedInput || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const reply = data.reply ?? "Lo siento, no pude obtener una respuesta.";

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Hubo un error al conectar. Por favor llámanos al (305) 555-0100.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = !!trimmedInput && !isLoading;

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="Abrir asistente virtual"
        style={{
          position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-cyan) 0%, #0891b2 100%)",
          color: "white", border: "none", cursor: "pointer",
          boxShadow: "0 4px 24px rgba(6, 182, 212, 0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        whileHover={{ scale: isOpen ? 0 : 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={26} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "1.75rem",
              right: "1.75rem",
              zIndex: 9998,
              width: "360px",
              height: "520px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 6rem)",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 12px 48px rgba(15, 23, 42, 0.16)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, var(--color-cyan) 0%, #0891b2 100%)",
              padding: "0.875rem 1.25rem",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Bot size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.2 }}>
                    CryoTech Assistant
                  </div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                    {isLoading ? "Escribiendo…" : "En línea · Responde en segundos"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none",
                  borderRadius: "8px", color: "white", cursor: "pointer",
                  padding: "0.375rem", display: "flex", alignItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "1rem",
              display: "flex", flexDirection: "column", gap: "0.875rem",
              background: "#f8fafc",
            }}>
              {messages.map((m) => (
                <div key={m.id} style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: m.role === "user" ? "var(--color-ink)" : "var(--color-cyan)",
                    color: "white",
                  }}>
                    {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div style={{
                    maxWidth: "78%",
                    background: m.role === "user" ? "var(--color-ink)" : "white",
                    color: m.role === "user" ? "white" : "var(--color-ink)",
                    padding: "0.625rem 0.875rem",
                    borderRadius: "16px",
                    borderBottomRightRadius: m.role === "user" ? "4px" : "16px",
                    borderBottomLeftRadius: m.role === "user" ? "16px" : "4px",
                    fontSize: "0.9rem",
                    lineHeight: 1.55,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: m.role === "assistant" ? "1px solid rgba(0,0,0,0.07)" : "none",
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--color-cyan)", color: "white", flexShrink: 0,
                  }}>
                    <Bot size={14} />
                  </div>
                  <div style={{
                    background: "white", padding: "0.75rem 1rem", borderRadius: "16px",
                    borderBottomLeftRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    <span style={{ width: "7px", height: "7px", background: "var(--color-cyan)", borderRadius: "50%", animation: "bounce 1.2s ease-in-out 0s infinite" }} />
                    <span style={{ width: "7px", height: "7px", background: "var(--color-cyan)", borderRadius: "50%", animation: "bounce 1.2s ease-in-out 0.2s infinite" }} />
                    <span style={{ width: "7px", height: "7px", background: "var(--color-cyan)", borderRadius: "50%", animation: "bounce 1.2s ease-in-out 0.4s infinite" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "0.75rem 1rem",
              background: "white",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              display: "flex",
              gap: "0.5rem",
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje…"
                disabled={isLoading}
                style={{
                  flex: 1, padding: "0.625rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  outline: "none",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  background: isLoading ? "#f8fafc" : "white",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-cyan)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.14)")}
              />
              <button
                onClick={sendMessage}
                disabled={!canSend}
                aria-label="Enviar mensaje"
                style={{
                  width: "42px", height: "42px", flexShrink: 0,
                  borderRadius: "50%",
                  background: canSend ? "var(--color-cyan)" : "#e2e8f0",
                  color: canSend ? "white" : "#94a3b8",
                  border: "none",
                  cursor: canSend ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, transform 0.1s",
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) => { if (canSend) (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
