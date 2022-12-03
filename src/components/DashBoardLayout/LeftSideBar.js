import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard/Dashboard';

const LeftSideBar = () => {
    return (
        <div className='flex flex-col lg:flex-row'>
            <aside className='md:h-screen md:sticky lg:top-0'>
                <Dashboard></Dashboard>
            </aside>
            <main className='mt-10 md:ml-10 w-full'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default LeftSideBar;