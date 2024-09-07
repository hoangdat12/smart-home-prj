import React from 'react';
import { CgEye } from 'react-icons/cg';
import { formatDateForServer, getHistoryDate } from '../ultils';
import { useNavigate } from 'react-router-dom';

const HistoryCard = ({ historyDetail, activeDay }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(
      `/history/user?deviceId=${historyDetail?.id}&userId=${
        historyDetail?.employee_information?.id
      }&date=${formatDateForServer(activeDay)}`,
      {
        state: {
          user: historyDetail?.employee_information,
        },
      }
    );
  };

  return (
    <div>
      <div className='w-full flex justify-between rounded-lg items-center bg-white p-3'>
        <div className='flex items-center justify-start gap-4'>
          <div className='rounded-full h-[70px] w-[70px] overflow-hidden bg-gray-300'>
            <img
              src={historyDetail?.employee_information?.image}
              alt=''
              className='w-full h-wull object-cover'
            />
          </div>
          <div>
            <h1 className='text-xl font-medium'>
              {historyDetail?.employee_information.name}
            </h1>
            <p>{getHistoryDate(historyDetail?.created_at)}</p>
          </div>
        </div>
        <div className='flex justify-end'>
          <button onClick={handleNavigate}>
            <CgEye className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
