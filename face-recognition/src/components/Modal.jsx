import React, { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import useClickOutside from '../hooks/useClickOuside';

const Modal = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef(null);

  // Using the custom hook
  useClickOutside(modalRef, () => setIsOpen(false), [isOpen]);

  return (
    <div>
      {isOpen && (
        <>
          <div className='fixed inset-0 bg-gray-800 bg-opacity-50 z-40'></div>{' '}
          {/* Background dim */}
          <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 max-h-full'>
            <div
              ref={modalRef}
              className='relative py-5 w-4/5 h-[650px] bg-white rounded-lg shadow overflow-y-hidden'
            >
              <div className='w-full flex justify-between rounded-lg items-center h-[50px] px-4 bg-white'>
                <div className='flex items-center justify-start gap-4'>
                  <div className='rounded-full h-[60px] w-[60px] bg-gray-300'></div>
                  <div>
                    <h1 className='text-xl font-medium'>Hoang Dat</h1>
                    <p className='text-sm'>20/04/2005</p>
                  </div>
                </div>
                <div className='flex justify-end bg-gray-100 rounded-full'>
                  <button onClick={() => setIsOpen(false)} className='p-3'>
                    {/* <CgEye className='text-xl' /> */}
                    <IoClose />
                  </button>
                </div>
              </div>

              <ul className='my-4 space-y-3 h-[600px] overflow-y-scroll px-4 pb-16'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='flex items-center p-3 text-base text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow'
                    >
                      <span className='flex-1 ms-3 whitespace-nowrap font-semibold text-lg'>
                        MetaMask
                      </span>
                      <span className='inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded '>
                        21:30 pm
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
