import React from 'react';
import {chartType} from "./Metrics";
import {Bar} from "react-chartjs-2";

type chartDataType = {
    data: chartType[];
    label: string;
    border: string;
    bgc: string;
}

export const Chart:React.FC<chartDataType> = ({data, label, bgc, border}) => {

    const getData = () => {
        return {labels: data.map(d => new Date(d.date).toDateString()),
            datasets: [
            {
                label,
                fill: false,
                lineTension: 0.5,
                backgroundColor: bgc,//'rgba(75, 192, 192, .4)',
                borderColor: border, //'rgba(75, 192, 192, 1)'
                borderWidth: 2,
                data: data.map(d => d.count)
            }
        ]}
    }

    return (
        <div style={{width: '100%'}}>
            <Bar
                data={getData()}
            />
        </div>
    );
};
