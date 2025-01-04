import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {


  const{user,setUser,userLogin,googleLogin}=useContext(authContext);
  const navigate=useNavigate();
  const location=useLocation();



  const handleGoogleLogin=()=>{
    googleLogin()
    .then(res=>{
      console.log(res?.user);
      toast.success('Login Successful.', {
        position: "top-right"
      })
      navigate(location?.state? location?.state:"/");
    })
    .catch(err=>{
      toast.error(err?.code);
    })
  }
 
  const handleLogin=(e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;

    userLogin(email,password)
    .then(res=>{
      console.log(res?.user);
      setUser((prev)=>{return {...prev,...res.user}})
      toast.success('Login Successful.', {
        position: "top-right"
      })
      navigate(location?.state? location?.state:"/");
    })
    .catch(err=>{
      toast.error(err?.code);
    })

  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
            name='email'
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
            name='password'
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <button onClick={handleGoogleLogin} className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
            <img
              src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
              alt="Google"
              className="w-7 h-7"
            />
            <span className="text-gray-700 font-medium">Login with Google</span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
