// PieChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = () => {
  const chartData = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Apples', 'Oranges', 'Bananas', 'Berries', 'Grapes'],
      colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019'],
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
   
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height="100%"
      />
 
  );
};

export default PieChart;
