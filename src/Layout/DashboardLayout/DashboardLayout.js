import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import useAdmin from '../../hooks/useAdmin';
import { AuthContext } from '../../context/AuthProvider';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div>
            <img src="" alt="" />
          </div>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className='text-lg'>
              <li><Link to='/dashboard'>My Appointment</Link></li>
              <li><Link to='/dashboard/myorders'>My Orders</Link></li>
              {
                isAdmin && <>
                  <li><Link to='/dashboard/allusers'>Users List</Link></li>
                  <li><Link to='/dashboard/doctors'>Doctors</Link></li>
                  <li><Link to='/dashboard/products'>Products</Link></li>
                </>
              }
              {/* <li><Link to='/dashboard/appointment'>Appointments</Link></li> */}
            </div>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;