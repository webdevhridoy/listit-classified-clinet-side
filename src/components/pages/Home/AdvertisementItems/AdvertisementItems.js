import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseDetails from './AdvertiseDetails';
import ads from '../../../../assest/ads.png';
import Loader from '../../../Loader/Loader';

const AdvertisementItems = () => {

    const { data: advertisements = [], isLoading } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const res = await fetch('https://listit-classified-server.vercel.app/advertisement');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }


    // console.log(advertisements);
    return (
        <>
            {advertisements.length > 0 &&
                <>
                    <div className='py-12'>
                        <h1 className="mb-5 text-2xl md:text-5xl font-bold">Advertised items</h1>
                        <img className='w-full pb-10' src={ads} alt="" />
                        {
                            <>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                                    {

                                        advertisements.map(ads => <AdvertiseDetails
                                            key={ads._id}
                                            ads={ads}
                                        ></AdvertiseDetails>)
                                    }
                                </div>
                            </>

                        }

                    </div>
                </>

            }
        </>

    );
};

export default AdvertisementItems;