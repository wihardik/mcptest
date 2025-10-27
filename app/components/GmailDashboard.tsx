'use client';

import { useState, useEffect } from 'react';
import AuthenticationFlow from './AuthenticationFlow';
import EmailOperations from './EmailOperations';
import ConnectionStatus from './ConnectionStatus';

interface GmailDashboardProps {}

export default function GmailDashboard({}: GmailDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const savedAccountId = localStorage.getItem('gmail_account_id');
    if (savedAccountId) {
      setAccountId(savedAccountId);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (newAccountId: string) => {
    setAccountId(newAccountId);
    setIsAuthenticated(true);
    localStorage.setItem('gmail_account_id', newAccountId);
    setError(null);
  };

  const handleLogout = () => {
    setAccountId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gmail_account_id');
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <ConnectionStatus 
        isAuthenticated={isAuthenticated}
        accountId={accountId}
        onLogout={handleLogout}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setError(null)}
                  className="text-sm bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isAuthenticated ? (
        <AuthenticationFlow 
          onAuthSuccess={handleAuthSuccess}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <EmailOperations 
          accountId={accountId!}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
