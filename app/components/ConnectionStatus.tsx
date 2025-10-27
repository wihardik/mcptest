'use client';

interface ConnectionStatusProps {
  isAuthenticated: boolean;
  accountId: string | null;
  onLogout: () => void;
}

export default function ConnectionStatus({ 
  isAuthenticated, 
  accountId, 
  onLogout 
}: ConnectionStatusProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            isAuthenticated ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gmail Integration Status
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isAuthenticated ? 'Connected and ready' : 'Not connected'}
            </p>
          </div>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
          >
            Disconnect
          </button>
        )}
      </div>

      {isAuthenticated && accountId && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                Successfully Connected
              </h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <p><strong>Account ID:</strong> <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs">{accountId}</code></p>
                <p className="mt-1">You can now use all Gmail integration features.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Authentication Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>Please complete the Gmail authentication process below to access integration features.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Info */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">App ID:</span>
            <p className="text-gray-600 dark:text-gray-400 font-mono text-xs mt-1">
              68ff6086cc0a8f747a6ea82d
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Integration:</span>
            <p className="text-gray-600 dark:text-gray-400">Gmail (Google)</p>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Auth Method:</span>
            <p className="text-gray-600 dark:text-gray-400">OAuth 2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
