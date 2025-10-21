"use client";

import { useState, useEffect } from 'react';

export default function GmailUI() {
  const [accountId, setAccountId] = useState('');
  const [fromFilter, setFromFilter] = useState('');
  const [afterFilter, setAfterFilter] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [senderName, setSenderName] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedAccountId = window.localStorage.getItem('gmailAccountId');
    if (storedAccountId) {
      setAccountId(storedAccountId);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('gmailAccountId', accountId);
  }, [accountId]);

  const fetchMessages = async () => {
    if (!accountId) {
      setError('Account ID is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        accountId,
        ...(fromFilter && { from: fromFilter }),
        ...(afterFilter && { after: afterFilter }),
      }).toString();
      const response = await fetch(`/api/gmail/messages?${query}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch messages');
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !body || !accountId) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message: body, senderName, accountId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send email');
      setSuccess(true);
      setTo('');
      setSubject('');
      setBody('');
      setSenderName('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Account ID</label>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          onClick={fetchMessages}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-medium text-gray-900">Compose Email</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
