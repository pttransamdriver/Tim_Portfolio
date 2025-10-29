import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface TaskData {
  task: string;
  before: number;
  after: number;
  saved: number;
}

const HoursSavingsChart: React.FC = () => {
  const [data, setData] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/data/Hours_Savings_Barchart.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.trim().split('\n');
        const parsedData: TaskData[] = [];

        // Skip header row and parse data
        for (let i = 1; i < lines.length; i++) {
          const [task, before, after] = lines[i].split(',');
          const beforeHours = parseFloat(before);
          const afterHours = parseFloat(after);
          parsedData.push({
            task: task.trim(),
            before: beforeHours,
            after: afterHours,
            saved: beforeHours - afterHours
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

  // Calculate total hours saved
  const totalSaved = data.reduce((sum, item) => sum + item.saved, 0).toFixed(1);
  const percentageSaved = data.length > 0
    ? ((data.reduce((sum, item) => sum + item.saved, 0) /
        data.reduce((sum, item) => sum + item.before, 0)) * 100).toFixed(0)
    : '0';

  return (
    <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Time Savings Across Common Development Tasks
      </h3>

      <div className="mb-4 flex flex-wrap gap-4 justify-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours Saved</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalSaved}h</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency Gain</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{percentageSaved}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="task"
            angle={-15}
            textAnchor="end"
            height={80}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip
            formatter={(value: number) => `${value} hours`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              if (value === 'before') return 'Before Agentic Coding';
              if (value === 'after') return 'After Agentic Coding';
              return value;
            }}
          />
          <Bar dataKey="before" fill="#ef4444" name="before" radius={[8, 8, 0, 0]} />
          <Bar dataKey="after" fill="#10b981" name="after" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4 italic">
        Based on average task completion times over 6 months of daily use
      </p>
    </div>
  );
};

export default HoursSavingsChart;
