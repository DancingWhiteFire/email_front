"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle, Circle, Clock, Trash2 } from "lucide-react";
import { useStore } from "../lib/store";
import { api } from "../lib/api";
import type { Task } from "../lib/types";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, removeTask } = useStore();

  const handleToggleStatus = async () => {
    try {
      const nextStatus = task.status === "todo" ? "in-progress" : task.status === "in-progress" ? "done" : "todo";
      await api.updateTask(task._id, { status: nextStatus });
      updateTask(task._id, { status: nextStatus });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteTask(task._id);
      removeTask(task._id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case "done":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-2"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleStatus}
          className="mt-0.5 hover:opacity-80 transition-opacity"
        >
          {getStatusIcon()}
        </button>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-900 dark:text-white ${task.status === "done" ? "line-through text-gray-500" : ""
              }`}
          >
            {task.title}
          </h3>
          {task.dueDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Due: {format(new Date(task.dueDate), "PPP")}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${task.status === "done"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  : task.status === "in-progress"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
            >
              {task.status.replace("-", " ")}
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </motion.div>
  );
}

