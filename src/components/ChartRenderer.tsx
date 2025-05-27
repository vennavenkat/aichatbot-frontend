import React, { useState } from 'react';
import axios from '../services/api';

interface ChartRequest {
  chartType: 'bar' | 'line' | 'pie';
  labels: string[];
  values: number[];
}

interface ChartRendererProps {
  base64Image?: string; // Optional prop for direct rendering
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ base64Image }) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [labels, setLabels] = useState<string>('A,B,C,D');
  const [values, setValues] = useState<string>('10,20,30,40');
  const [generatedChart, setGeneratedChart] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateChart = async () => {
    try {
      const requestPayload: ChartRequest = {
        chartType,
        labels: labels.split(',').map(label => label.trim()),
        values: values.split(',').map(val => parseFloat(val.trim()))
      };

      const res = await axios.post('/api/v1/chart', requestPayload);
      console.log('Chart API response:', res.data);

      // Fix: use base64Image instead of imageBase64
      const imageString =
        typeof res.data === 'string'
          ? res.data
          : res.data.base64Image || '';

      if (!imageString) throw new Error('Invalid chart response format');

      setGeneratedChart(imageString);
      setError(null);
    } catch (err) {
      console.error('Chart generation error:', err);
      setError('Failed to generate chart. Please check your data.');
    }
  };

  if (base64Image) {
    return (
      <div className="mt-4">
        <img
          src={`data:image/png;base64,${base64Image}`}
          alt="Generated Chart"
          className="border rounded shadow max-w-full"
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Chart Generator</h2>

      <div className="space-y-2">
        <label className="block font-medium">
          Chart Type:
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </label>

        <label className="block font-medium">
          Labels (comma-separated):
          <input
            type="text"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <label className="block font-medium">
          Values (comma-separated):
          <input
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <button
          onClick={generateChart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Chart
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {generatedChart && (
        <div>
          <h3 className="mt-4 mb-2 font-semibold">Preview:</h3>
          <img
            src={`data:image/png;base64,${generatedChart}`}
            alt="Generated Chart"
            className="border rounded shadow max-w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChartRenderer;
