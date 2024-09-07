import React from 'react';

const HistoryAction = ({ history }) => {
  return (
    <div className='w-full flex justify-between items-center rounded-lg h-[50px] px-4 bg-white mt-6'>
      <div className='flex items-center justify-start gap-4'>
        <div className='rounded-full h-[60px] w-[60px] bg-gray-300'></div>
        <div>
          <h1 className='text-xl font-medium'>Hoang Dat</h1>
          <p className='text-sm'>20/04/2005</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryAction;
