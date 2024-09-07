import React, { useEffect, useState } from 'react';

const UploadImage = ({ file, setFile }) => {
  const [previewImage, setPreviewImage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className='flex flex-col items-center justify-center'>
      {!file ? (
        <div className='bg-white p-3 rounded-xl w-80'>
          <label
            htmlFor='file-upload'
            className='border-2 rounded-md p-8 border-dotted w-full h-full flex flex-col items-center cursor-pointer'
          >
            <p className='font-medium mb-1'>Drop account's face</p>
            <p className='font-medium text-sm mb-4 text-gray-600'>
              or upload it manually
            </p>
            <div className='bg-[#0346f2] text-white font-medium text-sm py-2.5 px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700'>
              Upload manually
              <span>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6 1V6M6 11V6M6 6H1M6 6H11'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </div>
          </label>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className='relative rounded-full h-28 w-28 bg-gray-300 overflow-hidden'>
          <img
            src={previewImage}
            alt=''
            className='object-cover w-full h-full'
          />
          <span className='text-center text-xs absolute bottom-0 right-0 left-0 h-1/5 text-white bg-gray-500 opacity-75'>
            Change
          </span>
          <input
            type='file'
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
