import React, { useState, useEffect } from 'react';
import { getUserLocalStorageItem } from '../ultils';
import axiosInstance from '../ultils/axios/axiosInstance';
import { HistoryAction } from '../constants';
import LoadingOverlay from './LoadingOverlay';

const CardButton = ({ id, Icon, title }) => {
  const [isOn, setIsOn] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const user = getUserLocalStorageItem();

  useEffect(() => {
    const ws = new WebSocket(
      `ws://${import.meta.env.VITE_APP_SERVER_URL}/ws/device/turn-on/`
    );

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data?.userId !== user?.id && data?.device === id) {
        setIsOn(data?.isTurnOn);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleAction = async () => {
    if (!user?.id) return;
    const requestData = {
      deviceId: user?.device_id,
      userId: user?.id,
      action: isOn
        ? HistoryAction[title.toLowerCase()][0]
        : HistoryAction[title.toLowerCase()][1],
    };

    // Create history
    // axiosInstance.post('/history/action/create', requestData);

    setIsOn(!isOn);
    // Websocket send message
    const message = {
      device: id,
      status: 'TURN_ON',
      userId: user?.id,
    };
    if (socket) socket.send(JSON.stringify(message));
  };

  return (
    <div
      className={`${
        isOn ? 'bg-blue-500 text-white' : 'bg-white text-black'
      } rounded-xl border p-5`}
    >
      <div className='flex flex-col items-start space-y-2'>
        <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-100'>
          <Icon className={`text-2xl ${isOn ? 'text-black' : ''}`} />
        </div>
        <div>
          <h1 className='text-2xl font-semibold'>{title}</h1>
        </div>
      </div>
      <div className='flex justify-between items-end'>
        <div>
          <h2 className='text-xl font-medium'>{isOn ? 'On' : 'Off'}</h2>
        </div>
        <label
          htmlFor={`toggle_${id}`}
          className='flex items-center cursor-pointer'
        >
          <input
            type='checkbox'
            id={`toggle_${id}`}
            className='sr-only peer'
            checked={isOn}
            onChange={handleAction}
          />
          <div className='block relative bg-gray-300 w-16 h-9 p-1 rounded-full before:absolute before:bg-white before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white peer-checked:bg-green-500'></div>
        </label>
      </div>
      <LoadingOverlay isLoading={isLoadingOverlay} />
    </div>
  );
};

export default CardButton;
