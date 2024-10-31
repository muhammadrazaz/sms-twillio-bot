// LineChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = (props) => {
  const chartData = {
    series: [
      {
        name: 'Leads',
        data: props.data.data,
        fill: {
            opacity: 0.2, // Set the opacity for the shaded area
          },
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
            show: false
          }
      },
      
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        type: 'solid', // Fill type can be 'solid', 'gradient', etc.
        opacity: 0.2, // Set the opacity for the shaded area
      },
      xaxis: {
        categories: props.data.label,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (

     
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height='100%' 
      />

  );
};

export default LineChart;
