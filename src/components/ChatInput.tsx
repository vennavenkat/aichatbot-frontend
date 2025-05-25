import React, { useState } from 'react';
import api from '../services/api';

interface AskResponse {
  answer: string;
  generatedSql: string;
  resultData?: Record<string, any>[];
}

interface ChatInputProps {
  onResponse: (response: AskResponse) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onResponse, isLoading = false }) => {
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form reload
    if (!question.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/ask', { question });

      if (res.status === 200 && res.data) {
        const data = res.data;

        // Fallback if 'answer' is empty
        if (!data.answer && data.generatedSql) {
          data.answer = 'SQL generated successfully. See below.';
        }

        onResponse(data);
      } else {
        console.error('Unexpected response:', res);
        alert('Failed to get a proper response from the server.');
      }
    } catch (err) {
      console.error('Failed to send question:', err);
      alert('Failed to send question. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about your data..."
        className="flex-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none"
        disabled={isLoading || submitting}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        disabled={isLoading || submitting}
      >
        {submitting ? 'Asking...' : 'Ask'}
      </button>
    </form>
  );
};

export default ChatInput;
