import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-white/10 backdrop-blur-md mt-32 text-gray-800 transition-all duration-300">
            {/* Top Separator Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black/30" />

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-white/20">
                
                {/* Branding */}
                <div>
                    <div className="flex items-center gap-3 mb-4 -mt-7">
                        <Link  to = "/">
                            <img
                                src={assets.logo}
                                alt="Imagify Logo"
                                className="w-28 h-20 sm:w-32 lg:w-40 sm:h-24 transition-transform duration-300 hover:scale-105"
                            />
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                        Generate high-quality AI images from text in seconds. Built for creatives, developers & dreamers.
                    </p>
                </div>

                {/* Explore Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black transition">Features</li>
                        <li className="hover:text-black transition">Pricing</li>
                        <li className="hover:text-black transition">How it works</li>
                        <li className="hover:text-black transition">Generate</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black transition">About Us</li>
                        <li className="hover:text-black transition">Blog</li>
                        <li className="hover:text-black transition">Careers</li>
                        <li className="hover:text-black transition">Press</li>
                    </ul>
                </div>

                {/* Support & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black transition">Help Center</li>
                        <li className="hover:text-black transition">Terms of Service</li>
                        <li className="hover:text-black transition">Privacy Policy</li>
                        <li className="hover:text-black transition">Contact Us</li>
                    </ul>

                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform">
                            <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center text-xs text-gray-500 py-4 border-t border-white/20">
                © {new Date().getFullYear()} Imagify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
