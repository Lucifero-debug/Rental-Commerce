'use client'; // Make this component a client component
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useWixClient } from "@/hooks/useWixClient"; // Ensure you have your custom hook
import { useAuth } from '@/context/userContext';

const ProfileForm = ({ profileData }) => {
  const router = useRouter();
  const wixClient = useWixClient(); // Ensure you have the Wix client
  const { setSeller } = useAuth();

  const handleLogout = async () => {
    Cookies.remove("refreshToken");  
    Cookies.remove("accessToken");
    Cookies.remove("user");
    localStorage.clear();
setSeller(null)

    try {
      // Log the user out via Wix and redirect to login
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      localStorage.removeItem('cartCounter');
      router.push('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Full Name</label>
          <p className="text-lg">{profileData?.profile?.nickname}</p>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <p className="text-lg">{profileData?.loginEmail}</p>
        </div>
        
      </div>
      <div className="flex justify-center gap-5 mt-8">
        <button className='bg-black text-white rounded-lg px-6 py-2' onClick={handleLogout}>LOG OUT</button>
      </div>
    </>
  );
};

export default ProfileForm;
