import React, { useRef, useState } from 'react';
import { VscEdit } from 'react-icons/vsc';
import { AiOutlineCheck } from 'react-icons/ai';
import useClickOutside from '../hooks/useClickOuside';
import axiosInstance from '../ultils/axios/axiosInstance';
import LoadingOverlay from '../components/LoadingOverlay';
import ToastNotification from '../components/ToastNotification';

const AutomateCard = ({ detail, Icon, deviceId }) => {
  const [isOn, setIsOn] = useState(detail?.is_automate);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defaultValue, setDefaultValue] = useState(detail?.default_value);
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState('');

  const modalRef = useRef(null);
  useClickOutside(
    modalRef,
    () => {
      setIsEdit(false);
      setInputValue('');
    },
    [isOn]
  );

  const handleToggle = async () => {
    if (isEdit && inputValue.trim() == '') {
      setIsEdit(false);
      return;
    }
    if (!isEdit) setIsOn(!isOn);
    setIsLoadingOverlay(true);
    const response = await axiosInstance.put(`/device/update/${deviceId}`, {
      name: detail?.name,
      isAutomate: isEdit ? isOn : !isOn,
      defaultValue: isEdit ? inputValue : detail?.default_value,
    });
    if (response.status === 200 && isEdit) {
      setIsEdit(false);
      setDefaultValue(inputValue);
      setInputValue('');
      setShowMessage('success');
      setMessage('Update default value success.');
    } else if (response.status !== 200) {
      setShowMessage('error');
      setMessage(response.response?.data?.message);
    }
    setIsLoadingOverlay(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      <div
        className={`${
          isOn ? 'bg-blue-500 text-white' : 'bg-white text-black'
        } rounded-xl border p-5`}
      >
        <div className='flex flex-col items-start space-y-2'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-100'>
              <Icon className={`text-2xl ${isOn ? 'text-black' : ''}`} />
            </div>

            {isOn &&
              (isEdit ? (
                <div ref={modalRef} className='flex gap-2'>
                  <span
                    onClick={handleToggle}
                    className='p-2 rounded-full bg-gray-200 text-black'
                  >
                    <AiOutlineCheck />
                  </span>
                  <input
                    className='border w-[100px] px-2 py-1 rounded-lg text-black'
                    placeholder={detail.name === 'light' ? '07:00 pm' : '25℃'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              ) : (
                <span
                  onClick={handleEdit}
                  className='p-2 rounded-full bg-gray-200 text-black'
                >
                  <VscEdit />
                </span>
              ))}
          </div>
          <div className='flex items-center justify-between w-full'>
            <div>
              <h1 className='text-xl font-semibold'>{detail?.title}</h1>
            </div>
            <div className={`${!isOn && 'hidden'}`}>
              {detail?.name === 'light' ? defaultValue : `${defaultValue}℃`}
            </div>
          </div>
        </div>
        <div className='flex justify-between items-end mt-2'>
          <div>
            <h2 className='text-lg font-medium'>{isOn ? 'On' : 'Off'}</h2>
          </div>
          <label
            htmlFor={`toggle_${detail?.name}`}
            className='flex items-center cursor-pointer'
          >
            <input
              type='checkbox'
              id={`toggle_${detail?.name}`}
              className='sr-only peer'
              checked={isOn}
              onChange={handleToggle}
            />
            <div className='block relative bg-gray-300 w-16 h-9 p-1 rounded-full before:absolute before:bg-white before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white peer-checked:bg-green-500'></div>
          </label>
        </div>
      </div>
      <ToastNotification
        type={showMessage}
        setVisible={setShowMessage}
        message={message}
      />
      <LoadingOverlay isLoading={isLoadingOverlay} />
    </>
  );
};

export default AutomateCard;
