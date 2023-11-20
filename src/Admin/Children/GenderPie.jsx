import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { dataContext } from "../../ContexProvider/MyContext";
import axios from "axios";

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function GenderPie() {
  const {
    currentUserData,
    localRoutePrefix,
    access_token,
    runPieChart,
    setRunPieChart,
    hostedRoutPrefix,
  } = useContext(dataContext);
  const [genderPiechart, setGenderPiechart] = useState([]);
  useEffect(() => {
    axios
      .get(`${localRoutePrefix}/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // console.log(" user----->", res.data);
        setGenderPiechart(res.data);
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, []);
  let femalesCount = 0;
  let malesCount = 0;
  let othersCount = 0;

  // Iterate through the array and count genders
  genderPiechart.forEach((item) => {
    const gender = item.gender.toLowerCase(); // Ensure case-insensitivity
    if (gender === "male") {
      malesCount++;
    } else if (gender === "female") {
      femalesCount++;
    } else {
      othersCount++;
    }
  });
  const gender_data = [
    { name: "Male", value: femalesCount },
    { name: "Female", value: malesCount },
    { name: "Other", value: othersCount },
  ];
  // console.log(gender_data);
  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Gender </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={gender_data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {gender_data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
