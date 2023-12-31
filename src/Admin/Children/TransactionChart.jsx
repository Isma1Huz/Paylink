import React, { useEffect, useState, useContext } from "react";
import { dataContext } from "../../ContexProvider/MyContext";

import axios from "axios";
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Expense: 4000,
    Income: 2400,
  },
  {
    name: "Feb",
    Expense: 3000,
    Income: 1398,
  },
  {
    name: "Mar",
    Expense: 2000,
    Income: 9800,
  },
  {
    name: "Apr",
    Expense: 2780,
    Income: 3908,
  },
  {
    name: "May",
    Expense: 1890,
    Income: 4800,
  },
  {
    name: "Jun",
    Expense: 2390,
    Income: 3800,
  },
  {
    name: "July",
    Expense: 3490,
    Income: 4300,
  },
  {
    name: "Aug",
    Expense: 2000,
    Income: 9800,
  },
  {
    name: "Sep",
    Expense: 2780,
    Income: 3908,
  },
  {
    name: "Oct",
    Expense: 1890,
    Income: 4800,
  },
  {
    name: "Nov",
    Expense: 2390,
    Income: 3800,
  },
  {
    name: "Dec",
    Expense: 3490,
    Income: 4300,
  },
];

export default function TransactionChart() {
  const [transactionsAnalytic, setTransactionsAnalytic] = useState([]);
  const {
    localRoutePrefix,
    hostedRoutPrefix,
    setTalTransactions,
    totalTransactions,
  } = useContext(dataContext);

  //-----------------------------------fet the transacions data
  useEffect(() => {
    axios
      .get(`${localRoutePrefix}/transaction/all_transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        //   console.log(" user----->", res.data);
        setTransactionsAnalytic(res.data);
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, []);
  //   const analytics = transactionsAnalytic.map(transaction=>{
  // 	  return transaction.category
  // 	})
  // 	console.log(analytics);

  const categoryInfoMap = new Map();

  // Iterate through the transactions
  for (const transaction of transactionsAnalytic) {
    const { amount, category } = transaction;
    const { type } = category;

    if (categoryInfoMap.has(type)) {
      // If the category exists in the map, update its information
      const categoryInfo = categoryInfoMap.get(type);
      categoryInfo.amount += amount;
      categoryInfo.users += 1;
    } else {
      // If the category doesn't exist in the map, create a new entry
      categoryInfoMap.set(type, {
        category: type,
        amount: amount,
        users: 1,
      });
    }
  }

  // Convert the map values into an array of objects
  const categoryInfoArray = Array.from(categoryInfoMap.values());

  //   console.log(categoryInfoArray);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Category VS amount</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={categoryInfoArray}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// <ResponsiveContainer width="100%" height="100%">
//   <BarChart
//     width={500}
//     height={300}
//     data={categoryInfoArray}
//     margin={{
//       top: 20,
//       right: 10,
//       left: -10,
//       bottom: 0,
//     }}
//   >
//     <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
//     <XAxis dataKey="category" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//     <Bar dataKey="amount" fill="#0ea5e9" />
//     <Bar dataKey="users" fill="#ea580c" />
//   </BarChart>
// </ResponsiveContainer>
