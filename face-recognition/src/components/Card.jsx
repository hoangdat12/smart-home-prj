import React from 'react';

const Card = ({ Icon, title, value }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-28 p-4 bg-white border border-gray-300 rounded-lg shadow'>
      <Icon className='text-2xl text-gray-700 mb-2' />
      <span className='text-sm font-semibold text-gray-700'>{title}</span>
      <span className='text-lg font-bold text-gray-800'>{value}</span>
    </div>
  );
};

export default Card;
