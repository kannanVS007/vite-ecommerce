import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img className='mb-5 w-32' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>At Riyas Couture, we believe that fashion is more than just clothing—it's an expression of individuality, culture, and confidence. Each piece in our collection is thoughtfully designed to bring out the beauty in every woman, offering styles that blend tradition with contemporary trends.</p>
          <div className="flex space-x-6 mt-8">
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Youtube size={24} className="text-red-600 transition-all duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://www.instagram.com/riyas_couture_?igsh=NGIzcHJiem85cWg5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Instagram size={24} className="text-pink-600 transition-all duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Facebook size={24} className="text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </div>
            </a>
            <a href="https://wa.me/9843929032" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg">
                <WhatsAppIcon style={{ fontSize: 24 }} className="text-green-600 transition-all duration-300 group-hover:scale-110" />
              </div>
            </a>
          </div>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/shipping-and-delivery">Shipping and Delivery</Link></li>
            <li><Link to="/return-policy">Return Policy</Link></li>
            <li><Link to="/privacy-policy">Privacy policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 98439 29032</li>
            <li>Contact@riyascouture.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;