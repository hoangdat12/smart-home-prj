import React, { useEffect, useState } from 'react';
import AccountCard from '../../components/AccountCard';
import axiosInstance from '../../ultils/axios/axiosInstance';
import { getUserLocalStorageItem } from '../../ultils';
import Loading from '../../components/Loading';

const ManageAccount = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserLocalStorageItem();

  useEffect(() => {
    const fetchUserAccount = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `device/employee/${user?.device_id}`
      );
      setIsLoading(false);
      if (response.status === 200) {
        setUserAccounts(response.data.data);
      }
    };
    fetchUserAccount();
  }, []);

  return (
    <div className=' bg-white space-y-4 pt-2 pb-6 rounded-lg border'>
      <div className='px-4'>
        <h1 className='font-semibold text-2xl'>Manage device's account</h1>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center w-full h-full p-4'>
          <Loading isLoading={isLoading} />
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3 px-4'>
          {userAccounts.length !== 0 ? (
            userAccounts.map((user) => (
              <AccountCard key={user.id} user={user} />
            ))
          ) : (
            <div className='w-full col-span-2'>
              <h1 className='text-xl text-center'>
                No Account in your's device
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAccount;
