import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assest/logo-white.svg';

const Footer = () => {
    return (
        <div className="pt-12">
            <footer id="footer" className="relative z-50 bg-black ">
                <div className="py-16 flex flex-col justify-center items-center">
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                    <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">© 2022 Copyrights by ListIt Classified. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;