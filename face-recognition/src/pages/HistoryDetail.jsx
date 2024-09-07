import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderBack from '../components/HeaderBack';
import NavBar from '../components/Navbar';
import axiosInstance from '../ultils/axios/axiosInstance';
import { getTimeFromDate } from '../ultils';

const HistoryDetail = () => {
  const location = useLocation();
  const [historyActions, setHistoryActions] = useState([]);
  const [historyDate, setHistoryDate] = useState('');

  useEffect(() => {
    const getHistoryAction = async () => {
      const searchParams = new URLSearchParams(location.search);

      const deviceId = searchParams.get('deviceId');
      const userId = searchParams.get('userId');
      const date = searchParams.get('date');
      setHistoryDate(date);
      const response = await axiosInstance.get(
        `/history/user/action?deviceId=${deviceId}&userId=${userId}&date=${date}`
      );
      if (response.status === 200) {
        setHistoryActions(response.data.data);
      }
    };
    getHistoryAction();
  }, [location.search]);

  return (
    <div>
      <>
        <NavBar />
        <div className='flex justify-center items-center w-full h-full md:inset-0 max-h-full px-4'>
          <div className='relative py-5 w-full'>
            <HeaderBack title={'History'} />
            <div className='w-full flex justify-between items-center rounded-lg h-[50px] px-4 bg-white mt-6'>
              <div className='flex items-center justify-start gap-4'>
                <div className='rounded-full h-[60px] w-[60px] overflow-hidden bg-gray-300'>
                  <img
                    src={location.state?.user?.image}
                    className='w-full h-full object-cover'
                    alt=''
                  />
                </div>
                <div>
                  <h1 className='text-xl font-medium'>
                    {location.state?.user?.name}
                  </h1>
                  <p className='text-sm'>{historyDate}</p>
                </div>
              </div>
            </div>

            <ul className='my-4 space-y-3 px-4 pb-16 mt-8'>
              {historyActions.map((historyAction, index) => (
                <li key={index}>
                  <a
                    href='#'
                    className='flex items-center p-3 text-base text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow'
                  >
                    <span className='flex-1 ms-3 whitespace-nowrap font-semibold text-lg'>
                      {historyAction?.action}
                    </span>
                    <span className='inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded '>
                      {getTimeFromDate(historyAction?.created_at)}{' '}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </div>
  );
};

export default HistoryDetail;
