// app/profile/page.js
'use client'
import React, { useState,useEffect } from 'react';
import ProfileForm from '../../components/ProfileForm';
import Image from 'next/image';
import Cookies from "js-cookie";

const ProfilePage =  () => {
 const [profileData,setProfileData]=useState(null)

 useEffect(() => {
  const userCookie = Cookies.get("user");
  if(userCookie){
    const user = JSON?.parse(userCookie);
    setProfileData(user)
    console.log("pankaj londiyo",user)
  }
}, []);

useEffect(()=>{
},[profileData])
  return (
    <ProfileContent profileData={profileData} />
  );
};

const ProfileContent = ({ profileData }) => {
  const member = profileData || {};
  const nickname = member?.profile?.nickname || "User";
  const firstLetter = nickname?.charAt(0).toUpperCase();

  // Fallback image styling
  const fallbackImageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '128px',
    height: '128px',
    borderRadius: '50%',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '48px',
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-52 sm:mt-52">
      <div className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Your Account</h1>
        </div>
      </div>
      <div className="container mx-auto flex mt-8 p-4 flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-4 md:mb-0">
          <div className="text-center mb-8">
            {member?.profileImage ? (
              <Image
                src={member?.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 border"
                width={128}
                height={128}
              />
            ) : (
              <div style={fallbackImageStyle} className='mx-auto mb-4'>
                {firstLetter}
              </div>
            )}
            <h2 className="text-2xl font-bold">{nickname}</h2>
            <p className="text-gray-500">{member?.loginEmail}</p>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-lg">
          <ProfileForm profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
