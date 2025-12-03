// Zustand store for global state management

import { create } from "zustand";
import type { User, Email, Task } from "./types";

interface AppState {
  user: User | null;
  emails: Email[];
  tasks: Task[];
  selectedEmail: Email | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setEmails: (emails: Email[]) => void;
  addEmail: (email: Email) => void;
  updateEmail: (id: string, updates: Partial<Email>) => void;
  removeEmail: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  setSelectedEmail: (email: Email | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  emails: [],
  tasks: [],
  selectedEmail: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setEmails: (emails) => set({ emails }),
  addEmail: (email) => set((state) => ({ emails: [email, ...state.emails] })),
  updateEmail: (id, updates) =>
    set((state) => ({
      emails: state.emails.map((e) => (e._id === id ? { ...e, ...updates } : e)),
    })),
  removeEmail: (id) =>
    set((state) => ({ emails: state.emails.filter((e) => e._id !== id) })),
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? { ...t, ...updates } : t)),
    })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) })),
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

