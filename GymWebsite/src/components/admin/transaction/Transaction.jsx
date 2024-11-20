import React, { useState, useEffect } from "react";
import axios from "axios";

function Transaction() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    onSearch(searchValue);
  };

  const onSearch = (searchValue) => {
    if (searchValue === "") {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter((member) =>
          member.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/members/get");
        const data = response?.data?.data || [];
        console.log("Data fetched:", data);
        setMembers(data);
        setFilteredMembers(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setMembers([]);
        setFilteredMembers([]); // Handle error state
      }
    };

    fetchMembers();
  }, []);

  function generateRandomId() {
    return Math.random().toFixed(5).toString().split(".")[1];
  }

  return (
    <div>
      <h2 className="mx-6 font-bold text-4xl">Transaction</h2>
      <div className="mx-6">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search here"
          className="w-[40%] p-2 mb-4 border rounded-lg border-gray-400 bg-slate-100"
        />
      </div>

      <div className="md:flex-row m-6">
        {filteredMembers.map((member) => (
          <div
            key={member.memberId}
            className="bg-white shadow-md rounded-lg  p-6 mb-4 grid grid-cols-3 gap-2 justify-around  md:flex flex-row"
          >
            <div>
              <div className="font-bold text-lg ">Transaction Id</div>
              <div className="font-medium">{generateRandomId()}</div>
            </div>

            <div>
              <div className='font-bold text-lg '>Name</div>
              <div className="font-medium">{member.name}</div>
            </div>
            <div>
              <div className='font-bold text-lg '>Package</div>
              <div className="font-medium">{member.membershipType.typeName}</div>
            </div>
            <div>
              <div className='font-bold text-lg '>TotalPrice</div>
              <div className="font-medium">{member.membershipType.price}</div>
            </div>
            <div className='font-bold text-lg '>
              <div>Start date</div>
              <div className="font-medium">{member.membershipStartDate}</div>
            </div>
            <div>
              <div className='font-bold text-lg '>End date</div>
              <div className="font-medium">{member.membershipEndDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;
