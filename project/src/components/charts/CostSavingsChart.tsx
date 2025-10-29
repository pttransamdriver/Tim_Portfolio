import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CostData {
  name: string;
  value: number;
}

const COLORS = ['#3b82f6', '#10b981']; // Blue for cost, Green for savings

const CostSavingsChart: React.FC = () => {
  const [data, setData] = useState<CostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/data/Cost_Savings_Piechart.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.trim().split('\n');
        const parsedData: CostData[] = [];

        // Skip header row and parse data
        for (let i = 1; i < lines.length; i++) {
          const [label, value] = lines[i].split(',');
          parsedData.push({
            name: label.trim(),
            value: parseFloat(value)
          });
        }

        setData(parsedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading chart data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
      </div>
    );
  }

  // Calculate ROI
  const toolCost = data.find(d => d.name === 'Monthly Tool Cost')?.value || 0;
  const timeSaved = data.find(d => d.name === 'Time Value Saved')?.value || 0;
  const roi = toolCost > 0 ? (timeSaved / toolCost).toFixed(1) : '0';

  return (
    <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Monthly Cost vs Value: ROI Analysis
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `$${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-gray-900 dark:text-gray-100">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center md:text-left">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Return on Investment</p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{roi}x</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              For every $1 spent, you save ${roi} in time value
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSavingsChart;
