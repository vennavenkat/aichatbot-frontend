import api from './api';

export const uploadFile = (formData: FormData) => api.post('/files/upload', formData);
export const fetchFileList = () => api.get('/file/list');
export const fetchFileColumns = (fileName: string) => api.get(`/files/columns/${fileName}`);
export const fetchFileData = (fileName: string) => api.get(`/filedata/${fileName}`);
