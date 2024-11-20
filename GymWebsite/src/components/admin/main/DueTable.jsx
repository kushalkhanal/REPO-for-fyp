import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

function DueTable() {
  const [dues, setDue] = useState([]);
  

  useEffect(() => {
    const fetchDue = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/due");
        console.log("Data fetched:", response.data);
        setDue(response?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDue([]);
      }
    };

    fetchDue();
  }, []);
  return (
    <div>
      <h2 className="text-black">Due Members</h2>
      <table>
        <thead className="border-t-2 border-b-2">
          <tr className="">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {dues.map((due) => (
            <tr key={due.memberId}>
              <td className="text-black px-6 py-4 whitespace-nowrap">
                {due.memberId}
              </td>
              <td className="text-black px-6 py-4 whitespace-nowrap">
                {due.name}
              </td>
              <td className="text-black px-6 py-4 whitespace-nowrap">
                {due.email}
              </td>
              <td className="text-black px-6 py-4 whitespace-nowrap">
                {format(new Date(due.membershipStartDate), "MM/dd/yyyy")}
              </td>
              <td className="text-black px-6 py-4 whitespace-nowrap">
                {format(new Date(due.membershipEndDate), "MM/dd/yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DueTable;
