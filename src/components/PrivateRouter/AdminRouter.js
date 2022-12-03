import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../context/AuthProvider';
import useAdmin from '../Hook/useAdmin';
import Loader from '../Loader/Loader';

const AdminRouter = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    // console.log(user, loading);

    if (loading || isAdminLoading) {
        return <Loader></Loader>;
    }

    if (!user && isAdmin) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
    } else {
        return children;
    }
};

export default AdminRouter;