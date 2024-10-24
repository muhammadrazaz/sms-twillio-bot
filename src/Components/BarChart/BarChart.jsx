import React from 'react';
import Chart from 'react-apexcharts';

export default function BarChart() {
    const chartData = {
        series: [
          {
            name: 'Sales',
            data: [30, 40, 35],
          },
        ],
        options: {
          chart: {
            type: 'bar',
            toolbar: {
                show: false
              },
          },
          
          plotOptions: {
            bar: {
              horizontal: true, // Set to true for horizontal bars
            },
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            categories: [
              'Product A',
              'Product B',
              'Product C',
            ],
          },
         
          tooltip: {
            shared: true,
            intersect: false,
          },
        },
      };
    
      return (
     
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height="100%"
          />
       
      );
}
