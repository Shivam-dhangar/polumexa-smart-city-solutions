import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { getReply } from "@/lib/chat-fn";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_PROMPTS = ["What's the pricing?", "How do smart bins work?", "Request a free pilot"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm Polly 🌱 — your Polumexa assistant. Ask me about smart bins, pricing, pilots, or anything about waste management!",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const sendMsg = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: getReply(q) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMsg(input);
  };

  return (
    <>
      <motion.button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full btn-glow shadow-2xl"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[22rem] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-eco/20 to-cyan-accent/10 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-eco to-cyan-accent">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Polly Assistant</div>
                  <div className="text-[10px] text-eco flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-eco animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 hover:text-eco transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 max-h-72 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  {m.from === "bot" && (
                    <span className="flex-shrink-0 grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-eco/30 to-cyan-accent/30 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-eco" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      m.from === "user"
                        ? "bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground rounded-br-sm"
                        : "glass rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2 justify-start">
                  <span className="flex-shrink-0 grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-eco/30 to-cyan-accent/30">
                    <Bot className="w-3.5 h-3.5 text-eco" />
                  </span>
                  <div className="glass rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5 items-center h-3">
                      {[0, 1, 2].map((idx) => (
                        <motion.div
                          key={idx}
                          className="w-1.5 h-1.5 rounded-full bg-eco"
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 0.7, delay: idx * 0.15, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts — only before first user message */}
            {msgs.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMsg(p)}
                    className="text-[10px] px-3 py-1 rounded-full glass hover:bg-eco/20 hover:text-eco transition-colors border border-border"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={typing}
                placeholder="Ask about features, pricing, pilots…"
                className="flex-1 px-3 py-2 text-xs rounded-full bg-input/40 border border-border focus:border-eco outline-none transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="grid place-items-center w-9 h-9 rounded-full btn-glow disabled:opacity-40 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
