import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const GenerateBtns = () => {

    const {user,setShowLogin} = useContext(AppContext);
    const navigate = useNavigate()

    const onClickHandler = () => {
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        className='pb-16 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>
            <button onClick={onClickHandler}className="cursor-pointer inline-flex items-center gap-2 px-12 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white m-auto shadow-mdtransition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110 hover:shadow-[0_0_18px_#60a5fa]">
                Generate Images
                <img src={assets.star_group} alt="" className="h-6" />
            </button>
        </motion.div>
    );
};

export default GenerateBtns;
