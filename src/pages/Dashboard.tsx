import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';

const Dashboard: React.FC = () => {
  const links = [
    { title: 'Chatbot', path: '/chat', description: 'Ask AI questions and get SQL responses' },
    { title: 'Schema Explorer', path: '/schema', description: 'Browse tables and columns from the database' },
    { title: 'File Uploads', path: '/files', description: 'Upload and analyze CSV/Excel files' },
    { title: 'Logs', path: '/logs', description: 'View question logs and results' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Data Assistant Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link to={link.path} key={link.path} className="hover:shadow-md transition">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{link.title}</h2>
                <p className="text-sm text-gray-600">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
