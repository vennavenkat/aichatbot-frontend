import api from './api';

export const fetchSchema = () => api.get('/schema');
export const fetchTables = () => api.get('/tables');
export const fetchColumns = (tableName: string) => api.get(`/columns/${tableName}`);
