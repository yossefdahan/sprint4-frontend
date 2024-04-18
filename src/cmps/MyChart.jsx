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
                'rgba(54, 262, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                '#ff385c',
            ],
            borderColor: [
                '#d7d6d6',
                '#d7d6d6',
                'rgba(255, 206, 86, 1)',
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

    return <div className='chart'>
        <Pie className="pie flex  " data={chartData} style={{ maxWidth: '150px', maxHeight: '150px' }} />
    </div>
}
