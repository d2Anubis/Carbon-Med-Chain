import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './styles.css'; // Import CSS file

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

Chart.register(...registerables);

const ChartComponent = ({ data, options }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    myChartRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      myChartRef.current.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
