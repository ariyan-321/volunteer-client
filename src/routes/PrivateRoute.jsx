import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../provider/AuthProvider';

export default function PrivateRoute({children}) {

    const {user,loading}=useContext(authContext);
    const location=useLocation();

    if (loading) {
        // return <h1 className='text-blue-600 font-bold text-4xl text-center mt-12'>Loading...</h1>;
        return <div className='grid justify-items-center mt-12'>
          <span className="loading loading-bars loading-lg text-4xl"></span>
          </div>
      }
    
      if (user && user?.email) {
        return children; 
      }

  return (
    <Navigate state={location.pathname} to={"/login"} ></Navigate>
  )
}
