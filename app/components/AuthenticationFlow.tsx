'use client';

import { useState } from 'react';

interface AuthenticationFlowProps {
  onAuthSuccess: (accountId: string) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function AuthenticationFlow({ 
  onAuthSuccess, 
  onError, 
  loading, 
  setLoading 
}: AuthenticationFlowProps) {
  const [userId, setUserId] = useState('hardik'); // Default from env
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  const handleGetAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/integration/auth?userId=${encodeURIComponent(userId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get auth URL');
      }

      const data = await response.json();
      setAuthUrl(data.authUrl);
    } catch (error: any) {
      onError(`Failed to get authorization URL: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleManualAccountId = () => {
    const accountId = prompt('Enter your account_id (obtained after OAuth authorization):');
    if (accountId && accountId.trim()) {
      onAuthSuccess(accountId.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Gmail Authentication
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your Gmail account to start using the integration features.
        </p>
      </div>

      {/* Step 1: Get Authorization URL */}
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter user ID"
          />
        </div>

        <button
          onClick={handleGetAuthUrl}
          disabled={loading || !userId.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Getting Authorization URL...
            </>
          ) : (
            'Get Gmail Authorization URL'
          )}
        </button>

        {/* Step 2: Display Authorization URL */}
        {authUrl && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-2">
              Authorization URL Generated
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Click the link below to authorize Gmail access. After authorization, you'll be redirected back with an account_id.
            </p>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded border break-all">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  {authUrl}
                </code>
              </div>
              <a
                href={authUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Authorize Gmail Access
              </a>
            </div>
          </div>
        )}

        {/* Step 3: Manual Account ID Entry */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Already have an account_id?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            If you've already completed the OAuth flow and have an account_id, you can enter it directly.
          </p>
          <button
            onClick={handleManualAccountId}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Enter Account ID Manually
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          📋 Instructions
        </h4>
        <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-decimal list-inside">
          <li>Enter your User ID and click "Get Gmail Authorization URL"</li>
          <li>Click "Authorize Gmail Access" to open Google's OAuth page</li>
          <li>Sign in to your Google account and grant permissions</li>
          <li>You'll be redirected back with an account_id</li>
          <li>The dashboard will automatically detect the account_id and enable Gmail operations</li>
        </ol>
      </div>
    </div>
  );
}
