import React from 'react';
import useTitle from '../../Hook/useTitle';
import dashboard from '../../../assest/dashboard banner (1).png';

const HomeDashboard = () => {
    useTitle('Dashboard');
    return (
        <div>
            <h2 className=' text-2xl mb-10 font-bold md:text-5xl'>Welcome to your dashboard</h2>
            <img src={dashboard} alt="" />
        </div>
    );
};

export default HomeDashboard;