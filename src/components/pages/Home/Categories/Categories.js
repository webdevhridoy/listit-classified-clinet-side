import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category';

const Categories = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://listit-classified-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    });


    return (
        <div className='my-12'>
            <h1 className="mb-5 text-2xl md:text-5xl font-bold pb-10">Choice Favourite Top Category</h1>
            <div className='justify-center grid grid-cols-1 md:grid-cols-3 gap-10'>
                {
                    categories.map(category =>
                        <Category
                            key={category._id}
                            category={category}
                        >
                        </Category>
                    )
                }
            </div>
        </div>
    );
};

export default Categories;