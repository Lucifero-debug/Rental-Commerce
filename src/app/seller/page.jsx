'use client'
import Form from '@/components/Form';
import Image from 'next/image';
import React,{useState,useEffect, useCallback} from 'react';
import { FaBoxOpen, FaDollarSign, FaTrashAlt, FaEdit, FaInfoCircle } from 'react-icons/fa';
import Cookies from "js-cookie";

const SellerPage = () => {
const [seller,setSeller]=useState()
const [product,setProduct]=useState([])
const [shouldFetchProducts, setShouldFetchProducts] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if(userCookie){
      const user = JSON?.parse(userCookie);
      setSeller(user)
    }
  }, []);

  const fetchProduct = useCallback(async () => {
    const brand = seller?.profile?.nickname;
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProduct(data._items);
      console.log("Product fetched successfully:", data._items);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  }, [seller]);
useEffect(() => {
  if (seller?.profile?.nickname) {
    fetchProduct();
    setShouldFetchProducts(false); 
  }
}, [seller,shouldFetchProducts,fetchProduct]);

const handleDelete=async(id)=>{
 const productId=id
 try {
  const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const data = await response.json();
  setProduct(data._items)
  setShouldFetchProducts(true);
} catch (error) {
  console.error("Error deleting product:", error.message);
}
}
console.log("Product deleted successfully:", product);

const handleAddProductSuccess = () => {
  setShouldFetchProducts(true); // Set the state to fetch products again after adding a product
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-24 sm:mt-40">
      {/* Seller Header */}
      <div className="container mx-auto bg-white p-10 rounded-xl shadow-2xl max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-900 tracking-wide">
          Seller Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Manage your clothing products and online store efficiently.
        </p>
      </div>

      {/* Seller Info Section */}
      <div className="container mx-auto bg-white p-8 mt-12 rounded-xl shadow-lg max-w-7xl">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700 flex items-center">
          <FaBoxOpen className="text-blue-500 mr-3" /> Seller Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Name:</span> {seller?.profile?.nickname}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Email:</span> {seller?.loginEmail}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-800">Total Products:</span> {product.length}
          </p>
        </div>
      </div>

      {/* Add Product Section */}
      <div className="container mx-auto bg-white p-8 mt-12 rounded-xl shadow-lg max-w-7xl">
        <h2 className="text-3xl font-semibold text-gray-700 flex items-center">
          <FaDollarSign className="text-green-500 mr-3" /> Add New Product
        </h2>
       <Form name={seller?.profile?.nickname} onAddSuccess={handleAddProductSuccess}/>
      </div>

      
      <div className="container mx-auto bg-white p-8 mt-12 rounded-xl shadow-lg max-w-7xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 flex items-center">
          <FaBoxOpen className="text-yellow-500 mr-3" /> Your Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {product.map((prod) => (
    <div className="border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300" key={prod._id}>
      <Image
        src={prod?.media?.mainMedia?.image?.url}
        alt="Product"
        className="mb-4 w-full h-48 object-cover rounded-lg"
        width={200}
        height={100}
      />
      <h3 className="text-lg font-semibold text-gray-800">{prod?.name}</h3>
      <p className="text-gray-600 mt-2">
        Price: <span className="font-bold">&#8377;{prod?.price?.price}</span>
      </p>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center">
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center"
          onClick={() => handleDelete(prod._id)}
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};




export default SellerPage;