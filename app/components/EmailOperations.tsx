'use client';

import { useState } from 'react';

interface EmailOperationsProps {
  accountId: string;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  snippet: string;
  date: string;
}

export default function EmailOperations({ 
  accountId, 
  onError, 
  loading, 
  setLoading 
}: EmailOperationsProps) {
  const [activeTab, setActiveTab] = useState<'messages' | 'send' | 'reply'>('messages');
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  
  // Get Messages Form
  const [fromFilter, setFromFilter] = useState('');
  const [afterFilter, setAfterFilter] = useState('');
  
  // Send Email Form
  const [sendTo, setSendTo] = useState('');
  const [sendSubject, setSendSubject] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  
  // Reply Form
  const [replyMessageId, setReplyMessageId] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyToSenderOnly, setReplyToSenderOnly] = useState(false);
  const [ccList, setCcList] = useState('');
  const [bccList, setBccList] = useState('');

  const [operationResult, setOperationResult] = useState<any>(null);

  // Get All Messages
  const handleGetMessages = async () => {
    setMessagesLoading(true);
    setOperationResult(null);
    
    try {
      const payload = {
        accountId,
        ...(fromFilter && { from: fromFilter }),
        ...(afterFilter && { after: afterFilter }),
      };

      const response = await fetch('/api/integration/gmail/getAllMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get messages');
      }

      const data = await response.json();
      setOperationResult(data);
      
      // Mock message parsing (actual structure depends on Gmail API response)
      if (data.data && Array.isArray(data.data)) {
        setMessages(data.data.slice(0, 10)); // Show first 10 messages
      }
    } catch (error: any) {
      onError(`Failed to get messages: ${error.message}`);
    } finally {
      setMessagesLoading(false);
    }
  };

  // Send Email
  const handleSendEmail = async () => {
    if (!sendTo || !sendSubject || !sendMessage) {
      onError('Please fill in all required fields (To, Subject, Message)');
      return;
    }

    setLoading(true);
    setOperationResult(null);
    
    try {
      const payload = {
        to: sendTo,
        subject: sendSubject,
        message: sendMessage,
        accountId,
        ...(senderName && { senderName }),
      };

      const response = await fetch('/api/integration/gmail/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await response.json();
      setOperationResult(data);
      
      // Clear form on success
      setSendTo('');
      setSendSubject('');
      setSendMessage('');
      setSenderName('');
    } catch (error: any) {
      onError(`Failed to send email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reply to Thread
  const handleReplyToThread = async () => {
    if (!replyMessageId || !replyMessage) {
      onError('Please fill in Message ID and Reply Message');
      return;
    }

    setLoading(true);
    setOperationResult(null);
    
    try {
      const payload = {
        messageId: replyMessageId,
        message: replyMessage,
        accountId,
        ...(senderName && { senderName }),
        replyToSenderOnly,
        ...(ccList && { ccList }),
        ...(bccList && { bccList }),
      };

      const response = await fetch('/api/integration/gmail/replyToThread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reply to thread');
      }

      const data = await response.json();
      setOperationResult(data);
      
      // Clear form on success
      setReplyMessageId('');
      setReplyMessage('');
      setReplyToSenderOnly(false);
      setCcList('');
      setBccList('');
    } catch (error: any) {
      onError(`Failed to reply to thread: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'messages', label: 'Get Messages', icon: '📧' },
    { id: 'send', label: 'Send Email', icon: '✉️' },
    { id: 'reply', label: 'Reply to Thread', icon: '↩️' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Get Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Retrieve Gmail Messages
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From (optional)
                </label>
                <input
                  type="email"
                  value={fromFilter}
                  onChange={(e) => setFromFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="sender@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  After Date (optional)
                </label>
                <input
                  type="date"
                  value={afterFilter}
                  onChange={(e) => setAfterFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button
              onClick={handleGetMessages}
              disabled={messagesLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              {messagesLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading Messages...
                </>
              ) : (
                'Get Messages'
              )}
            </button>
          </div>
        )}

        {/* Send Email Tab */}
        {activeTab === 'send' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Send New Email
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sender Name (optional)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={sendSubject}
                onChange={(e) => setSendSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Email subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Email message content"
                required
              />
            </div>

            <button
              onClick={handleSendEmail}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Email...
                </>
              ) : (
                'Send Email'
              )}
            </button>
          </div>
        )}

        {/* Reply to Thread Tab */}
        {activeTab === 'reply' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reply to Email Thread
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={replyMessageId}
                  onChange={(e) => setReplyMessageId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Original message ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sender Name (optional)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CC List (optional)
                </label>
                <input
                  type="text"
                  value={ccList}
                  onChange={(e) => setCcList(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="cc1@example.com, cc2@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  BCC List (optional)
                </label>
                <input
                  type="text"
                  value={bccList}
                  onChange={(e) => setBccList(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="bcc1@example.com, bcc2@example.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="replyToSenderOnly"
                checked={replyToSenderOnly}
                onChange={(e) => setReplyToSenderOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="replyToSenderOnly" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Reply to sender only
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reply Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Reply message content"
                required
              />
            </div>

            <button
              onClick={handleReplyToThread}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Reply...
                </>
              ) : (
                'Send Reply'
              )}
            </button>
          </div>
        )}

        {/* Operation Result Display */}
        {operationResult && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Operation Result
            </h4>
            <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-64">
              {JSON.stringify(operationResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
