import React, { useState } from 'react';

const BrightnessSlider = () => {
  const [brightness, setBrightness] = useState(75);

  const handleChange = (event) => {
    setBrightness(event.target.value);
  };

  return (
    <div className='w-96 p-6 rounded-xl bg-white shadow-lg relative'>
      <div className='flex justify-between w-full text-black font-bold mb-2'>
        <span>DIM LIGHT</span>
        <span>BRIGHT LIGHT</span>
      </div>
      <div className='relative'>
        <input
          type='range'
          min='0'
          max='100'
          value={brightness}
          onChange={handleChange}
          className='w-full bg-gradient-to-r from-indigo-700 to-pink-400 rounded-full mt-10'
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            height: '30px',
          }}
        />
        <div
          className='absolute top-8 left-0 w-10 h-10 bg-transparent rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-full'
          style={{ left: `${brightness}%`, pointerEvents: 'none' }}
        >
          <span className='text-indigo-500 font-bold'>{brightness}%</span>
        </div>
      </div>
    </div>
  );
};

export default BrightnessSlider;
