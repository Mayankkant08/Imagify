import React, { useContext } from 'react';
import {assets} from '../assets/assets';
import {Link, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();
    
    return (
        <div className='flex items-center justify-between py-4'>
            <Link to='/'>
                <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:40" />
            </Link>
            <div>
                {
                user ? 
                <div className='flex items-center gap-2 sm:gap-3'>
                   <button onClick={()=>navigate('/buy-credit')}className='flex items-center gap-2 bg-gradient-to-r from-purple-400 to-purple-700 hover:from-purple-300 hover:to-purple-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'>
                        <img src={assets.credit_star} alt="" className="w-5" /> 
                        {credit !== null && (
                        <p className='cursor-pointer text-xs sm:text-sm font-medium text-white'>
                            Credits left: {credit}
                        </p>
                        )}
                    </button>
                    <p className='text-shadow-white max-sm:hidden pl-4'>Hi, {user.name}</p>
                    <div className='relative inline-block group'>
                        <img src={assets.profile_icon} alt="" className="w-10 drop-shadow cursor-pointer rounded-full" />

                        <div className='absolute right-0 top-full hidden group-hover:block z-10'>
                            <ul className='list-none m-0 p-2 bg-sky-600 rounded shadow-lg'>
                                <li>
                                    <button onClick={logout} className='cursor-pointer w-full  text-white text-sm font-medium px-4 py-1 rounded focus:outline-none focus:ring-sky-400'>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>





                </div>
                :
                <div className='flex items-center gap-2 sm:gap-5'>
                    <p onClick={()=>navigate('/buy-credit')} className='cursor-pointer'>Pricing</p>
                    <button onClick={()=>setShowLogin(true)} className="cursor-pointer bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-200">Login</button>

                </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
