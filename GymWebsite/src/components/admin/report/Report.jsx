import React from 'react';
import MembershipPieChart from './MembershipPieChart';
import BarGraph from './BarGraph';


function Report() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className='bg-gray-200 rounded-lg '>
            <div>
                <h1 className='text-2xl font-bold text-center'>Membership Distribution</h1>
            </div>
            <div className='flex items-center justify-center'>
            <MembershipPieChart />
            </div>
        
        </div>
        <div className='bg-gray-200 rounded-lg  '>
            <div>
                <h1 className='text-2xl font-bold text-center'>Membership Distribution</h1>
            </div >
            <div className='flex items-center justify-center my-20'>
            <BarGraph />
            </div>
        
        </div>
        
       
      
       
      </div>
    </div>
  );
}

export default Report;
