import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

export default function Register() {
  const { createUserProfile, updateUserProfile, googleLogin } = useContext(authContext);
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (!name || !email || !photoURL || !password) {
      toast.error('All fields are required!', { position: 'top-right' });
      return;
    }
  

    if (!passwordValidation(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.',
        { position: 'top-right' }
      );
      return;
    }

    createUserProfile(email, password)
      .then((res) => {
        updateUserProfile({ displayName: name, photoURL })
          .then(() => {
            toast.success('Successfully Registered', { position: 'top-right' });
            navigate('/');
          })
          .catch((err) => {
            toast.error(err.code, { position: 'top-right' });
          });
      })
      .catch((err) => {
        toast.error(err.code, { position: 'top-right' });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res?.user);
        toast.success('Google Login Successful.', { position: 'top-right' });
        navigate('/');
      })
      .catch((err) => {
        toast.error(err?.code, { position: 'top-right' });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="Enter a photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <img
              src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
              alt="Google"
              className="w-7 h-7"
            />
            <span className="text-gray-700 font-medium">Register with Google</span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
