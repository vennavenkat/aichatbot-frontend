import React, { useEffect, useState } from 'react';
import axios from '../services/api';

interface Column {
  columnName: string;
  dataType: string;
}

interface SchemaEntry {
  tableName: string;
  columns: Column[];
}

const SchemaExplorer: React.FC = () => {
  const [schema, setSchema] = useState<SchemaEntry[]>([]);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await axios.get<SchemaEntry[]>('/schema');
        setSchema(res.data);
      } catch (err) {
        console.error('Failed to fetch schema:', err);
      }
    };
    fetchSchema();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Database Schema</h2>
      {schema.map((entry) => (
        <div key={entry.tableName} className="mb-6">
          <h3 className="text-md font-bold text-blue-600 mb-2">{entry.tableName}</h3>
          <table className="table-auto w-full text-sm border border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100">Column</th>
                <th className="border p-2 bg-gray-100">Type</th>
              </tr>
            </thead>
            <tbody>
              {entry.columns.map((col) => (
                <tr key={col.columnName}>
                  <td className="border p-2">{col.columnName}</td>
                  <td className="border p-2 text-gray-600">{col.dataType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SchemaExplorer;
