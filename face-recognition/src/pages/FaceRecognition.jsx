import React, { useState } from 'react';
import HeaderBack from '../components/HeaderBack';
import NavBar from '../components/Navbar';
import UploadImage from '../components/UploadImage';
import ManageAccount from './accountPages/ManageAccount';
import axiosInstance from '../ultils/axios/axiosInstance';
import { getFullNameUser, getUserLocalStorageItem } from '../ultils';
import LoadingOverlay from '../components/LoadingOverlay';

const FaceRecognition = () => {
  const [file, setFile] = useState(null);
  const [message, setShowMessage] = useState('');
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);

  const user = getUserLocalStorageItem();

  const handleVerifyFace = async () => {
    const fd = new FormData();
    if (!file) return;
    fd.append('deviceId', user?.device_id);
    fd.append('image', file);
    setIsLoadingOverlay(true);
    const response = await axiosInstance.post(`/face/authenticate`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data', // Không cần thêm, axios tự động thêm cho bạn
      },
    });
    if (response.status === 200) {
      setShowMessage(`Ảnh chuẩn đó ${getFullNameUser(response.data?.data)}`);
    } else {
      setShowMessage('Sai ảnh rồi em, Thử cái khác đi');
    }
    setIsLoadingOverlay(false);
  };
  return (
    <div
      className='mb-[80px] bg-gray-100 pt-4 px-4'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <HeaderBack title={'Face Recognition'} />
      <NavBar />
      <div className='mt-10 space-y-4'>
        <div>
          <UploadImage file={file} setFile={setFile} />
        </div>
        {message != '' && (
          <div>
            <h1 className='text-3xl text-red-500'>{message}</h1>
          </div>
        )}
        <div className='flex flex-col items-center justify-center min-h-[80px]'>
          <h1 className='text-xl'>Upload ảnh có mặt</h1>
          <h1 className='text-xl'>Chỉ chứa 1 người</h1>
          {file && (
            <h1 className='text-2xl text-red-500'>Có chắc là tấm ni không?</h1>
          )}
        </div>
        <div className='flex items-center justify-end w-full gap-2 pr-4'>
          <button
            onClick={handleVerifyFace}
            className='px-4 py-2 rounded-lg border bg-blue-500 text-white'
          >
            Verify
          </button>
        </div>
        <div>
          <h1 className='text-2xl font-semibold mb-4'>Mặt đúng</h1>
          <ManageAccount />
        </div>
      </div>
      <LoadingOverlay isLoading={isLoadingOverlay} />
    </div>
  );
};

export default FaceRecognition;
