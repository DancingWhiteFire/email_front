// Zustand store for global state management

import { create } from "zustand";
import type { UserType, Email, Task } from "@/types/user";
import { BACKEND_URL } from "@/lib/env";
import { apis } from "@/lib/api";

interface UserAppState {
  user: UserType | null;
  emails: Email[];
  tasks: Task[];
  selectedEmail: Email | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: UserType | null) => void;
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
  authGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useStore = create<UserAppState>((set) => ({
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
      emails: state.emails.map((e) =>
        e._id === id ? { ...e, ...updates } : e
      ),
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
  async authGoogle(credential: string) {
    set({ isLoading: true });
    try {
      const result = await apis
        .post<{ user: UserType; token: string }>("/auth/google", {
          credential,
        })
        .then((res) => res.data);
      set({ user: result.user });
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },
  async me(token?: string) {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
  },
  async logout() {
    set({ isLoading: true });
    try {
      await apis.post(`${BACKEND_URL}/auth/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },
}));
