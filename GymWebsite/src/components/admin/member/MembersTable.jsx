import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
import { FaPenToSquare } from "react-icons/fa6";




function MembersTable({ searchQuery, onEdit}) {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { fetchMembersCount } = useContext(GlobalContext);

 
  const deleteMember = async (id) => {
    console.log('Deleting member with id:', id);  
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/members/delete/${id}`);
      if (response.status === 200) {
        const updatedMembers = members.filter((member) => member.memberId !== id);
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        fetchMembersCount();
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };



  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/members/get');
        console.log('Data fetched:', response.data.data);
        setMembers(response?.data?.data || []);
        setFilteredMembers(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMembers([]);
        
        setFilteredMembers([]);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = members.filter(member => 
        member.name.toLowerCase().includes(lowerCaseQuery) ||
        member.email.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchQuery, members]);


  return (
    <div>
      <div className="overflow-x-auto shadow-lg rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membership Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.memberId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.memberId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {member.email}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {member.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.address}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {format(new Date(member.dateOfBirth), 'MM/dd/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.membershipType.typeName}
                </td>
                <td className="px-6 py-4 ">
                  {format(new Date(member.membershipStartDate), 'MM/dd/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(member.membershipEndDate), 'MM/dd/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className='pl-0' onClick={()=>onEdit(member)}><FaPenToSquare/></button>
                  <button className="pl-4" onClick={()=> deleteMember(member.memberId)}><MdDelete className='text-red-600 text-xl'/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersTable;
