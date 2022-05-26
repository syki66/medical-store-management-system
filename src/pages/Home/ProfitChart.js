import React, { useContext } from "react";
import { HomeContext } from "../../components/SideDrawer";

import styled from "styled-components";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function ProfitChart() {
    const { homeData } = useContext(HomeContext);

    return (
        <ProfitChartDiv>
            <ChartTitle>
                <h3>Total Profit Chart of Medicine</h3>
            </ChartTitle>
            <LineChart
                width={620}
                height={300}
                data={homeData.bill_profit}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="won"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ProfitChartDiv>
    );
}

const ProfitChartDiv = styled.div`
    display: flex;
    flex-direction: column;
    //width: 100%;
  margin-right: 3em;
`

const ChartTitle = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
`