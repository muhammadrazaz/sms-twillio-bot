import React from 'react';
import Chart from 'react-apexcharts';

export default function BarChart(props) {
    const chartData = {
        series: [
          {
            name: props.name,
            data: props.data.data,
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
            categories: props.data.label,
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
