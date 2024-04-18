import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function SalesChart({ orders }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales Per Month',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,

      },
    ],
  });

  useEffect(() => {
    const salesData = orders.reduce((acc, order) => {
      const date = new Date(order.startDate);
      const yearMonth = `${String(date.getMonth() + 1).padStart(2, '0')} / ${date.getFullYear()}`;
      acc[yearMonth] = (acc[yearMonth] || 0) + order.totalPrice;
      return acc;
    }, {});

    const sortedLabels = Object.keys(salesData).sort();
    const sortedData = sortedLabels.map(label => salesData[label]);

    setChartData({
      labels: sortedLabels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: sortedData,
        },
      ],
    });
  }, [orders]);

  return (
    <div className='sales-chart'>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
}
