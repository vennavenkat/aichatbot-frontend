// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SchemaPage from './pages/SchemaPage';
import FilePage from './pages/FilePage';
import ChatPage from './pages/ChatPage';
import './index.css';

import LogsPage from './pages/LogsPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        {/* Header Navigation */}
        <header className="bg-blue-700 dark:bg-gray-950 text-white px-6 py-4 shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">AI Data Query Dashboard</h1>
            <nav className="flex gap-6 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'font-semibold underline' : ''}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/schema"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'font-semibold underline' : ''}`
                }
              >
                Schema
              </NavLink>
              <NavLink
                to="/files"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'font-semibold underline' : ''}`
                }
              >
                Files
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'font-semibold underline' : ''}`
                }
              >
                Chat
              </NavLink>
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'font-semibold underline' : ''}`
                }
              >
                Logs
              </NavLink>
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="ml-4 flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition border border-gray-300 dark:border-gray-700"
                aria-label="Toggle dark mode"
                type="button"
              >
                {darkMode ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71" /></svg>
                )}
                <span className="ml-2 text-xs hidden sm:inline">{darkMode ? 'Dark' : 'Light'} Mode</span>
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schema" element={<SchemaPage />} />
            <Route path="/files" element={<FilePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
