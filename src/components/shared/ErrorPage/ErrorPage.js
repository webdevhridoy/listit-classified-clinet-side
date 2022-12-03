import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';
import image from '../../../assest/error.png';

const ErrorPage = () => {
    useTitle('Error');
    const error = useRouteError();

    return (
        <div className='flex flex-col justify-center items-center h-screen text-rose-600' >
            <div>
                <img src={image} alt="" />
                <p className='text-3xl font-bold'> {error.statusText || error.message} </p>
                <Link to='/' className='text-1xl font-semibold mt-5 block bg-rose-500 text-white py-2 rounded-xl'>Back Home</Link>
            </div>

        </div>
    );
};

export default ErrorPage;