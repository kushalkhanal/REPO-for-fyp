import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GlobalContext from "../../context/GlobalContext";

const BarGraph = () => {
  const { totalSalary, totalMembershipPrice } = useContext(GlobalContext);

  const data = [
    {
      name: 'Comparison',
      Expense: totalSalary,
      Income: totalMembershipPrice,
    },
  ];

  return (
    
   
    
        <BarChart width={300} height={329} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Expense" fill="#8884d8" />
          <Bar dataKey="Income" fill="#82ca9d" />
        </BarChart>
     
   
  );
};

export default BarGraph;
