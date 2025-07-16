import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {

  const {user,backendUrl,loadCreditsData,token,setShowLogin} = useContext(AppContext);

  const navigate = useNavigate()
  const initPay = async(order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description:'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        try {
          const {data} = await axios.post(`${backendUrl}/api/user/verify-razor`,response,{headers:{token}})
          if(data.success){
            loadCreditsData();
            navigate('/')
            toast.success('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const paymentRazorpay = async(planId)=>{
    try {
      if(!user){
        setShowLogin(true)
      }
      const {data} = await axios.post(`${backendUrl}/api/user/pay-razor`,{planId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    className="min-h-[80vh] text-center pt-14 mb-10 bg-[#fffdd0]">
      <button className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium shadow-md mb-6">
        Our Plans
      </button>

      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6 sm:mb-10">
        Choose the plans
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-3xl p-8 w-[300px] shadow-md border border-gray-700
                       transition-transform duration-500 hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
          >
            <img src={assets.logo_icon} alt="plan-icon" className="w-10 h-10 mb-4" />

            <p className="text-xl font-semibold mb-1">{item.id}</p>
            <p className="text-sm text-gray-300 mb-5">{item.desc}</p>

            <p className="text-2xl font-bold mb-8">
              ₹{item.price}
              <span className="text-sm font-medium text-gray-400"> / {item.credits} Credits</span>
            </p>

            <button
              onClick={()=>paymentRazorpay(item.id)}
              className="cursor-pointer w-full py-2 bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold rounded-full transition-all duration-300 ease-in-out
                         hover:scale-[1.04] hover:shadow-[0_0_16px_#60a5fa]"
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
