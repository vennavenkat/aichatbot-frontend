// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SchemaPage from './pages/SchemaPage';
import FilePage from './pages/FilePage';
import ChatPage from './pages/ChatPage';
// import LogsPage from './pages/LogsPage';
// import { NavLink } from 'react-router-dom';
// import NotFoundPage from './pages/NotFoundPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="flex space-x-6">
            <NavLink to="/" className="hover:underline">Dashboard</NavLink>
            <NavLink to="/schema" className="hover:underline">Schema</NavLink>
            <NavLink to="/files" className="hover:underline">Files</NavLink>
            <NavLink to="/chat" className="hover:underline">Chat</NavLink>
            <NavLink to="/logs" className="hover:underline">Logs</NavLink>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schema" element={<SchemaPage />} />
            <Route path="/files" element={<FilePage />} />
            <Route path="/chat" element={<ChatPage />} />
            {/* <Route path="/logs" element={<LogsPage />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
