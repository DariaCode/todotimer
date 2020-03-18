import React from 'react';
import {Bar as BarChart} from 'react-chartjs';  

const Sendings_buckets = {
    'Cheap': {
        min: 0,
        max: 2.1
    },
    'Normal': {
        min: 2.1,
        max: 21
    },
    'Expensive': {
        min: 21,
        max: 1000
    }
};

const sendingsChart = props => {
    const chartData = { labels: [], datasets: []};
    let values = [];
    for (const bucket in Sendings_buckets) {
        const filteredSendingsCount = props.sendings.reduce((prev, current) => {
            if (current.task.price > Sendings_buckets[bucket].min && current.task.price < Sendings_buckets[bucket].max){
                return prev +1;
            } else {
                return prev;
            }
        }, 0);
        values.push(filteredSendingsCount);
        chartData.labels.push(bucket);
        chartData.datasets.push({
           // label: "My First Dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: values
        });
        values = [...values];
        values[values.length -1] = 0;
    }
    return ( 
        <div style={{textAlign: 'center'}}>
        <BarChart data={chartData} />
        </div>
     );
}
 
export default sendingsChart;