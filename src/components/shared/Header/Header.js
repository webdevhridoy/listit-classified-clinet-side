import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assest/logo-white.svg';
import { authContext } from '../../../context/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(authContext);

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err));
    };

    const navBar = <React.Fragment>
        {user?.uid || user?.email ?
            <><li><Link to="/" >Home</Link></li>
                <li><Link to="/blog" >Blog</Link></li>
                <li><Link to="/" ><button onClick={handleSignOut}>Signout</button></Link></li>
                <li><Link className='bg-rose-500 rounded-sm text-white' to="/dashboard" >Dashboard</Link></li></>

            :
            <>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/blog" >Blog</Link></li>
                <li><Link to="/login" >Login</Link></li>
            </>


        }

    </React.Fragment>;
    return (
        <div className='text-white lg:mx-24'>
            <div className="navbar bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content bg-white mt-3 p-2 shadow  rounded-box w-52 text-gray-600">
                            {navBar}
                        </ul>
                    </div>
                    <Link to="/" className="w-20"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 ">
                        {navBar}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Header;