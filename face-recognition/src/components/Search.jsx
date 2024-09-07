import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Search = ({ value, setValue }) => {
  const clearSearchValue = () => {
    if (value !== '') setValue('');
  };

  return (
    <div className='relative w-full flex flex-wrap items-stretch'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='relateive p-3 w-full border-0 rounded shadow bg-white outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline'
        placeholder='Search something'
      />
      <div
        onClick={clearSearchValue}
        className='absolute top-0 right-0 pr-3 h-full leading-snug bg-transparent text-base font-normal text-gray-400 flex items-center justify-center'
      >
        {value !== '' ? <IoMdClose /> : <FaSearch />}
      </div>
    </div>
  );
};

export default Search;
