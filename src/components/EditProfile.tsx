import React, { useState } from "react";
import DP from "../assets/dp.png";
import EditIMG from "../assets/edit img.png";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(DP);
  const [savedMessage, setSavedMessage] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result.toString()); // Set uploaded image as profile picture
        }
      };
      reader.readAsDataURL(file); // Read image file as base64
    }
  };

  const handleSave = () => {
    if (newProfileImage) {
      setProfileImage(newProfileImage); // Apply the new image as the profile picture
      setNewProfileImage(null); // Clear the temporary imag
    // Clear the message after 3 seconds
    
    setSavedMessage('Saved!'); // Set the saved message
  }
    setTimeout(() => {
      setSavedMessage('');
    }, 5000);

    alert('saved')
    };
    

  const [newProfileImage, setNewProfileImage] = useState(null);

  return (
    <div className="max-w-4xl mx-auto mt-1">

      {/* Overall Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Handler */}
        <div className="flex flex-col items-center md:items-start w-5em">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
            <label className="absolute bottom-0 right-[-12px] p-1 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <img src={EditIMG} alt="Edit" />
            </label>
          </div>
        </div>

        {/* Form Fields (Two Columns) */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="">
            <label className="block mb-2 text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="Charlene Reed"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="charlenereed@gmail.com"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Permanent Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="San Jose, California, USA"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Postal Code</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="45962"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block mb-2 text-sm font-medium">User Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="Charlene Reed"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="San Jose, California, USA"
            />


            <label className="block mt-4 mb-2 text-sm font-medium">Present Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="San Jose, California, USA"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">City</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="San Jose"
            />

            <label className="block mt-4 mb-2 text-sm font-medium">Country</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
              defaultValue="USA"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button onClick={handleSave} className="px-14 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 focus:outline-none">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
