import React from 'react'
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DealsCard from '../components/DealsCard';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/fetchproduct';

const Landingpage = () => {
  const bannerImage = [
    { url: "./assets/mksgmdpd.png" }
  ];

const [productShow, setProductShow] = useState([]);
const [productCard, setProductCard] = useState([]);

useEffect(() => {
  fetchProducts().then((products) => {
    setProductShow(products.slice(0, 2)),
    setProductCard(products.slice(0, 6));
  });
}, []);;


  const Category = [
    { id: 1, name: 'Mouse', image: './categories-icon/mouse.png', path: '/category/mouse' },
    { id: 2, name: 'Keyboard', image: './categories-icon/keyboard.png', path: '/category/keyboard' },
    { id: 3, name: 'Gamepad', image: './categories-icon/gamepad.png', path:'/category/gamepad' },
    { id: 4, name: 'Deskmat', image: './categories-icon/deskmat.png', path:'/category/mousepad' },
    { id: 5, name: 'Accessories', image: './categories-icon/acc.png', path:'/category/' },
  ]


  return (
    <div>
      <div className="relative w-full h-auto overflow-hidden">
        <img 
          src={bannerImage[0].url} 
          className="w-full h-auto object-contain" 
          alt="Banner" 
        />
      </div>

      
      <div className="max-w-[1100px] mx-auto">
        <div className="mt-20">
          <div className='border-t border-gray-200 mb-10'></div>
          <div className="flex flex-wrap gap-20 pb-4 justify-center font-helvetica-light">
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 pb-6 font-helvetica-light">
            {Category.map((category) => (
            <Link
              to={category.path}
                className="flex flex-col items-center transition-transform hover:scale-110"
            >
            <div className="w-20 h-20 mb-2">
             <img
            src={category.image}
            className="w-full h-full object-contain"
            />
            </div>
            <span className="text-sm text-center text-gray-700">{category.name}</span>
            </Link>
          ))}
          </div>
            <div className="flex items-center justify-center">
              <button className="text-gray-600 bg-gray-100 rounded-full p-2">
              </button>
            </div>
          </div>
        </div>

        <p className='text-center font-ag-futura text-2xl mt-20'>Deals Today</p>
        <div className='hidden md:inline'>
          <div className='mt-20 mb-20'>
            <div className="grid grid-cols-2 gap-6">
              {productShow.map((product) => (
                <DealsCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className='font-bold mt-10 mb-10 text-center text-2xl'>Produk Terlaris</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
            {productCard.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='mb-20'>
          </div>
          
    <div className='mt-50'>
       <div className="w-full h-auto bg-white flex-row items-center justify-between flex font-helvetica-light md:grid-cols-3 py-8">
    <div className="justify-center items-center flex flex-col">
      <img src="/footerAssets/7days.png" className="items-center" />
    <p className="max-w-[300px] text-center p-2 text-sm md:text-base">
      Get better promos, better prices when you shop directly with our website. Best value that you won't get on any other platform!
    </p>
    </div>

     <div className="justify-center items-center flex flex-col">
      <img src="/footerAssets/7days.png" className="items-center" />
    <p className="max-w-[300px] text-center p-2 text-sm md:text-base">
      Get better promos, better prices when you shop directly with our website. Best value that you won't get on any other platform!
    </p>
    </div>


    <div className="justify-center items-center flex flex-col">
      <img src="/footerAssets/7days.png" className="items-center" />
    <p className="max-w-[300px] text-center p-2 text-sm md:text-base">
      Get better promos, better prices when you shop directly with our website. Best value that you won't get on any other platform!
    </p>
      </div>
      </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage
