import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const HeaderBack = ({ title }) => {
  const navigate = useNavigate();

  const goToLastPage = () => {
    navigate(-1); // Replace with your actual last page path
  };

  return (
    <div className='flex justify-between items-center'>
      <div
        onClick={goToLastPage}
        className='flex gap-1 items-center pr-2 py-1 '
      >
        <IoIosArrowBack />
        Back
      </div>
      <div>
        <h1 className='font-semibold text-2xl'>{title}</h1>
      </div>
      <div onClick={goToLastPage} className='px-2 py-1 rounded border'>
        Done
      </div>
    </div>
  );
};

export default HeaderBack;
