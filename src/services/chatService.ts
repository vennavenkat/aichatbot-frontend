import api from './api';

export const askQuestion = async (question: string) => {
  const response = await api.post('/ask', { question });
  return response.data;
};

export const generateChart = (data: any) => api.post('/chart', data);
export const submitFeedback = (feedback: any) => api.post('/feedback', feedback);
export const fetchLogs = () => api.get('/logs');
export const checkHealth = () => api.get('/health');
