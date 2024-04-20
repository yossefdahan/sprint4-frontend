import React, { useEffect, useState } from 'react';
import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bubble, Doughnut } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export function MyChart({ orders }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Order Status',
            data: [],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
                '#f1f1f1ab',
                '#f1f1f1ab',
                '#f1f1f1ab',
            ],

            borderWidth: 1,
        }],
    })

    useEffect(() => {
        const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1
            return acc
        }, {})

        setChartData({
            labels: Object.keys(statusCounts),
            datasets: [{
                ...chartData.datasets[0],
                data: Object.values(statusCounts),
            }],
        })
    }, [orders]);

    return <div className='chart  '>
        <Pie className="pie  " data={chartData} style={{ maxWidth: '150px', maxHeight: '150px' }} />
    </div>
}
