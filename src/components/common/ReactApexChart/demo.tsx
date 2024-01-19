"use client";
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexcharts from ".";
import { useTheme } from "@mui/material";

type Props = {};

const DemoChart = (props: Props) => {
  const theme = useTheme();
  const [netProfit, setNetProfit] = useState({
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    color: "#FF9843",
  });

  const [revenue, setRevenue] = useState({
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    color: "#9ADE7B",
  });

  const [freeCashFlow, setFreeCashFlow] = useState({
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    color: "#4CB9E7",
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  return <ReactApexcharts type="bar" height={400} options={options} series={[netProfit, revenue, freeCashFlow]} />;
};

export default DemoChart;
