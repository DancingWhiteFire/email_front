"use client";

import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Zap } from "lucide-react";

const funFacts = [
  "You've achieved Inbox Zero! 🎉",
  "You're a productivity master!",
  "Nothing left to triage. Time for coffee! ☕",
  "All caught up. You're unstoppable!",
  "Zero emails, infinite possibilities!",
];

export function InboxZero() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full py-12 px-4"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="mb-6"
      >
        <CheckCircle className="h-24 w-24 text-green-500" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {randomFact}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-400 text-center max-w-md"
      >
        Your inbox is clean and organized. New emails will appear here when they arrive.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 mt-8"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Sparkles className="h-4 w-4" />
          <span>AI-powered organization</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Zap className="h-4 w-4" />
          <span>Lightning-fast triage</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

