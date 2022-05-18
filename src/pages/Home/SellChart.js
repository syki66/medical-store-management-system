import React, {useContext, useEffect} from "react";
import {HomeContext} from "../../components/SideDrawer";

import styled from 'styled-components'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function SellChart() {
    const { homeData } = useContext(HomeContext)

    return (
        <SellChartDiv>
            <ChartTitle>
                <h3>Total Sell Chart of Medicine</h3>
            </ChartTitle>
            <div>
                <LineChart
                    width={620}
                    height={300}
                    data={homeData.bill_total_sell}
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