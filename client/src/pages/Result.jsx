import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input,setInput] = useState('');

  const {generateImage} = useContext(AppContext)
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh] justify-center items-center">
      {/* Image with loading bar */}
      <div>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </div>

      {/* Search bar */}
      {!isImageLoaded && 
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm mt-10 rounded-full overflow-hidden shadow-md backdrop-blur-md
                        transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_#6b7280] hover:ring-2 hover:ring-sky-400/30">
          <input
            onChange={e => setInput(e.target.value)} value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 px-6 py-3 bg-transparent outline-none bg-gray-300 placeholder-white"
          />
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-6 sm:px-10 py-3 transition-all duration-300 ease-in-out
                      hover:brightness-125 hover:scale-[1.03] hover:shadow-[0_0_20px_#60a5fa] focus:outline-none focus:ring-4 focus:ring-indigo-400 rounded-full"
          >
            Generate
          </button>
        </div>
      }

      {/* Action buttons */}
      {isImageLoaded &&
        <div className="flex gap-4 mt-8">
          {/* Generate Another */}
          <p onClick={() => {setIsImageLoaded(false);}}
            className="pointer-cursor bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-6 sm:px-10 py-3 rounded-full transition-all duration-300 ease-in-out
                      hover:brightness-125 hover:scale-[1.03] hover:shadow-[0_0_20px_#60a5fa] focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Generate Another
          </p>

          {/* Download button with larger sparkles */}
          <a
            href={image}
            download
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white px-6 sm:px-10 py-3 rounded-full font-semibold tracking-wide
                      transition-all duration-300 ease-in-out shadow-md
                      hover:scale-105 hover:shadow-[0_0_18px_#facc15] focus:outline-none focus:ring-2 focus:ring-yellow-400 overflow-hidden"
          >
            <span className="relative z-10">Download</span>

            {[
              { top: 'top-0', left: 'left-2', delay: 'delay-100' },
              { top: 'top-1', right: 'right-3', delay: 'delay-200' },
              { bottom: 'bottom-1', left: 'left-3', delay: 'delay-300' },
              { bottom: 'bottom-2', right: 'right-4', delay: 'delay-400' },
              { top: '-top-2', left: 'left-1/2 -translate-x-1/2', delay: 'delay-500' },
              { bottom: '-bottom-2', left: 'left-1/2 -translate-x-1/2', delay: 'delay-600' },
              { top: 'top-1/2 -translate-y-1/2', left: '-left-2', delay: 'delay-700' },
              { top: 'top-1/2 -translate-y-1/2', right: '-right-2', delay: 'delay-800' },
            ].map((pos, i) => (
              <svg
                key={i}
                className={`absolute ${pos.top || ''} ${pos.bottom || ''} ${pos.left || ''} ${pos.right || ''} w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${pos.delay}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l1.45 4.72H18l-3.76 2.73L15.7 14 12 11.27 8.3 14l1.46-4.55L6 6.72h4.55L12 2z" />
              </svg>
            ))}
          </a>
        </div>
      }
    </motion.form>
  );
};

export default Result;
