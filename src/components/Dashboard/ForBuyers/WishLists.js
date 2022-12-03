import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';

const WishLists = () => {
    useTitle('Wish List');
    const { data: myWisthList = [], } = useQuery({
        queryKey: ['myWisthList'],
        queryFn: async () => {
            const res = await fetch('https://listit-classified-server.vercel.app/wishlist');
            const data = await res.json();
            return data;
        }
    });

    // console.log(myWisthList);


    // const handleDeleteProduct = product => {
    //     console.log(product);

    //     fetch(`https://listit-classified-server.vercel.app/wishlist/${product._id}`, {
    //         method: 'DELETE',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);
    //             if (data.deletedCount) {
    //                 toast.success('Product is deleted');
    //                 const remaining = myWisthList.filter(pro => pro._id !== product._id);
    //                 console.log(remaining);
    //             }
    //         });
    // };
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>

                    {
                        myWisthList?.map((product, index) => <tr key={product._id}>
                            <th>{index + 1}</th>
                            <td>
                                <img className='w-auto h-16' src={product.img} alt='' />
                            </td>
                            <td>{product.productname}</td>
                            <td>${product.productprice}</td>

                            <td>
                                <Link to={`/dashboard/payments/${product._id}`} className='px-2 py-1 rounded-md text-white bg-rose-500'
                                >Pay</Link>
                            </td>
                            {/* <td>
                                <label onClick={() => handleDeleteProduct(product)}
                                    htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Delete</label>
                            </td> */}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default WishLists;