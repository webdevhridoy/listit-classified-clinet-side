import React from 'react';
import useTitle from '../../Hook/useTitle';

const MyProfile = () => {
    useTitle('My Profile');
    return (
        <div>
            <h2>This is my profile</h2>
        </div>
    );
};

export default MyProfile;