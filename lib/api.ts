// API client for backend communication

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://cde867bd13ee.ngrok-free.app";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  // Auth
  async authGoogle(idToken: string) {
    return this.request<{ user: User; token: string }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  }

  // Legacy auth method (for backward compatibility)
  async authGoogleLegacy(email: string, name: string) {
    return this.request<{ user: User; token: string }>("/auth/google/legacy", {
      method: "POST",
      body: JSON.stringify({ email, name, provider: "google" }),
    });
  }

  async authAzure(email: string, name: string) {
    return this.request<{ user: User }>("/auth/azure", {
      method: "POST",
      body: JSON.stringify({ email, name, provider: "azure" }),
    });
  }

  // Emails
  async getEmails(status?: string, userId?: string): Promise<Email[]> {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (userId) params.append("userId", userId);
    return this.request<Email[]>(`/emails?${params.toString()}`);
  }

  async archiveEmail(id: string): Promise<Email> {
    return this.request<Email>(`/emails/${id}/archive`, {
      method: "POST",
    });
  }

  async deleteEmail(id: string): Promise<Email> {
    return this.request<Email>(`/emails/${id}/delete`, {
      method: "POST",
    });
  }

  async pinEmail(id: string): Promise<Email> {
    return this.request<Email>(`/emails/${id}/pin`, {
      method: "POST",
    });
  }

  // AI
  async summarizeEmail(text: string): Promise<AISummaryResponse> {
    return this.request<AISummaryResponse>("/ai/summarize", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  }

  async generateDraft(
    threadContext: string,
    tone: Tone = "short"
  ): Promise<AIDraftResponse> {
    return this.request<AIDraftResponse>("/ai/draft", {
      method: "POST",
      body: JSON.stringify({ threadContext, tone }),
    });
  }

  // Tasks
  async getTasks(ownerId: string): Promise<Task[]> {
    return this.request<Task[]>(`/tasks?ownerId=${ownerId}`);
  }

  async createTask(data: {
    title: string;
    ownerId: string;
    dueDate?: string;
  }): Promise<Task> {
    return this.request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createTaskFromEmail(
    emailId: string,
    data: { title: string; ownerId: string; dueDate?: string }
  ): Promise<Task> {
    return this.request<Task>(`/tasks/from-email/${emailId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTask(
    id: string,
    data: { title?: string; status?: TaskStatus; dueDate?: string }
  ): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  }
}

// Re-export types
import type {
  Email,
  Task,
  Tone,
  AISummaryResponse,
  AIDraftResponse,
  TaskStatus,
  User,
} from "./types";

export const api = new ApiClient(API_BASE_URL);
