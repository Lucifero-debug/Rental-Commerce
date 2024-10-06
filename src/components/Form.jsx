'use client';
import React, { useState, useEffect } from 'react';
import { CldUploadButton } from 'next-cloudinary';

function Form({ name, onAddSuccess }) {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [url,setUrl]=useState("")
  const [isUploading, setIsUploading] = useState(false);
  const [isProduct,setIsProduct]=useState(false);

  useEffect(() => {
    const fetchedCategories = JSON.parse(localStorage.getItem('category')) || [];
    setCategory(fetchedCategories);
  }, []);

  const handleImageUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files); // Store selected files

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      console.log("images", selectedFiles[0]);
      formData.append('file', selectedFiles[0]);
      formData.append('action', 'upload');

      try {
        setIsUploading(true); // Set uploading state to true

        const responseImg = await fetch('/api/cloudinary', {
          method: 'POST',
          body: formData,
        });

        if (!responseImg.ok) {
          throw new Error('Failed to upload image');
        }

        const imageUrl = await responseImg.json();
        setUrl(imageUrl.url); // Set the image URL state
        console.log("Uploaded image URL:", imageUrl.url);
      } catch (error) {
        console.error("Error uploading images", error);
      } finally {
        setIsUploading(false); // Reset uploading state
      }
    }
  };
console.log("image url",url)

  const uploadProduct = async (e) => {
    e.preventDefault();
    if (!url) { // Check if the URL is valid before proceeding
      console.error("Image URL is not set. Cannot upload product.");
      return;
    }


    const productData = {
        product: {
            name: productName, // Use the state variable for product name
            description: productDescription, // Use the state variable for description
            priceData: {
                price: parseInt(productPrice), // Ensure price is a number
               
            },
            productType:'physical',
            image:url,
            collection:collection,
            brand:name
        },
    };

    console.log("Data to be given", productData);

    try {
      setIsProduct(true)
        const response = await fetch('/api/uploadProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Product created successfully:", data);
        onAddSuccess()
        setIsProduct(false)
    } catch (error) {
        console.error("Error creating product:", error.message);
    }
};

  return (
    <form className="mt-6 space-y-6" onSubmit={uploadProduct}>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Product Name</label>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Enter product name"
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Enter product price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Description</label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Enter product description"
          rows="4"
          onChange={(e) => setProductDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Category</label>
        <select
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          onChange={(e) => setCollection(e.target.value)}
        >
          {category.map((cat) => (
            <option value={cat._id} key={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Images</label>
        {/* <CldUploadButton
          uploadPreset="hashing" // Replace with your upload preset
          onUpload={handleImageUpload} // Handle successful uploads
          onError={(err) => console.error("Upload failed:", err)} // Handle errors
        >
          Upload Image
        </CldUploadButton> */}
        <input type='file' onChange={handleImageUpload} disabled={isUploading} />
        {isUploading && <p>Uploading image...</p>}
      </div>
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-2">Seller</label>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={name}
          readOnly
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md focus:ring-4 focus:ring-green-300"
      >
      {isProduct?'Uploading...':'Add Product'}
      </button>
    </form>
  );
}

export default Form;
