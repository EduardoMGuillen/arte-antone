"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Heart } from "lucide-react";
import { useStore } from "./StoreProvider";

export default function Toaster() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ y: 20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-xl"
          >
            {t.tone === "love" ? (
              <Heart className="h-4 w-4 shrink-0 text-promo" fill="currentColor" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
            )}
            <span className="line-clamp-2">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
