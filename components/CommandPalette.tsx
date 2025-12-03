"use client";

import { Command } from "cmdk";
import { useState, useEffect } from "react";
import { Search, Mail, CheckSquare, Calendar, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50"
      onClick={() => setOpen(false)}
    >
      <Command className="w-full max-w-2xl rounded-lg border bg-white dark:bg-gray-900 shadow-lg">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            placeholder="Type a command or search..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item onSelect={() => { router.push("/"); setOpen(false); }}>
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </Command.Item>
            <Command.Item onSelect={() => { router.push("/tasks"); setOpen(false); }}>
              <CheckSquare className="mr-2 h-4 w-4" />
              Tasks
            </Command.Item>
            <Command.Item onSelect={() => { router.push("/calendar"); setOpen(false); }}>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Command.Item>
            <Command.Item onSelect={() => { router.push("/settings"); setOpen(false); }}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

