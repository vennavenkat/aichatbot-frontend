import React, { useEffect, useState } from 'react';
import FileUploader from '../components/FileUploader';
import axios from '../services/api';

interface FileSchemaDTO {
  fileName: string;
  columns: string[];
}

const FilePage: React.FC = () => {
  const [files, setFiles] = useState<FileSchemaDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get<FileSchemaDTO[]>('/file/list');
      setFiles(res.data);
    } catch (error) {
      console.error('Failed to fetch file list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">File Upload & Structure</h1>

      <FileUploader onUploadSuccess={fetchFiles} />

      <hr className="my-4" />

      <h2 className="text-lg font-semibold">Uploaded Files</h2>

      {loading ? (
        <p>Loading files...</p>
      ) : files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.fileName} className="border rounded p-3 shadow-sm bg-white">
              <h3 className="font-medium">{file.fileName}</h3>
                  <p className="text-sm text-gray-600">Columns: {file.columns.join(', ')}</p>
                  <a
                      href={`http://localhost:8080/api/v1/files/download/${file.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm mt-1 inline-block"
                  >
                      Download
                  </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilePage;
