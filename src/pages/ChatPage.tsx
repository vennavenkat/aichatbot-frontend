import React, { useEffect, useState } from 'react';
import ChatInput from '../components/ChatInput';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import ChartRenderer from '../components/ChartRenderer';
import axios from '../services/api';

interface AskResponse {
    answer: string;
    generatedSql: string;
    resultData?: Record<string, any>[];
}


const ChatPage: React.FC = () => {
    const [response, setResponse] = useState<AskResponse | null>(null);
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [base64Chart, setBase64Chart] = useState<string | null>(null);
    const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (response?.resultData?.length) {
            const cols = Object.keys(response.resultData[0]);
            setColumns(cols);
            setSelectedColumn(cols[0]);
        }
    }, [response]);

    const generateChart = async () => {
        if (!response || !response.resultData || !selectedColumn) return;

        const labels = response.resultData.map((_, i) => `Row ${i + 1}`);
        const values = response.resultData.map(row => Number(row[selectedColumn]) || 0);

        try {
            setIsLoading(true); // start spinner

            const res = await axios.post('/api/v1/chart', {
                chartType,
                labels,
                values
            });

            setBase64Chart(res.data.imageBase64 || res.data);
        } catch (err) {
            console.error('Chart generation failed:', err);
            alert('Failed to generate chart. Check your input data.');
        } finally {
            setIsLoading(false); // stop spinner
        }
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">AI Chat Interface</h1>

            <ChatInput onResponse={(res) => {
                setResponse(res);
                setBase64Chart(null); // reset chart
            }} />

            {response && (
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <p><strong>Answer:</strong> {response.answer}</p>
                        </CardContent>
                    </Card>

                    {response.generatedSql && (
                        <Card>
                            <CardContent className="p-4 text-sm text-gray-700 bg-gray-50 rounded">
                                <pre><code>{response.generatedSql}</code></pre>
                            </CardContent>
                        </Card>
                    )}

                    {response.resultData && response.resultData.length > 0 && (
                        <Card>
                            <CardContent className="overflow-auto">
                                <table className="table-auto w-full border border-collapse text-sm">
                                    <thead>
                                        <tr>
                                            {Object.keys(response.resultData[0]).map((col) => (
                                                <th key={col} className="border p-2 bg-gray-100">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {response.resultData.map((row, idx) => (
                                            <tr key={idx}>
                                                {Object.values(row).map((val, i) => (
                                                    <td key={i} className="border p-2">{val as string}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    )}

                    {columns.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="font-medium">Select Chart Column:</label>
                                    <select
                                        value={selectedColumn}
                                        onChange={(e) => setSelectedColumn(e.target.value)}
                                        className="ml-2 border rounded px-2 py-1"
                                    >
                                        {columns.map((col) => (
                                            <option key={col} value={col}>{col}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="font-medium">Chart Type:</label>
                                    <select
                                        value={chartType}
                                        onChange={(e) => setChartType(e.target.value as any)}
                                        className="ml-2 border rounded px-2 py-1"
                                    >
                                        <option value="bar">Bar</option>
                                        <option value="line">Line</option>
                                        <option value="pie">Pie</option>
                                    </select>
                                </div>

                                <Button onClick={generateChart}>Generate Chart</Button>
                                {isLoading && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-blue-600 font-medium">Generating chart...</span>
                                    </div>
                                )}
                                <Button onClick={generateChart} disabled={isLoading}>
                                    {isLoading ? 'Generating...' : 'Generate Chart'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {base64Chart && (
                        <div>
                            <h3 className="mt-4 mb-2 font-semibold">Chart Preview:</h3>
                            <ChartRenderer base64Image={base64Chart} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatPage;
