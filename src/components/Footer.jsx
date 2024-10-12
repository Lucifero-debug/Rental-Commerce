'use client'
import React from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HelpIcon from '@mui/icons-material/Help';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();

  const handleClick=(e)=>{
    router.push('/seller')
    }

  return (
    <div className="bg-black text-gray-300 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Company Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Company</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Careers</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Terms of Use</a></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Help</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">FAQ</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Shipping</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Returns</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Order Tracking</a></li>
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Community</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white">Blog</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Forums</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Feedback</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Follow Us</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-white"><span className=' text-white w-[30vw] h-[30vh]'><FacebookIcon/></span>&nbsp;Facebook</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white"><span className=' text-white w-[30vw] h-[30vh]'><XIcon/></span>&nbsp;Twitter</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white"><span className=' text-white w-[30vw] h-[30vh]'><InstagramIcon/></span>&nbsp;Instagram</a></li>
          </ul>
        </div>
        <div className="hidden md:block border-l border-gray-700 h-[26vh] mx-4"></div>
        <div className="mail ">
            <h1 className='font-bold text-lg'>MAIL US</h1>
            <p className='hover:text-white'>example@gmail.com</p>
        </div>
        <div className="add">
            <p className='font-bold text-lg'>Registered office address</p>
            <p className='hover:text-white'>example,skdhiusdd,xhxdhede,</p>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-gray-700 pt-4 grid grid-cols-4 md:flex justify-around">
      <div className="sell flex flex-col md:flex-row items-center gap-2 cursor-pointer">
      <div><StorefrontIcon/></div>
        <button className='bg-transparent' onClick={handleClick}>Become A Seller</button>
      </div>
      <div className="sell flex flex-col md:flex-row items-center gap-2 cursor-pointer">
      <div><HelpIcon/></div>
        <button className='bg-transparent'>Help</button>
      </div>
        <p className="text-sm">&copy; 2024 Flipkart Clone. All Rights Reserved.</p>
        <div className="card">card</div>
      </div>
    </div>
  );
}

export default Footer;
