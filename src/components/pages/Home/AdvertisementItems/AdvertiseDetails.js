import React from 'react';

const AdvertiseDetails = ({ ads }) => {
    // console.log(ads);
    const { productname, resaleprice, originalprice, img } = ads;
    // console.log(ads);
    return (

        <>
            {
                !ads.availability &&
                <>
                    <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-black">
                        <div>
                            <div className='flex justify-center items-center'>
                                <img src={img} alt="" className="w-44 mb-4  bg-gray-500" />
                            </div>
                            <h2 className="mb-1 text-2xl font-semibold text-rose-500">{productname}</h2>
                            <p className="text-gray-900 text-lg font-semibold"> Price: <span >{resaleprice}</span> <span className='line-through'>{originalprice}</span>
                            </p>
                        </div>
                    </div>

                </>

            }
        </>

    );
};

export default AdvertiseDetails;