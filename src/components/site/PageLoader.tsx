import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

export function PageLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-eco/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-eco border-r-cyan-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <Leaf className="w-7 h-7 text-eco" />
              </div>
            </div>
            <div className="mt-6 font-display font-bold text-lg">
              Polumexa<span className="text-gradient"> Solutions</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Loading smart city OS…</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
