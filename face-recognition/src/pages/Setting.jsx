import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import AutomateCard from '../components/AutomateCard';
import { FaLightbulb, FaThermometerHalf } from 'react-icons/fa';
import { getUserLocalStorageItem } from '../ultils';
import axiosInstance from '../ultils/axios/axiosInstance';
import Loading from '../components/Loading';

const SettingIcon = {
  light: FaLightbulb,
  temperature: FaThermometerHalf,
};

const Setting = () => {
  const [deviceDetail, setDevicaDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserLocalStorageItem();

  useEffect(() => {
    const getDeviceInformation = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get(`/device/${user?.device_id}`);
      if (response.status === 200) {
        setDevicaDetail(response.data.data);
      }
      setIsLoading(false);
    };

    getDeviceInformation();
  }, []);

  return (
    <div
      className='mb-[80px] bg-gray-100'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <NavBar />
      <div className='container mx-auto px-4 py-5'>
        <div className='mb-6'>
          <h1 className='font-bold text-4xl'>SETTING</h1>
          <span className='font-medium text-xl'>Automate action</span>
        </div>
        {isLoading ? (
          <div className='flex items-center justify-center h-screen w-screen'>
            <Loading isLoading={isLoading} />
          </div>
        ) : (
          <div className='space-y-4'>
            {deviceDetail?.device_informations.map((detail, index) => (
              <AutomateCard
                detail={detail}
                key={index}
                Icon={SettingIcon[detail?.name]}
                deviceId={deviceDetail.device_id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
