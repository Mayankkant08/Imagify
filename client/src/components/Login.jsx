import React, { useContext, useEffect, useState } from 'react';
import userIcon from '../assets/profile_icon.png';
import emailIcon from '../assets/email_icons.png';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? `${backendUrl}/api/user/login`
        : `${backendUrl}/api/user/register`;

      const payload = isLogin ? { email, password } : { name, email, password };
      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <div className="relative w-[460px] h-[500px] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <div
          className={`absolute top-0 flex w-[200%] h-full transition-transform duration-700 ease-in-out ${
            isLogin ? 'translate-x-0' : '-translate-x-1/2'
          }`}
        >
          {/* Login Form */}
          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ opacity: 0.2, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-1/2 px-8 py-12 text-white flex flex-col justify-center items-center space-y-5 text-center"
          >
            <div className="w-full space-y-1">
              <h1 className="text-xl font-bold tracking-wide">Welcome Back</h1>
              <p className="text-sm text-gray-400">Login to your account</p>
            </div>
            <div className="w-full space-y-3">
              <div className="border border-gray-600 px-4 py-2.5 flex items-center gap-3 rounded-full">
                <img src={emailIcon} alt="email" className="w-4 h-4" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full outline-none placeholder-gray-400 text-white text-sm"
                />
              </div>
              <div className="border border-gray-600 px-4 py-2.5 flex items-center gap-3 rounded-full">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent w-full outline-none placeholder-gray-400 text-white text-sm"
                />
              </div>
              <div className="w-full text-right">
                <span className="text-xs text-blue-300 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2.5 rounded-full hover:brightness-110 transition text-sm"
              >
                Login
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-400 cursor-pointer underline"
              >
                Register
              </span>
            </p>
          </motion.form>

          {/* Register Form */}
          <form
            onSubmit={onSubmitHandler}
            className="w-1/2 px-8 py-12 text-white flex flex-col justify-center items-center space-y-5 text-center"
          >
            <div className="w-full space-y-1">
              <h1 className="text-xl font-bold tracking-wide">Create Account</h1>
              <p className="text-sm text-gray-400">Register to get started</p>
            </div>
            <div className="w-full space-y-3">
              <div className="border border-gray-600 px-4 py-2.5 flex items-center gap-3 rounded-full">
                <img src={userIcon} alt="user" className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent w-full outline-none placeholder-gray-400 text-white text-sm"
                />
              </div>
              <div className="border border-gray-600 px-4 py-2.5 flex items-center gap-3 rounded-full">
                <img src={emailIcon} alt="email" className="w-4 h-4" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full outline-none placeholder-gray-400 text-white text-sm"
                />
              </div>
              <div className="border border-gray-600 px-4 py-2.5 flex items-center gap-3 rounded-full">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent w-full outline-none placeholder-gray-400 text-white text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-2.5 rounded-full hover:brightness-110 transition text-sm"
              >
                Register
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <span
                onClick={() => setIsLogin(true)}
                className="text-teal-400 cursor-pointer underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>

        {/* Close Button */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 h-4 cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
};

export default Login;
