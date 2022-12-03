import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../../context/AuthProvider';
import useAdmin from '../../Hook/useAdmin';
import useSeller from '../../Hook/useSeller';
import useTitle from '../../Hook/useTitle';
import userProfile from '../../../assest/userImage.png';

const Dashboard = () => {
    useTitle('Dashboard');
    const { user } = useContext(authContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    const users = <>

        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/listofadmin' >All Users</Link>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/listofsellers' >All Sellers</Link>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/listofbuyers' >All Buyers</Link>
    </>;

    const seller = <>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/addcategory' >Add Category</Link>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/addproduct' >Add Product</Link>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/myproducts' >My Products</Link>
        {/* <Link className=' hover:bg-rose-500 py-1' to='/dashboard/mybuyers' >My Buyers</Link> */}
    </>;

    const buyer = <>
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/myorders' >My Orders</Link>
        {/* <Link className=' hover:bg-rose-500 py-1' to='/dashboard/myprofile'> My Profile</Link> */}
        <Link className=' hover:bg-rose-500 py-1' to='/dashboard/wishlist' >WishList</Link>
    </>;
    return (
        <div>
            <aside className="w-full p-6 sm:w-60 bg-black text-white md:mt-10 text-left">
                <div className='mb-5'>
                    {user?.uid || user?.email || user?.photoURL ?
                        <>
                            <img className='mr-3' style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={user?.photoURL} alt="" title={user?.displayName} />
                        </>
                        :
                        <>
                            <img className='mr-3' style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={userProfile} alt="" title={user?.displayName} />

                        </>
                    }
                    {
                        user?.uid ? <>
                            <h2>Hello, {user?.displayName}</h2>
                            <span className='text-sm'>{user?.email}</span>
                        </>
                            :
                            <>
                                <h2>Not Found</h2>
                                <span>Not Found</span>
                            </>
                    }

                </div>
                <nav className="space-y-8 text-sm">
                    {
                        isAdmin && <>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-widest uppercase ">Users</h2>
                                <div className="flex flex-col space-y-1">
                                    {users}
                                </div>
                            </div>
                            <hr />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-widest uppercase ">Seller</h2>
                                <div className="flex flex-col space-y-1">
                                    {seller}
                                </div>

                            </div>
                        </>
                    }
                    {
                        isSeller && <>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-widest uppercase ">Seller</h2>
                                <div className="flex flex-col space-y-1">
                                    {seller}
                                </div>
                            </div>
                        </>
                    }
                    <hr />
                    {
                        !isSeller && <div className="space-y-2">
                            <h2 className="text-2xl font-semibold tracking-widest uppercase ">Buyer</h2>
                            <div className="flex flex-col space-y-1">
                                {buyer}
                            </div>
                        </div>
                    }

                </nav>
            </aside>
        </div>
    );
};

export default Dashboard;