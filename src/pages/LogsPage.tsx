import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { Card, CardContent } from '../components/ui/card';

interface ChatLog {
  id: number;
  question: string;
  response: string;
  generatedSql: string;
  timestamp: string;
}

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/logs')
      .then(res => setLogs(res.data))
      .catch(() => alert('Failed to fetch logs'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Chat Logs</h2>
      {loading && <p className="text-gray-500">Loading logs...</p>}

      {logs.map(log => (
        <Card key={log.id}>
          <CardContent className="p-4 space-y-2">
            <div><strong>Q:</strong> {log.question}</div>
            <div><strong>A:</strong> {log.response}</div>
            {log.generatedSql && (
              <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto"><code>{log.generatedSql}</code></pre>
            )}
            <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LogsPage;
