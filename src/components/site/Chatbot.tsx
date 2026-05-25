import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const replies: Record<string, string> = {
  demo: "Sure! Polumexa offers free pilots for municipalities and societies. Drop your details in the contact form below and our team reaches out within 24 hours.",
  price: "Pricing scales by number of bins and modules. Typical city deployments start at ₹1.5L/month. Want a tailored quote?",
  hello: "Hi there! 👋 I'm Polly, your Polumexa assistant. Ask me about features, pricing, or pilots.",
  features: "We offer AI segregation, IoT smart bins, route optimization, citizen rewards and full ESG dashboards.",
};

function getReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("demo") || lower.includes("pilot")) return replies.demo;
  if (lower.includes("price") || lower.includes("cost")) return replies.price;
  if (lower.includes("feature")) return replies.features;
  if (lower.includes("hi") || lower.includes("hello")) return replies.hello;
  return "Great question! For specifics, please use the contact form below and our team will respond personally.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm Polly 🌱 — ask me anything about Polumexa." },
  ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: getReply(q) }]), 600);
  };

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full btn-glow shadow-2xl"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[22rem] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
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
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 hover:text-eco">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    m.from === "user"
                      ? "bg-gradient-to-br from-eco to-cyan-accent text-primary-foreground rounded-br-sm"
                      : "glass rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about features, pilots..."
                className="flex-1 px-3 py-2 text-xs rounded-full bg-input/40 border border-border focus:border-eco outline-none"
              />
              <button type="submit" className="grid place-items-center w-9 h-9 rounded-full btn-glow">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
