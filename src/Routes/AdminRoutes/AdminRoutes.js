import React, { useContext } from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const AdminRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    // const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    // if(loading || isAdminLoading){
    //     return <Loading></Loading>
    // }

    // if(user && isAdmin){
    //     return children;
    // }
    // return <Navigate to='/login' state={{from: location}} replace></Navigate> ;
};

export default AdminRoutes;