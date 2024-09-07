import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import HistoryCard from '../components/HistoryCard';
import Search from '../components/Search';
import axiosInstance from '../ultils/axios/axiosInstance';
import { getUserLocalStorageItem } from '../ultils';
import { Link, useLocation } from 'react-router-dom';
import { formatDate, formatDateForServer } from '../ultils/index';
import Loading from '../components/Loading';

const History = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [histories, setHistories] = useState([]);
  const [previous7Days, setPrevious7Days] = useState([]);
  const [activeDay, setActiveDay] = useState('');
  const [startKey, setStartKey] = useState(null);

  const user = getUserLocalStorageItem();

  useEffect(() => {
    const getPrevious7Days = () => {
      const days = [];
      const date = new Date();

      for (let i = 0; i < 7; i++) {
        days.push(formatDate(date));
        date.setDate(date.getDate() - 1); // Trừ đi 1 ngày
      }

      setPrevious7Days(days.reverse());
    };

    getPrevious7Days();
  }, []);

  useEffect(() => {
    const getHistories = async () => {
      const date = new Date();
      const activeDateStr = location.search
        ? location.search.slice(6, 11)
        : formatDate(date);
      setActiveDay(activeDateStr);

      const dateParams = formatDateForServer(activeDateStr);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/history/date/${user?.device_id}?date=${dateParams}`
      );
      setIsLoading(false);
      if (response.status === 200) {
        setHistories(response.data?.data?.histories);
        setStartKey(response.data?.data?.start_key);
      }
    };

    getHistories();
  }, [location.search]);

  return (
    <div
      className='mb-[80px] bg-gray-100'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <NavBar />

      <div className='pt-5 mb-[100px] space-y-6 px-4'>
        <div className=''>
          <h1 className='text-4xl font-semibold text-start'>HISTORY</h1>
          <span className='font-medium text-md'>
            View full history action in your hours
          </span>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-full'>
            <Search value={searchValue} setValue={setSearchValue} />
          </div>
        </div>

        <ul className='flex items-center justify-between'>
          {previous7Days.map((day) => (
            <li
              key={day}
              className={`px-2 py-1 rounded border text-sm ${
                activeDay === day ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Link to={`/history?date=${day}`}>{day}</Link>
            </li>
          ))}
        </ul>

        {isLoading ? (
          <div className='flex items-center justify-center pt-[20%]'>
            <Loading isLoading={isLoading} />
          </div>
        ) : (
          <div className='space-y-2'>
            {histories.length === 0 ? (
              <div className='flex items-center justify-center mt-10'>
                <h1 className='text-2xl'>
                  Don't have any History in {activeDay}
                </h1>
              </div>
            ) : (
              histories.map((history, index) => (
                <HistoryCard
                  historyDetail={history}
                  key={index}
                  activeDay={activeDay}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
