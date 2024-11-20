import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import GlobalContext from "../../context/GlobalContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const MembershipPieChart = () => {
  const { membersType } = useContext(GlobalContext);

  const data = [
 
    { name: "Premium", value: membersType.premium },
    { name: "Basic", value: membersType.basic },
    { name: "Standard", value: membersType.standard },
  ];

  return (
      
    
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      
  );
};

export default MembershipPieChart;
