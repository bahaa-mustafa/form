'use client';

import React, { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`
                flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200
                ${
                  activeTab === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }
              `}
              aria-pressed={activeTab === 'login'}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`
                flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200
                ${
                  activeTab === 'register'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }
              `}
              aria-pressed={activeTab === 'register'}
            >
              Register
            </button>
          </div>

          {/* Form Container with Animation */}
          <div className="relative min-h-[400px]">
            <div
              className={`
                transition-all duration-300 ease-in-out
                ${
                  activeTab === 'login'
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4 absolute inset-0 pointer-events-none'
                }
              `}
            >
              <LoginForm
                onSwitchToRegister={() => setActiveTab('register')}
              />
            </div>
            <div
              className={`
                transition-all duration-300 ease-in-out
                ${
                  activeTab === 'register'
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
                }
              `}
            >
              <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </main>
  );
}

