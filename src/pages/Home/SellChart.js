import React, {useEffect} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import styled from 'styled-components'

export default function SellChart(getHomeData) {
// useEffect(() => {
//     console.log('getHomeData', getHomeData.getHomeData[0].bill_total_sell)
// })
    return (
        <SellChartDiv>
            <ChartTitle>
                <h3>Total Sell Chart of Medicine</h3>
            </ChartTitle>
            <div>
                <LineChart
                    width={500}
                    height={300}
                    data={getHomeData.getHomeData[0].bill_total_sell}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="won" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </SellChartDiv>
    );
}

const SellChartDiv = styled.div`
    display: flex;
  flex-direction: column;
`

const ChartTitle = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 0;

`