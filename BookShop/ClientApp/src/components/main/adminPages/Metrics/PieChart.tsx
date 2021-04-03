import React from 'react';
import {getBGColors} from "../../../units/consts/consts";
import {Pie} from "react-chartjs-2";
import {chartType} from "./Metrics";

type pieChartType = {
    data: chartType[];
    label?: string;
    border?: string;
    bgc?: string;
}

const bgColors = ['rgba(31, 97, 141, 1)', 'rgba(17, 122, 101, 1)', 'rgba(160, 64, 0, 1)']

export const PieChart: React.FC<pieChartType> = ({data}) => {

    const pieData = () => {

        return {
            maintainAspectRatio: false,
            responsive: false,
            labels: ["usa", "europe", "africa"],
            datasets: [
                {
                    data: [200, 150, 20],
                    backgroundColor: bgColors,
                    hoverBackgroundColor: bgColors
                }
            ]
        }

    };

    return (
        <div>
            <Pie
                data={pieData()}
            />
        </div>
    );
};

