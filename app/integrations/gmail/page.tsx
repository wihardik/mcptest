"use client";

import React, { useEffect, useState } from "react";
import { sendEmail } from '@/app/apihelper/gmail/sendEmail';
import * as integrations from '@/app/services/integrations';

type FormState = {
  to: string;
  subject: string;
  message: string;
  senderName?: string;
  accountId?: string;
};

export default function GmailIntegrationPage() {
  const [accounts, setAccounts] = useState<integrations.ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({ to: "", subject: "", message: "" });
  const [feedback, setFeedback] = useState<string | null>(null);

  async function fetchAccounts() {
    setLoading(true);
    try {
      const res = await integrations.getConnectedAccounts();
      setAccounts(res ?? []);
    } catch (err: any) {
      console.error(err);
      setFeedback(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function handleConnect() {
    try {
      const redirect = window.location.origin + '/integrations/gmail/callback';
      const resp = await integrations.getAuthorizeUrl(redirect);
      const url = (resp && (resp as any).url) || (resp as unknown as string);
      if (!url) throw new Error('No authorize url returned');
      window.open(url, '_blank');
    } catch (err: any) {
      console.error(err);
      setFeedback(err?.message ?? String(err));
    }
  }

  async function handleDisconnect(accountId: string) {
    setLoading(true);
    try {
      await integrations.disconnectAccount(accountId);
      await fetchAccounts();
      setFeedback('Disconnected');
    } catch (err: any) {
      console.error(err);
      setFeedback(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    if (!form.accountId) {
      setFeedback('Please select a connected account');
      return;
    }
    try {
      setLoading(true);
      await sendEmail({
        to: form.to,
        subject: form.subject,
        message: form.message,
        senderName: form.senderName,
        accountId: form.accountId,
      });
      setFeedback('Email sent successfully');
      setForm({ to: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setFeedback(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Gmail Integration</h2>

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleConnect}
        >
          Connect Gmail
        </button>
      </div>

      <section className="mb-6">
        <h3 className="font-medium">Connected Accounts</h3>
        {loading && <p className="text-sm">Loading...</p>}
        {!loading && accounts.length === 0 && (
          <p className="text-sm text-muted-foreground">No connected accounts</p>
        )}
        <ul className="mt-2 space-y-2">
          {accounts.map((acc) => (
            <li key={acc.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{acc.displayName ?? acc.email}</div>
                <div className="text-sm text-gray-600">{acc.email}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border rounded text-sm"
                  onClick={() => handleDisconnect(acc.id)}
                >
                  Disconnect
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-medium mb-2">Send Email</h3>
        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <label className="block text-sm">Account</label>
            <select
              className="w-full border rounded px-2 py-1"
              value={form.accountId}
              onChange={(e) => setForm({ ...form, accountId: e.target.value })}
            >
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.displayName ?? a.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm">To</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm">Subject</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm">Message</label>
            <textarea
              className="w-full border rounded px-2 py-1"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={loading}
            >
              Send Email
            </button>
          </div>
        </form>
        {feedback && <p className="mt-3 text-sm">{feedback}</p>}
      </section>
    </div>
  );
}
