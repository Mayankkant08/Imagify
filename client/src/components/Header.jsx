import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Top Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-6 py-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="font-medium">Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      >
        Create the unseen AI{' '}
        <span className="text-blue-600">images</span> from your thoughts.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-center max-w-xl mx-auto mt-5 text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art in seconds — just type, and watch the magic happen.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className="cursor-pointer sm:text-lg text-white bg-gradient-to-r from-indigo-500 to-sky-500 mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:brightness-110 hover:scale-105 hover:shadow-[0_0_18px_#60a5fa] tracking-wide font-semibold"
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className="flex flex-wrap justify-center items-center mt-16 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(6).fill('').map((_, index) => (
          <motion.img
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded transition-all duration-300 cursor-pointer max-sm:w-10"
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="sample"
            width={70}
          />
        ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        className="mt-2 text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
