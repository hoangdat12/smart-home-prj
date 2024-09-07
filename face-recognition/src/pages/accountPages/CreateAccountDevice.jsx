import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import Input from '../../components/Input';
import InputSelect from '../../components/InputSelect';
import HeaderBack from '../../components/HeaderBack';
import UploadImage from '../../components/UploadImage';
import { getUserLocalStorageItem } from '../../ultils';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../ultils/axios/axiosInstance';
import ToastNotification from '../../components/ToastNotification';
import LoadingOverlay from '../../components/LoadingOverlay';

const CreateAccountDevice = () => {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(''); // success || error
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    gender: 'Male',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const user = getUserLocalStorageItem();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleCreateNewAccount = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Append form data
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        fd.append(key, formData[key]);
      }
    }

    // Append file data
    if (file) {
      fd.append('image', file);
    }
    fd.append('registorId', user.id);
    setIsLoading(true);
    const response = await axiosInstance.post('/face/registor/employee', fd, {
      headers: {
        'Content-Type': 'multipart/form-data', // Không cần thêm, axios tự động thêm cho bạn
      },
    });
    if (response.status === 200) {
      setShowMessage('success');
      setMessage('Create account successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        gender: 'Male',
        password: '',
        confirmPassword: '',
        username: '',
      });
      setFile(null);
    } else {
      setShowMessage('error');
      setMessage(response.response.data.message || 'Something error happend');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user.role === 'employee') {
      navigate('/not-authorized');
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className='py-6 px-4 bg-gray-200 min-h-screen mb-[80px]'>
        <HeaderBack title={'Create new Account'} />

        <form
          onSubmit={handleCreateNewAccount}
          className='mt-10 px-4 bg-white py-4 rounded-lg'
        >
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <UploadImage file={file} setFile={setFile} />

            <Input
              label='Username'
              name='username'
              value={formData.username}
              setValue={(value) => handleInputChange('username', value)}
              placeholder='Enter your username'
            />

            <Input
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              setValue={(value) => handleInputChange('password', value)}
              placeholder='Enter your password'
            />

            <Input
              label='Confirm password'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              setValue={(value) => handleInputChange('confirmPassword', value)}
              placeholder='Enter your confirm password'
            />

            <Input
              label='Position'
              name='position'
              value={formData.position}
              setValue={(value) => handleInputChange('position', value)}
              placeholder='Enter your position'
            />

            <InputSelect
              handleChangeOption={handleGenderChange}
              currentValue={formData.gender}
            />

            <Input
              label='First Name'
              name='firstName'
              value={formData.firstName}
              setValue={(value) => handleInputChange('firstName', value)}
              placeholder='Enter your first name'
            />

            <Input
              label='Last Name'
              name='lastName'
              value={formData.lastName}
              setValue={(value) => handleInputChange('lastName', value)}
              placeholder='Enter your last name'
            />
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Create
          </button>
        </form>
        <ToastNotification
          type={showMessage}
          message={message}
          setVisible={setShowMessage}
        />
        <LoadingOverlay isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CreateAccountDevice;
