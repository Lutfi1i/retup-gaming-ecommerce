import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import DealsCard from '../components/DealsCard';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/fetchproduct';
import { Fade } from 'react-awesome-reveal';
import { Shield, Truck, Gift} from 'lucide-react';


const Landingpage = () => {
 const bannerImage = [
   { 
      url: "/assets/mksgmdpd.png",
      title: "Gamepad Collection",
      cta: "/category/gamepad"
    },
    { 
      url: "/assets/mouse1.png",
      title: "Gaming Mouse Gear",
      cta: "/category/mouse"
    },
    {
      url:"https://akkogear.eu/cdn/shop/files/Akko-MU02-ISO-DE-Mountain-Seclusion-Banner-2800-1000.jpg?v=1733134646&width=2800",
      title: "Keyboard Lenovo",
      cta: "/category/keyboard"
    }
  ];

const [productShow, setProductShow] = useState([]);
const [productCard, setProductCard] = useState([]);
const [productDeals, setProductDeals] = useState([]);
const [isVisible, setIsVisible] = useState(false);
const [imageNow, setImageNow] =useState(0)
const scrollPdct = useRef(null);

setTimeout(() => setIsVisible(true), 100);

useEffect(() => {
  fetchProducts().then((products) => {
    const filteredProducts = products.filter((product) =>
      [7, 9, 11].includes(product.id)
    );
    const DealsProducts = products.filter((product) =>
    [9,11].includes(product.id)
    )
    setProductShow(filteredProducts);
    setProductDeals(DealsProducts)
    setProductCard(products.slice(0, 6));
  });
}, []);


  const Category = [
    { id: 1, name: 'Mouse', image: './categories-icon/mouse.png', path: '/category/mouse' },
    { id: 2, name: 'Keyboard', image: './categories-icon/keyboard.png', path: '/category/keyboard' },
    { id: 3, name: 'Gamepad', image: './categories-icon/gamepad.png', path:'/category/gamepad' },
    { id: 4, name: 'Deskmat', image: './categories-icon/deskmat.png', path:'/category/mousepad' },
    { id: 5, name: 'Accessories', image: './categories-icon/acc.png', path:'/category/other' },
  ]
  
   const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on orders over Rp 500,000' },
    { icon: Shield, title: '7 Days Return', desc: '7-day hassle-free return guarantee' },
    { icon: Gift, title: 'Best Deals', desc: 'Exclusive offers you won\'t find elsewhere' }
  ];

  const scrollToTheRight = () => {
    scrollPdct.current.scrollBy({ left: 600, behaviour: 'smooth '});
  };

  const scrollToTheLeft = () => {
    scrollPdct.current.scrollBy({ left: -600, behaviour: 'smooth '});
  };
  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setImageNow((prev) => (prev + 1) % bannerImage.length);
    }, 3000);
  
    return () => clearInterval(slideInterval);
  }, [bannerImage.length]);


  return (
    <div>
      <div className="relative w-full  overflow-hidden">
        {/* Hero Banner Slider */}
        <div className="relative w-full md:h-[600px] h-[200px] overflow-hidden">
          {/* Image Slider */}
          <div className="relative w-full h-full">
            {bannerImage.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                  index === imageNow ? 'translate-x-0' :
                  index < imageNow ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={banner.url} 
                    className="w-full object-contain" 
                    alt={`Banner ${index + 1}`} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Content Overlay */}
          <div className="justify-center absolute inset-0 z-99 flex items-center">
            <div className="flex mt-100">
              <Link to={bannerImage[imageNow].cta}>
                <button className={`rounded bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
                  style={{ animationDelay: '400ms' }}>
                  {bannerImage[imageNow].title}
                </button>
              </Link>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-3">
              {bannerImage.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageNow(index)}
                  className={`w-10 h-1 transition-all duration-300 rounded-full ${
                    index === imageNow ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/*Isi Keseluruhan*/}
        <div className="max-w-[1100px] mx-auto">
          <div className='mt-20'></div>
          <div className='mb-20'></div>
          <div className="mt-20">
            <div className='border-t border-gray-200 mb-10'></div>
            <div className="flex flex-wrap gap-20 pb-4 justify-center font-helvetica-light">
               <div className="flex flex-wrap justify-center gap-10 md:gap-16 pb-6">
            {Category.map((category, index) => (
              <div
                key={category.id}
                onClick={() => window.location.href = category.path}
                className={`flex flex-col items-center transition-transform hover:scale-110 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 mb-2">
                  <img
                    src={category.image}
                    className="w-full h-full object-contain"
                    alt={category.name}
                  />
                </div>
                <span className="text-sm text-center text-gray-700 font-light">{category.name}</span>
              </div>
            ))}
          </div>

              <div className="flex items-center justify-center">
                <button className="text-gray-600 bg-gray-100 rounded-full p-2">
                </button>
              </div>
            </div>
          </div>
          

          {/*Produk Terbaru | Newest Products*/}
          <div className='max-w-6xl mx-auto px-4 py-10'>
               <Fade direction="up" cascade damping={0.1} triggerOnce>
            <h2 className='justify-center text-center font-ag-futura uppercase text-4xl mb-2 max-w-screen'>newest product</h2>
            <p className='justify-center text-center font-helvetica-light uppercase text-1xl mb-8 md:max-w-screen inline:max-w-screen'>Nikmati penawaran spesial produk Rexus dengan harga terbaik untuk Anda!</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
             {productShow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            </Fade>
          </div>


            {/*Produk Deals | Special Deals Pecel Lele*/}
            <div className='mt-20 mb-20'>
              <Fade direction="up" cascade damping={0.1} triggerOnce>
              <h2 className='justify-center text-center font-ag-futura uppercase text-4xl mb-2 max-w-screen'>Specials Deals</h2>
              <p className='justify-center text-center font-helvetica-light uppercase text-1xl mb-8 md:max-w-screen inline:max-w-screen'>Nikmati penawaran spesial produk Rexus dengan harga terbaik untuk Anda!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {productDeals.map((product) => (
                <DealsCard key={product.id} product={product} />
              ))}
              </div>
              </Fade>
            </div>

          <div>
            <Fade direction="up" cascade damping={0.1} triggerOnce>
            <div className='justify-center text-center font-ag-futura uppercase text-4xl mb-2 max-w-screen'>Related Products</div>
            <div className='justify-center text-center font-helvetica-light uppercase text-1xl mb-8 md:max-w-screen'>Produk yang bikin tertarik buat mu</div>
              <div className='relative'>
                <button onClick={scrollToTheLeft} className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow'>
                <Icon icon="ic:round-navigate-before"></Icon>
                </button>

                  <div
                  ref={scrollPdct}

                  className="flex overflow-x-scroll gap-4 px-10 py-4 scroll-smooth scrollbar-hide"
                >

                 {productCard.map((product) => (
                <div key={product.id} className="shrink-0 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <ProductCard product={product} />
                </div>
                 ))}
              </div>
               <button onClick={scrollToTheRight} className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-3'>
                <Icon icon="ic:round-navigate-next"></Icon>
                </button>
              </div>
            </Fade>
            
           
            <div className="py-20 mt-20">
              <Fade direction='up' cascade damping={0.1} triggerOnce>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                  Why Choose Us
                </h2>
                <p className="text-gray-600 text-lg font-light">
                  Experience the best shopping with our premium services
                </p>
              </div>
              </Fade>
             
               <Fade direction='up' cascade damping={0.1} triggerOnce>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className={`text-center group bg-white p-8 hover:bg-gray-50 transition-colors ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
                    style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="w-16 h-16 mx-auto mb-6 bg-black flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-light text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 font-light">{feature.desc}</p>
                  </div>
                ))}
              </div>
              </Fade>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Landingpage
