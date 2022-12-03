import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../context/AuthProvider';

const BookingModal = ({ product, setModalItem }) => {
    const navigate = useNavigate();
    const { productname, resaleprice, img, _id } = product;
    // console.log(product);
    const { user } = useContext(authContext);
    const { register, handleSubmit } = useForm();


    const handleBooking = (data) => {
        // console.log(data);
        const bookings = {
            productname: data.productname,
            productprice: data.productprice,
            yourname: data.yourname,
            location: data.location,
            mobile: data.mobile,
            email: data.email,
            bookingId: _id,
            img,


        };

        // console.log(bookings);

        // save information to the database;
        fetch('https://listit-classified-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bookings)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                // form er sese setModalItem(null) kore dibo
                setModalItem(null);
                navigate('/dashboard/myorders');
                Swal.fire({
                    text: 'Product booked succssfully'
                });
            });

    };

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(handleBooking)} noValidate="" action="" className="w-full rounded p-5 shadow-lg ng-untouched ng-pristine ng-valid  bg-black text-white">

                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <input {...register('productname', { required: 'Field is required' })} className="flex items-center h-10 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Product Name' readOnly defaultValue={productname} />

                            <input {...register('productprice', { required: 'Field is required' })} className="flex items-center h-10 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Product Price' readOnly defaultValue={resaleprice} />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center'>

                            <input {...register('yourname', { required: 'Field is required' })} className="flex items-center h-10 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Your Name' defaultValue={user?.displayName} readOnly />

                            <input {...register('email', { required: 'Field is required' })} className="flex items-center text-black h-10 px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Your Email' defaultValue={user?.email} readOnly />

                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <input {...register('mobile', { required: 'Field is required' })} className="flex items-center h-10 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Your phone number' />

                            <input {...register('location', { required: 'Field is required' })} className="flex items-center h-10 text-black px-4 mt-2 rounded focus:outline-none focus:ring-2 mr-1" placeholder='Your location' />
                        </div>

                        <button

                            type="submit" className="w-52 bg-white text-black mt-5 h-10 rounded-md hover:bg-rose-500 hover:text-white duration-500">Submit</button>

                    </form>
                    <div className="modal-action">
                        <label onClick={() => setModalItem(null)}
                            htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;