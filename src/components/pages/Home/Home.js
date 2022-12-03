import React from 'react';
import AdvertisementItems from './AdvertisementItems/AdvertisementItems';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';
import Newsletter from './Newsletter/Newsletter';

const Home = () => {
    return (
        <>  <Banner></Banner>
            <AdvertisementItems></AdvertisementItems>
            <Categories></Categories>
            <Newsletter></Newsletter>
        </>
    );
};

export default Home;