"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  BookDown,
  Bookmark,
  ChevronDown,
  CircleAlert,
  Clock,
  EllipsisVertical,
  File,
  FolderInput,
  Inbox,
  Mail,
  MailOpen,
  MoreVertical,
  Reply,
  Search,
  Send,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";

export type Email = {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string; // e.g. "2:34 PM" or "Dec 9"
  isRead?: boolean;
  isStarred?: boolean;
  labels?: string[];
};

interface EmailInboxProps {
  emails: Email[];
}

export function EmailInbox({ emails }: EmailInboxProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    emails[0]?.id ?? null,
  );

  const [starredState, setStarredState] = useState<Record<string, boolean>>(
    () =>
      emails.reduce(
        (acc, email) => {
          acc[email.id] = !!email.isStarred;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
  );

  const [search, setSearch] = useState("");

  const filteredEmails = useMemo(() => {
    if (!search.trim()) return emails;
    const q = search.toLowerCase();
    return emails.filter(
      (e) =>
        e.from.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.snippet.toLowerCase().includes(q),
    );
  }, [emails, search]);

  const selectedEmail =
    filteredEmails.find((e) => e.id === selectedId) ?? filteredEmails[0];

  const toggleStar = (id: string) => {
    setStarredState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
      {/* LEFT NAV (like Gmail sidebar) */}
      <aside className="hidden h-full w-56 flex-col border-r border-slate-200 bg-slate-50/80 px-3 py-4 text-sm dark:border-slate-800 dark:bg-slate-900/60 lg:flex">
        <button className="mb-4 inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600">
          Compose
        </button>

        <nav className="space-y-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button className="flex w-full items-center gap-3 rounded-full bg-slate-200/80 px-3 py-2 text-[13px] font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-50">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            <Inbox />
            Inbox
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <Star />
            Starred
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-400" />
            <Clock />
            Snoozed
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
            <Send />
            Sent
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <File />
            Drafts
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
            <CircleAlert />
            Spam
          </button>
          <button className="flex w-full items-center gap-3 rounded-full px-3 py-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/70">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
            <Trash2 />
            Trash
          </button>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* TOP BAR (search + actions) */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mail"
              className="h-8 w-full rounded-full border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
            />
          </div>

          <button className="hidden h-8 items-center gap-1 rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/80 md:inline-flex">
            <span>Filter</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/80">
            <MoreVertical className="h-4 w-4" />
          </button>
        </header>

        {/* LIST + PREVIEW */}
        <div className="flex min-h-0 flex-1 border-t border-slate-100 dark:border-slate-800">
          {/* EMAIL LIST */}
          <div className="flex w-full flex-col border-r border-slate-100 text-xs dark:border-slate-800 md:w-[360px]">
            {/* List header (checkbox + actions) */}
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-3 py-2 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-slate-300 text-sky-500 focus:ring-0 focus:ring-offset-0 dark:border-slate-600"
              />
              <span>Select</span>
              <span className="mx-1 text-slate-300">•</span>
              <button className="flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-100">
                <BookDown className="h-3 w-3" />
                {/* <span>Archive</span> */}
              </button>
              <button className="ml-auto inline-flex items-center hover:text-yellow-500">
                <CircleAlert className="h-3 w-3" />
              </button>
              <button className="ml-auto inline-flex items-center hover:text-red-500">
                <Trash2 className="h-3 w-3" />
              </button>
              <button className="ml-auto inline-flex items-center hover:text-blue-500">
                <Mail className="h-3 w-3" />
              </button>
              <button className="ml-auto inline-flex items-center hover:text-blue-500">
                <MailOpen className="h-3 w-3" />
              </button>{" "}
              <button className="ml-auto inline-flex items-center hover:text-blue-500">
                <FolderInput className="h-3 w-3" />
              </button>
              <button className="ml-auto inline-flex items-center hover:text-blue-500">
                <EllipsisVertical className="h-3 w-3" />
              </button>
            </div>

            {/* Email rows */}
            <div className="flex-1 overflow-y-auto">
              {filteredEmails.length === 0 && (
                <div className="flex h-full items-center justify-center text-[12px] text-slate-400">
                  No emails found.
                </div>
              )}

              {filteredEmails.map((email) => {
                const isSelected = email.id === selectedEmail?.id;
                const isStarred = starredState[email.id];

                return (
                  <div
                    key={email.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedId(email.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(email.id);
                      }
                    }}
                    className={[
                      "flex w-full items-center gap-3 border-b border-slate-100 px-3 py-2 text-left text-[12px] transition-all",
                      "hover:bg-sky-50 dark:border-slate-800 dark:hover:bg-slate-800/80",
                      !email.isRead ? "bg-slate-50/60 dark:bg-slate-900" : "",
                      isSelected
                        ? "bg-sky-50/80 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                        : "",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded border-slate-300 text-sky-500 focus:ring-0 focus:ring-offset-0 dark:border-slate-600"
                      onClick={(e) => e.stopPropagation()}
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="flex h-5 w-5 items-center justify-center text-amber-400"
                    >
                      {isStarred ? (
                        <Star className="h-3 w-3 fill-amber-400" />
                      ) : (
                        <StarOff className="h-3 w-3" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="flex h-5 w-5 items-center justify-center text-amber-400"
                    >
                      {isStarred ? (
                        <Bookmark className="h-3 w-3 fill-amber-400" />
                      ) : (
                        <Bookmark className="h-3 w-3" />
                      )}
                    </button>

                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span
                        className={[
                          "w-32 truncate",
                          !email.isRead ? "font-semibold" : "font-normal",
                        ].join(" ")}
                      >
                        {email.from}
                      </span>
                      <div className="flex min-w-0 flex-1 items-center gap-1">
                        <span
                          className={[
                            "truncate",
                            !email.isRead ? "font-semibold" : "font-normal",
                          ].join(" ")}
                        >
                          {email.subject}
                        </span>
                        <span className="text-slate-400"> — </span>
                        <span className="truncate text-slate-400">
                          {email.snippet}
                        </span>
                      </div>
                    </div>

                    <span className="ml-2 shrink-0 text-[11px] text-slate-400">
                      {email.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div className="hidden min-w-0 flex-1 flex-col md:flex">
            {selectedEmail ? (
              <>
                {/* Preview header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3 text-xs dark:border-slate-800 dark:bg-slate-900">
                  <div>
                    <div className="flex items-center gap-2 text-[13px] font-semibold">
                      {selectedEmail.subject}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {selectedEmail.from} • {selectedEmail.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
                    <button className="inline-flex h-7 items-center gap-1 rounded-full border border-slate-200 px-2 text-[11px] hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80">
                      <Reply className="h-3 w-3" />
                      Reply
                    </button>
                    <button className="inline-flex h-7 items-center gap-1 rounded-full border border-slate-200 px-2 text-[11px] hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80">
                      <Send className="h-3 w-3" />
                      Forward
                    </button>
                    <button className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80">
                      <MoreVertical className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto bg-white px-6 py-4 text-[13px] leading-relaxed text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                  <p className="mb-4">
                    {selectedEmail.snippet} This is where you can render the
                    full HTML/text of the email body once you have it from the
                    API.
                  </p>

                  {selectedEmail.labels && selectedEmail.labels.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      {selectedEmail.labels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-sky-50 px-2 py-0.5 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-[12px] text-slate-400">
                Select an email to preview
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
