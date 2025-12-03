"use client";

import { useState } from "react";
import { useStore } from "../lib/store";
import { api } from "../lib/api";
import { X, Reply, Archive, Trash2, Pin, Sparkles, FileText } from "lucide-react";
import { format } from "date-fns";
import type { Tone } from "../lib/types";

export function EmailDetail() {
  const { selectedEmail, setSelectedEmail, updateEmail } = useStore();
  const [draft, setDraft] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [selectedTone, setSelectedTone] = useState<Tone>("short");

  if (!selectedEmail) return null;

  const handleClose = () => {
    setSelectedEmail(null);
    setDraft("");
    setSummary("");
  };

  const handleArchive = async () => {
    try {
      await api.archiveEmail(selectedEmail._id);
      updateEmail(selectedEmail._id, { status: "archived" });
      handleClose();
    } catch (error) {
      console.error("Failed to archive:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteEmail(selectedEmail._id);
      updateEmail(selectedEmail._id, { status: "deleted" });
      handleClose();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handlePin = async () => {
    try {
      await api.pinEmail(selectedEmail._id);
      updateEmail(selectedEmail._id, { status: "pinned" });
    } catch (error) {
      console.error("Failed to pin:", error);
    }
  };

  const handleGenerateDraft = async () => {
    setIsGeneratingDraft(true);
    try {
      const response = await api.generateDraft(selectedEmail.body, selectedTone);
      setDraft(response.draft);
    } catch (error) {
      console.error("Failed to generate draft:", error);
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await api.summarizeEmail(selectedEmail.body);
      setSummary(response.summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {selectedEmail.subject}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedEmail.sender}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(selectedEmail.receivedAt), "PPP p")}
              </span>
            </div>
          </div>

          {/* AI Actions */}
          <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              {isGeneratingSummary ? "Summarizing..." : "Summarize"}
            </button>
            <div className="flex items-center gap-2">
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value as Tone)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="short">Short</option>
              </select>
              <button
                onClick={handleGenerateDraft}
                disabled={isGeneratingDraft}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                {isGeneratingDraft ? "Generating..." : "AI Draft"}
              </button>
            </div>
          </div>

          {summary && (
            <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium text-purple-900 dark:text-purple-200 mb-2">
                Summary
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-300">{summary}</p>
            </div>
          )}

          {/* Email Body */}
          <div
            className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
          />

          {/* Draft */}
          {draft && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                AI Draft ({selectedTone})
              </h3>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={6}
              />
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  Send
                </button>
                <button
                  onClick={() => setDraft("")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={handlePin}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Pin"
            >
              <Pin className="h-5 w-5 text-yellow-600" />
            </button>
            <button
              onClick={handleArchive}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Archive"
            >
              <Archive className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </button>
          </div>
          <button
            onClick={handleGenerateDraft}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

