import { PLAN_VALUES } from "@/constant/data";

export interface UserType {
  id: string;
  name: string;
  address: string | null;
  avatar: string | null;
  phone: string | null;
  plan: (typeof PLAN_VALUES)[keyof typeof PLAN_VALUES];
  mails: {
    google?: UserEmailType;
    microsoft?: UserEmailType;
  };
  connected: boolean;
}

export interface UserEmailType {
  mailId: string;
  email: string;
  picture?: string;
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
