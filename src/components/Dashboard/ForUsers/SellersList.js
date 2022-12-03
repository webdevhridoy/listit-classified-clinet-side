import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../../context/AuthProvider';
import useAdmin from '../../Hook/useAdmin';
import useTitle from '../../Hook/useTitle';
import Loader from '../../Loader/Loader';

const SellersList = () => {
    useTitle('Seller List');
    const { user } = useContext(authContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const navigate = useNavigate();

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await fetch('https://listit-classified-server.vercel.app/users/seller');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }


    if (isAdminLoading) {
        return <Loader></Loader>;
    }

    if (!isAdmin) {
        navigate('/');
    }

    const handleUserDelete = (seller) => {
        fetch(`https://listit-classified-server.vercel.app/users/${seller._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('Access-Token')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch();
                if (data.deletedCount) {
                    toast.success('Seller is deleted');
                }
            });
    };




    const handleMakeAdmin = (id) => {
        fetch(`https://listit-classified-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Your role has been changed');
                    refetch();
                }
            });
    };

    const handleVerify = (seller) => {
        // console.log(seller);
        fetch(`https://listit-classified-server.vercel.app/users/seller/${seller?._id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                fetch(`https://listit-classified-server.vercel.app/users/updateseller/${seller?.email}`, {
                    method: 'PUT',
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                        if (data.modifiedCount > 0) {
                            toast.success('Your status has been changed');
                        }
                    });

            });
    };

    // if (isSellerLoading) {
    //     return <Loader></Loader>;
    // }

    // if (!isSeller) {
    //     navigate('/');
    // }

    return (
        <div>
            <h2>Sellers List {sellers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {
                                        seller?.status !== 'Verified' &&
                                        <Link
                                            onClick={() => handleVerify(seller)}
                                            className='font-bold tooltip'
                                            data-tip="Make Verified"

                                        >Unverfied</Link>
                                    }
                                    {
                                        seller?.status === 'Verified' &&
                                        <p className='text-rose-500 font-semibold'
                                        >Verified</p>
                                    }

                                </td>
                                <td>{seller.role}</td>
                                <td>
                                    {
                                        seller?.role !== 'Admin' &&
                                        <Link onClick={() => handleMakeAdmin(seller._id)}
                                            className='px-2 py-1 rounded-md text-white bg-rose-500'>Make Admin</Link>
                                    }
                                </td>

                                <td>
                                    <Link onClick={() => handleUserDelete(seller)}
                                        className='px-2 py-1 rounded-md text-white bg-rose-500'>Delete</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellersList;