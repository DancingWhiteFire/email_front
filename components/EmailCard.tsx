"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "../lib/store";
import { api } from "../lib/api";
import type { Email } from "../lib/types";
import { Pin, Archive, Trash2, Reply, ChevronRight } from "lucide-react";
import { useState } from "react";

interface EmailCardProps {
  email: Email;
  onSwipe?: (direction: "left" | "right" | "up" | "down") => void;
}

export function EmailCard({ email, onSwipe }: EmailCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const { updateEmail, setSelectedEmail } = useStore();

  const handleSwipe = async (direction: "left" | "right" | "up" | "down") => {
    try {
      if (direction === "left") {
        await api.deleteEmail(email._id);
        updateEmail(email._id, { status: "deleted" });
      } else if (direction === "right") {
        setSelectedEmail(email);
      } else if (direction === "down") {
        await api.archiveEmail(email._id);
        updateEmail(email._id, { status: "archived" });
      } else if (direction === "up") {
        await api.pinEmail(email._id);
        updateEmail(email._id, { status: "pinned" });
      }
      onSwipe?.(direction);
    } catch (error) {
      console.error("Swipe action failed:", error);
    }
  };

  const handleClick = () => {
    setSelectedEmail(email);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-2 cursor-pointer hover:shadow-md transition-shadow relative"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          handleSwipe(info.offset.x > 0 ? "right" : "left");
        }
        setDragX(0);
      }}
      onDrag={(_, info) => {
        setDragX(info.offset.x);
        setIsDragging(Math.abs(info.offset.x) > 10);
      }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 dark:text-white truncate">
              {email.sender}
            </span>
            {email.status === "pinned" && (
              <Pin className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
            {email.subject}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {email.snippet}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDistanceToNow(new Date(email.receivedAt), { addSuffix: true })}</span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0 ml-2" />
      </div>

      {/* Swipe action indicators */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          {dragX > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(dragX / 200, 1) }}
              className="text-green-500"
            >
              <Reply className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(Math.abs(dragX) / 200, 1) }}
              className="text-red-500"
            >
              <Trash2 className="h-6 w-6" />
            </motion.div>
          )}
        </div>
      )}

      {/* Action buttons (for non-swipe users) */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe("right");
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
        >
          <Reply className="h-4 w-4" />
          Reply
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe("down");
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
        >
          <Archive className="h-4 w-4" />
          Archive
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe("left");
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe("up");
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded"
        >
          <Pin className="h-4 w-4" />
          Pin
        </button>
      </div>
    </motion.div>
  );
}

