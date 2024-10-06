// app/profile/page.js
import React from 'react';
import { wixClientServer } from "@/lib/wixClientServer";
import ProfileForm from '../../components/ProfileForm';
import Image from 'next/image';
import {members} from '@wix/members'

const ProfilePage = async () => {
  const wixClient = await wixClientServer();
  
  // Fetch user data here
 

  let profileData;
  try {
    profileData = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
    console.log("member",profileData)
    if (!profileData.member) {
      throw new Error("Member data is not available.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // return <div>Error fetching user data. Please try again later.</div>;
  }

  const nickname = profileData?.member?.profile?.nickname || "User";
  const firstLetter = nickname.charAt(0).toUpperCase();

  // Fallback image styling
  const fallbackImageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '128px', // You can adjust this size as needed
    height: '128px',
    borderRadius: '50%',
    backgroundColor: 'black', // Customize the background color
    color: 'white',
    fontSize: '48px', // Adjust font size
  };



  return (
    <div className="min-h-screen bg-gray-100 sm:mt-32">
      {/* Top Bar (Amazon Style) */}
      <div className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Your Account</h1>
        </div>
      </div>
      <div className="container mx-auto flex mt-8 p-4 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-4 md:mb-0">
          <div className="text-center mb-8">
          {profileData?.profileImage ? (
              <Image
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 border"
                width={128} // Use the same size as your fallback
                height={128} // Use the same size as your fallback
              />
            ) : (
              <div style={fallbackImageStyle} className='mx-auto mb-4'>
                {firstLetter}
              </div>
            )}
            <h2 className="text-2xl font-bold">{profileData?.member?.profile?.nickname}</h2>
            <p className="text-gray-500">{profileData?.member?.loginEmail}</p>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-lg">
          <ProfileForm profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
