import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CO2BreakdownStackedBarChart = ({ data }) => {
  // Prepare the chart data
  const chartData = {
    labels: data.map(item => item.DeviceName),
    datasets: [
      {
        label: 'Manufacturing CO2',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: data.map(item => item.ManufacturingCO2),
      },
      {
        label: 'Transport CO2',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: data.map(item => item.TransportCO2),
      },
      {
        label: 'Usage CO2',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: data.map(item => item.UsageCO2),
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Device Name',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'CO2 Emission (kg)',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CO2BreakdownStackedBarChart;
