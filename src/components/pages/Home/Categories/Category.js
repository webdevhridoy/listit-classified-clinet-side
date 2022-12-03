import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { categoryname, img, _id } = category;
    return (
        <div className="card w-80 md:w-96 mx-auto bg-base-100 shadow-xl image-full">
            <figure><img src={img} alt="phones" /></figure>
            <div className="card-body">
                <h2 className='card-title justify-center'>{categoryname}</h2>
                <p>Find your best require device here!</p>
                <div className="card-actions justify-center">
                    <Link to={`/categories/${_id}`}>
                        <button className="bg-rose-600 px-3 py-2 rounded-md text-white hover:bg-rose-500 hover:text-white duration-500">View Products</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;