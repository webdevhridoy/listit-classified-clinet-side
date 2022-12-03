import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero h-[400px] md:h-[750px]" style={{ backgroundImage: `url("https://i.ibb.co/Jqmn6hT/bannerbg.png")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div >
                    <h1 className="mb-5 text-3xl md:text-7xl font-bold">Enjoy and Discover</h1>
                    <p className="mb-5 md:text-3xl">Everything You Need in Listlt</p>
                    <Link to='/blog' className="btn bg-rose-500 text-white">Our Blogs</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;