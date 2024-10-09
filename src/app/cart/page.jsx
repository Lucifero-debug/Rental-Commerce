"use client"

import Image from "next/image"
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
// import { currentCart } from "@wix/ecom";
import { useCartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";
import Link from "next/link";

const CartModal = () => {

  const wixClient = useWixClient();
  const { cart, isLoading, removeItem,getCart } = useCartStore();

  useEffect(()=>{
    getCart(wixClient)
  },[getCart,wixClient])

  console.log("cartyr",cart)

  return (
    <div className="sm:w-full sm:h-full mt-52 sm:mt-52 md:mt-40 flex justify-center">
     {!cart.lineItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
    <div className="w-[70vw] sm:w-[60vw] p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white  flex flex-col gap-6">
        
      <h2 className="text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-8">
      {cart.lineItems.map((order)=>(
        <div className="flex gap-4" key={order._id}>
        {order.image && (
          <Image src={wixMedia.getScaledToFillImageUrl(
            order.image,
            72,
            96,
            {}
          )} alt=""  className="object-cover rounded-md" width={72} height={96}/>
        )}
        
        <div className="flex flex-col justify-between w-full">
        <div className="">
            {/* title */}
        <div className="flex items-center justify-between gap-8">
        <h3 className="font-semibold">
        {/* {item.productName?.original} */}
        {order.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                       
                      <div className="text-xs text-green-500 whitespace-nowrap">
                          {order?.quantity} x{" "}
                          </div>
                      
                          {order.fullPrice?.amount}
                        </div>
            </div>
            {/* desc */}
            <div className="text-sm text-gray-500">
                    {order.availability?.status}
                    </div>
            </div>
            {/* bottom */}
            <div className="flex justify-between text-sm">
            <span className="text-gray-500">Qty. {order?.quantity}</span>
            <span
                      className="text-blue-500"
                      style={{ cursor:  "pointer" }}
                      onClick={() => removeItem(wixClient, order._id)}
                    >
                      Remove
                    </span>
                </div>
            </div>
        </div>
      ))
        }
            {/* top */}

        </div>
        {/* bottom */}
        <div className="">
        <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">&#x20B9;{cart.subtotal?.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
            {/* <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button> */}
              <Link href={'/checkout'} className="w-full">
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                disabled={isLoading}
                // onClick={()=>router.push('/checkout')}
              >
               Proceed To Checkout
              </button>
              </Link>
                </div>
            </div>
      
            </div>
        </>
        )}
    </div>
  )
}

export default CartModal
