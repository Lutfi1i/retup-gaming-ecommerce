import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Productoverview = () => {    
const [quantity, setQuantity] = useState(12);

  return (
   <div className="max-w-[1400px] mx-auto px-4 font-helvetica-light">
    <div className="py-4">
        <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/products" className="text-gray-500 hover:text-black">Products</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-black truncate">Ku Merasa</span>
        </nav>
    </div>

    <div className="flex flex-col md:flex-row gap-8 py-8">
        {/* Left - Images */}
        <div className="md:w-1/2">
            <div className="flex">
                {/* Static Main Image */}
                <div className="flex-1 border border-gray-200">
                    <div>
                        <img
                            src="/path/to/static-image.jpg"
                            alt="Product"
                            className="w-full h-full object-contain p-1"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Right - Detail */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 font-ag-futura">Press Play TITAN80 / TITAN 80 Aluminum Mechanical Keyboard BAREBONES</h1>
          <div>
            <span className="text-2xl font-bold">Rp120.000</span>
          </div>
          <div className='mt-2'>
            <p className="text-gray-700">Stok: Available</p>
          </div>

          {/* Quantity */}
          <div className="mb-10 mt-12">
            <p className="mb-2">Quantity</p>
            <div className="flex items-center">
              <button 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className="mx-4">{quantity}</span>
              <button 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
          </div>

          <div className="space-y-3 mt-10">
            <button 
              className="w-full py-4 border border-black bg-white font-medium rounded-full hover:bg-gray-100 font-ag-futura text-xl"
            >
              Buy Now
            </button>
            <button 
              className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 font-ag-futura text-xl"
            >
              Add to cart
            </button>
          </div>

          {/* Share Button */}
          <div className="mt-6">
            <button className="inline-flex items-center">
              <Icon icon="solar:share-bold" className="w-8 h-10" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-xl font-semibold mb-8">Deskripsi</h2>
        <p className="text-gray-600 text-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold mb-4">Spesifikasi Produk</h2>
        <div className="text-gray-600">
          <p>Category: Topi Jerami</p>
          <p>Rating: 0</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold my-4">Produk Terkait</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        </div>
      </div>
    </div>
  )
}

export default Productoverview;