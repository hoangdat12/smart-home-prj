import React from 'react';
import { getFullNameUser } from '../ultils';

const AccountCard = ({ user }) => {
  return (
    <div className=' min-h-[170px]'>
      <div className='flex flex-col items-center h-full bg-white border rounded shadow-lg overflow-hidden p-4'>
        <div className='rounded-full h-24 w-24 flex items-center justify-center bg-gray-300 mx-auto mb-4 overflow-hidden'>
          <img
            src={user?.image}
            alt=''
            className='object-cover w-full h-full'
          />
        </div>
        <div className='font-bold text-xl mb-2 h-[56px]'>
          {getFullNameUser(user)}
        </div>
        <div className='flex gap-2 text-sm'>
          <button className='bg-transparent hover:bg-red-500 text-blue-dark rounded-lg font-semibold px-2 py-1 hover:text-white border border-blue hover:border-transparent '>
            Delete
          </button>
          <button className='bg-transparent hover:bg-blue-500 text-blue-dark rounded-lg font-semibold px-2 py-1 hover:text-white border border-blue hover:border-transparent '>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
