import React from 'react'
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DealsCard from '../components/DealsCard';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/fetchproduct';
import { Fade } from 'react-awesome-reveal';
import { Shield, Truck, Gift } from 'lucide-react';

function Homepage() {
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

const [productCard, setProductCard] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const [isVisible, setIsVisible] = useState(false);
const [imageNow, setImageNow] = useState(0)
const [dealsUser, setDealsUser] = useState([])

setTimeout(() => setIsVisible(true), 100);

useEffect(() => {
  fetchProducts().then((products) => {
    const dealsUserItems = products.filter((product) => 
    [9, 13].includes(product.id))

    setDealsUser(dealsUserItems)
    setProductCard(products.slice(0, 6));
  });
}, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    if (user) ({ name: user.name });
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
                <button className={`rounded bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
                  style={{ animationDelay: '400ms' }}>
                  {bannerImage[imageNow].title}
                </button>
              </Link>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
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
              <div className="flex flex-wrap justify-center gap-10 md:gap-16 pb-6 font-helvetica-light">
                {Category.map((category) => (
                  <Link
                    key={category.id}
                    to={category.path}
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    data-aos="fade-up"
                  >
                    <div className="w-20 h-20 mb-2">
                      <img
                        src={category.image}
                        className="w-full h-full object-contain"
                        alt={category.name}
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

          <Fade direction="up" cascade damping={0.1} triggerOnce>
          <h2 className='justify-center text-center font-ag-futura uppercase text-4xl mt-10 max-w-screen'>
            Special, {currentUser ? currentUser.username : "Entity303"}
          </h2>
          <p className='justify-center text-center font-helvetica-light uppercase text-1xl mb-8 mt-5 max-w-screen inline:max-w-[200px]'>Diskon besar-besaran ini hanya untuk mu!</p>
          <div className='max-w-6xl mx-auto px-4 py-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {dealsUser.map((product) => (
                <DealsCard key={product.id} product={product} />
              ))}
              </div>
            </div>
            </Fade>

          <div>
            <Fade direction="up" cascade damping={0.1} triggerOnce>
              <div className='flex items-stretch overflow-x-auto gap-6 mt-20 pb-4 scrollbar-hide'>
                 {productCard.map((product) => (
                <div key={product.id} className="shrink-0 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4">
                    {/* Anda tidak perlu mengubah komponen ProductCard sama sekali */}
                    <ProductCard product={product} />
                </div>
                 ))}
              </div>
            </Fade>

            <div className="py-20 mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                  Why Choose Us
                </h2>
                <p className="text-gray-600 text-lg font-light">
                  Experience the best shopping with our premium services
                </p>
              </div>

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

export default Homepage