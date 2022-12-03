import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../../../context/AuthProvider';
import BookingModal from '../../Booking/BookingModal';
import userProfile from '../../../../assest/userImage.png';

const CategoryProductDetails = ({ product }) => {
    const { user } = useContext(authContext);
    const { productname, location, resaleprice, yearsofuse, img, utcDate, sellername, description, originalprice, status, _id, mobile, email } = product;
    const [modalItem, setModalItem] = useState(null);
    // console.log(product);
    // const [isWishAdd, setIsWishAdd] = useState(false);

    const handleModal = (product) => {
        setModalItem(product);
    };

    const handleWishList = () => {
        const wishList = {
            productname: productname,
            productprice: resaleprice,
            yourname: sellername,
            location: location,
            mobile: mobile,
            email: email,
            bookingId: _id,
            img,

        };
        // console.log(wishList);

        fetch('https://listit-classified-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishList)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Wish List Added');
                }
            });
    };


    return (
        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-black   ">
            <div className='flex justify-between'>
                <div className="flex justify-center space-x-4">
                    {user?.uid || user?.email || user?.photoURL ?
                        <>
                            <img className='mr-3' style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={user?.photoURL} alt="" title={user?.displayName} />
                        </>
                        :
                        <>
                            <img className='mr-3' style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={userProfile} alt="" title={user?.displayName} />

                        </>
                    }
                    <div className="flex justify-center space-y-1">
                        <span className='mr-1'>
                            {sellername}
                        </span>
                        <span className='mr-1'>
                            {
                                status === 'Verified' && <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                            }
                        </span>
                    </div>
                </div>
                <div>
                    {utcDate}
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center'>
                    <img src={img} alt="" className="w-44 mb-4  bg-gray-500" />
                </div>
                <h2 className="mb-1 text-2xl font-semibold">{productname}</h2>
                <p className="text-gray-900 text-lg font-semibold"> Price: <span >{resaleprice}</span> <span className='line-through'>{originalprice}</span>
                </p>
                <p className="text-sm  text-gray-400">{description}</p>
            </div>
            <div className="flex justify-between items-center ">
                <div className="space-x-2">
                    <p aria-label="Location" type="button" className="p-2 text-center flex justify-between items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{location}</span>
                    </p>

                </div>
                <div className="flex space-x-2 text-sm  text-gray-400">
                    <p type="button" className="flex items-center p-1 space-x-1.5"> Used: {yearsofuse} Year
                    </p>
                    {
                        product.resaleprice && !product.availability &&
                        <button
                            onClick={handleWishList}
                            title='Wish List'
                            type="button"
                            className="flex items-center p-1 space-x-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    }
                    {
                        product.resaleprice && product.availability &&
                        <button
                            type="button"
                            disabled
                            className="flex items-center p-1 space-x-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    }
                </div>
                <div>
                    <button >
                        {
                            product.resaleprice && !product.availability && <label onClick={() => handleModal(product)}
                                htmlFor="my-modal"
                                className="btn bg-rose-500 border-0 text-white">Book Now</label>
                        }
                    </button>
                    {
                        product.resaleprice && product.availability &&
                        <button disabled className='px-5 py-2 rounded-md text-white bg-black disabled'>Sold Out</button>

                    }
                </div>








            </div>
            {modalItem &&
                <BookingModal
                    product={product}
                    setModalItem={setModalItem}
                >
                </BookingModal>
            }
        </div>
    );
};

export default CategoryProductDetails;