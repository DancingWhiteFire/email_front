// Shared types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "team";
}

export interface Email {
  _id: string;
  userId: string;
  providerMsgId: string;
  threadId: string;
  subject: string;
  snippet: string;
  body: string;
  sender: string;
  receivedAt: string;
  status: "inbox" | "archived" | "deleted" | "pinned";
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  dueDate?: string;
  status: "todo" | "in-progress" | "done";
  emailId?: string;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AISummaryResponse {
  summary: string;
}

export interface AIDraftResponse {
  draft: string;
}

export type EmailStatus = "inbox" | "archived" | "deleted" | "pinned";
export type TaskStatus = "todo" | "in-progress" | "done";
export type Tone = "formal" | "casual" | "friendly" | "short";

