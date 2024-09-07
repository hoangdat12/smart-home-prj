import React from 'react';
import NavBar from '../components/Navbar';
import { RiLockPasswordLine, RiQuestionLine } from 'react-icons/ri';
import { VscGame } from 'react-icons/vsc';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { IoMdPaper, IoIosLogOut } from 'react-icons/io';
import SettingButton from '../components/SettingButton';
import ManageAccount from './accountPages/ManageAccount';
import { clearLocalStorage, getUserLocalStorageItem } from '../ultils';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  const user = getUserLocalStorageItem();

  const handleLogout = async () => {
    clearLocalStorage();
    navigate('/login');
    // call api to add refresh token to blacklist
  };

  return (
    <div
      className='mb-[80px] bg-gray-100'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <NavBar />
      <div className='py-5 items-center justify-center px-4'>
        <div className='space-y-6'>
          <div className=''>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <div>
                  <h1 className='text-4xl font-bold'>ACCOUNT</h1>
                  <p className='text-md'>Manage your account and employees</p>
                </div>
              </div>
              <div className='flex items-center justify-end'>
                <div className='rounded-full h-[50px] w-[50px] flex items-center justify-center bg-gray-300 mx-auto mb-4 overflow-hidden'>
                  <img
                    src={user?.image}
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white py-2 rounded-lg border'>
            <div className='px-4'>
              <h1 className='font-semibold text-2xl'>Setting your account</h1>
            </div>
            <ul className='w-full text-sm font-medium space-y-4 rounded-lg px-4 py-4'>
              <SettingButton
                Icon={RiLockPasswordLine}
                title={'Get Account Password'}
                link={'/account/forgot-password'}
              />
              <SettingButton
                Icon={CgProfile}
                title={'User Information'}
                link={`/account/user-information/${user?.id}`}
              />
              <SettingButton
                Icon={RiLockPasswordLine}
                title={"Create device's account"}
                link={'/account/registor'}
              />
            </ul>
          </div>

          <div className='bg-white py-2 rounded-lg border'>
            <div className='px-4'>
              <h1 className='font-semibold text-2xl'>Think Tittle</h1>
            </div>
            <ul className='w-full text-sm font-medium space-y-4 rounded-lg px-4 py-4'>
              <SettingButton
                Icon={VscGame}
                title={'Terms of service'}
                link={'/account/terms'}
              />
              <SettingButton
                Icon={MdOutlinePrivacyTip}
                title={'Privacy Policy'}
                link={'/privacy'}
              />
              <SettingButton
                Icon={IoMdPaper}
                title={'Community guidelines'}
                link={'/guildline'}
              />
              <SettingButton
                Icon={RiQuestionLine}
                title={'Supports'}
                link={'/supports'}
              />
              <li
                onClick={handleLogout}
                className='w-full py-2 px-4 bg-gray-100 rounded-md'
              >
                <span className='flex items-center justify-start space-x-2 text-lg'>
                  <IoIosLogOut />
                  <span>Logout</span>
                </span>
              </li>
            </ul>
          </div>

          <ManageAccount />
        </div>
      </div>
    </div>
  );
};

export default Account;
