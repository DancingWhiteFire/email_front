"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../lib/store";
import { api } from "../../lib/api";
import { TaskCard } from "../../components/TaskCard";
import { CommandPalette } from "../../components/CommandPalette";
import { ArrowLeft, Plus, CheckSquare } from "lucide-react";
import { useState } from "react";

export default function TasksPage() {
  const router = useRouter();
  const { user, tasks, setTasks, setUser } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const loadTasks = useCallback(async (ownerId: string) => {
    try {
      const data = await api.getTasks(ownerId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  }, [setTasks]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      loadTasks(userObj.id);
    } else {
      router.push("/login");
    }
  }, [loadTasks, router, setUser]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTaskTitle.trim()) return;

    try {
      await api.createTask({
        title: newTaskTitle,
        ownerId: user.id,
      });
      setNewTaskTitle("");
      setShowCreateModal(false);
      loadTasks(user.id);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  if (!user) return null;

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommandPalette />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Todo ({todoTasks.length})
            </h2>
            <div className="space-y-2">
              {todoTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
              {todoTasks.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  No tasks
                </p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              In Progress ({inProgressTasks.length})
            </h2>
            <div className="space-y-2">
              {inProgressTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
              {inProgressTasks.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  No tasks
                </p>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Done ({doneTasks.length})
            </h2>
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
              {doneTasks.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  No tasks
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Task
            </h2>
            <form onSubmit={handleCreateTask}>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                autoFocus
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

