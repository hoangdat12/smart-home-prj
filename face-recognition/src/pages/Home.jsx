import React from 'react';
import NavBar from '../components/Navbar';
import Card from '../components/Card';
import CardButton from '../components/CardButton';
import BrightnessSlider from '../components/BrightnessSlider';
import { IoWaterOutline } from 'react-icons/io5';
import { BsCloud } from 'react-icons/bs';
import { FaLightbulb, FaFan, FaThermometerHalf } from 'react-icons/fa';
import { PiDoorDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/face-recognition');
  };

  return (
    <div className='mb-[80px] bg-gray-100'>
      <NavBar />
      <div className='container mx-auto px-4 py-5 space-y-4'>
        <div className='mb-6'>
          <h1 className='font-semibold text-4xl'>DASHBOARD</h1>
          <span className='font-medium text-xl'>Living room</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <Card Icon={FaThermometerHalf} title={'Temperature'} value={35} />
          <Card Icon={IoWaterOutline} title={'Humidity'} value={85} />
          <Card Icon={BsCloud} title={'Co2'} value={35} />
        </div>
        <div className='w-full'>
          <button
            onClick={handleNavigate}
            className='w-full px-4 py-3 rounded-lg border bg-blue-500 text-white'
          >
            Click here - Test Face Recognition
          </button>
        </div>
        <div>
          <BrightnessSlider />
        </div>
        <div className='space-y-4'>
          <CardButton id={'light'} Icon={FaLightbulb} title={'Light'} />
          <CardButton id={'fan'} Icon={FaFan} title={'Fan'} />
          <CardButton id={'door'} Icon={PiDoorDuotone} title={'Door'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
