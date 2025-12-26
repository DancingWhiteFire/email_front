"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { apis } from "@/lib/api";
import React, { useCallback, useEffect } from "react";
import { EmailInbox, Email } from "@/app/mails/child";
import LucideIcon from "@/common/LucideIcon";

const mockEmails: Email[] = [
  {
    id: "1",
    from: "Google",
    subject: "Security alert: New sign-in",
    snippet: "We noticed a new sign-in to your Google Account...",
    date: "2:34 PM",
    isRead: false,
    isStarred: true,
    labels: ["Important", "Security"],
  },
  {
    id: "2",
    from: "GitHub",
    subject: "[jobeagle] New pull request",
    snippet: "A new pull request has been opened on jobeagle repo...",
    date: "11:09 AM",
    isRead: true,
    isStarred: false,
    labels: ["Dev"],
  },
  {
    id: "3",
    from: "BitGo",
    subject: "Your monthly custody report",
    snippet: "Your latest custody and transaction report is now available...",
    date: "Dec 8",
    isRead: true,
    isStarred: false,
    labels: ["Fintech"],
  },
];

const MailsPage: React.FC = () => {
  const getGmail = useCallback(async () => {
    const res = await apis.get("/emails/gmail").then((res) => res.data);
    console.log(res);
  }, []);
  const forwardingGmail = useCallback(async () => {
    const res = await apis.get("/emails/gmail/sync").then((res) => res.data);
    console.log(res);
  }, []);
  // const createLabel = useCallback(async () => {
  //   const res = await apis.get("/labels/create").then((res) => res.data);
  //   console.log(res);
  // }, []);

  return (
    <DefaultLayout>
      {/* <button
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={createLabel}
      >
        <LucideIcon iconName="Tags" /> Create Label
      </button> */}
      <button
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={forwardingGmail}
      >
        <LucideIcon iconName="Mail" /> Forwarding Gmail
      </button>
      <button
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={getGmail}
      >
        <LucideIcon iconName="Mail" /> Get Gmail
      </button>
      <div className="flex min-w-full items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <EmailInbox emails={mockEmails} />
      </div>
    </DefaultLayout>
  );
};

export default MailsPage;
