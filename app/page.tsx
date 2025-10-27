'use client';

import { useState, useEffect } from 'react';
import GmailDashboard from './components/GmailDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Gmail Integration Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test and manage your Gmail integration functionality
          </p>
        </header>
        
        <GmailDashboard />
      </div>
    </div>
  );
}

