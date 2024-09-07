import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navBarItems = [
  {
    title: 'History',
    link: '/history',
  },
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Setting',
    link: '/setting',
  },
  {
    title: 'Account',
    link: '/account',
  },
];

const NavBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    const getActivePath = () => {
      const path = `/${location.pathname.split('/')[1]}`;
      setActivePath(path);
    };
    getActivePath();
  }, [location.pathname]);

  return (
    <nav className='z-50 fixed bottom-0 left-0 right-0 w-full h-[80px] flex justify-between px-5 py-0 bg-[#1d1a1d] overflow-hidden'>
      {navBarItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className={`relative flex flex-col justify-center items-center gap-[5px] w-[50px] m-1.5 p-[20px] ${
            activePath === item.link
              ? 'text-[#6ba7a8]'
              : 'text-[rgba(255,255,255,0.2)]'
          } transition-all duration-300`}
        >
          <i
            className={`bx bx-${item.title.toLowerCase()}`}
            style={{ fontSize: '24px' }}
          ></i>
          <span className='text-xl font-semibold'>{item.title}</span>
          {activePath === item.link && (
            <span className='absolute inset-0 transform -translate-x-[10%] -translate-y-[10%] bg-radial-gradient-[circle] from-[#6ba7a8] to-transparent blur-[10px] opacity-20'></span>
          )}
        </Link>
      ))}
      {/* <div
        ref={indicatorRef}
        className='absolute top-0 left-0 h-[5px] bg-[#6ba7a8] rounded-[10px] transition-[width,left] duration-300 ease-[cubic-bezier(0.175, 0.885, 0.32, 1.175)]'
      ></div> */}
    </nav>
  );
};

export default NavBar;
