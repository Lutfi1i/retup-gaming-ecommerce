import React from 'react'
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DealsCard from '../components/DealsCard';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/fetchproduct';
import { Fade } from 'react-awesome-reveal';

function Homepage() {
  const bannerImage = [
    { url: "./assets/mksgmdpd.png" }
  ];

const [productShow, setProductShow] = useState([]);
const [productCard, setProductCard] = useState([]);
const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  fetchProducts().then((products) => {
    // tampilkan 4 produk pertama sebagai "Deals"
    setProductShow(products.slice(0, 2)),
    setProductCard(products.slice(0, 3));
  });
}, []);;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    if (user) ({ name: user.name });
  }, []);


  const Category = [
    { id: 1, name: 'Mouse', image: './categories-icon/mouse.png', path: '/category/mouse' },
    { id: 2, name: 'Keyboard', image: './categories-icon/keyboard.png', path: '/category/keyboard' },
    { id: 3, name: 'Gamepad', image: './categories-icon/gamepad.png', path:'/category/gamepad' },
    { id: 4, name: 'Deskmat', image: './categories-icon/deskmat.png', path:'' },
    { id: 5, name: 'Accessories', image: './categories-icon/acc.png', path:'' },
  ]


  // Animate On Scroll (AOS) is a popular and easy-to-use library for scroll animations in React.
  // Install: npm install aos
  // Import CSS in your main entry or component:
  // import 'aos/dist/aos.css';
  // Initialize in useEffect:
  // import AOS from 'aos';
  // useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

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
      <div className='mt-20'></div>
    <div className='mb-20'></div>
        <div className="mt-20">
          <div className='border-t border-gray-200 mb-10'></div>
          <div className="flex flex-wrap gap-20 pb-4 justify-center font-helvetica-light">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 pb-6 font-helvetica-light">
              {Category.map((category) => (
                <Link
                  to={category.path}
                  className="flex flex-col items-center transition-transform hover:scale-110"
                  data-aos="fade-up"
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

  <h2 className='font-ag-futura text-2xl mt-10 text-center md:text-justify' data-aos="fade-right">Special For You, {currentUser ? currentUser.username : "Unknown_user"} </h2>
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' data-aos="fade-up">
      {productCard.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </div>

  <div className='hidden md:inline'>
  <div className='mt-20 mb-20'>
  <div className="grid grid-cols-2 gap-4" data-aos="zoom-in">
 {productShow.map((product) => (
      <DealsCard key={product.id} product={product} />
    ))}
  </div>
  </div>
  </div>

  <div>
     <Fade direction="up" cascade damping={0.1} triggerOnce>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-40' data-aos="fade-up">
      {productCard.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
     </Fade>
    

    
    <div className='mt-50'>
       <div className="w-full h-auto bg-white flex-row items-center justify-between flex font-helvetica-light md:grid-cols-3 py-8">
    <div className="justify-center items-center flex flex-col" data-aos="fade-up">
      <img src="/footerAssets/7days.png" className="items-center" />
    <p className="max-w-[300px] text-center p-2 text-sm md:text-base">
      Get better promos, better prices when you shop directly with our website. Best value that you won't get on any other platform!
    </p>
    </div>

     <div className="justify-center items-center flex flex-col" data-aos="fade-up" data-aos-delay="100">
      <img src="/footerAssets/7days.png" className="items-center" />
    <p className="max-w-[300px] text-center p-2 text-sm md:text-base">
      Get better promos, better prices when you shop directly with our website. Best value that you won't get on any other platform!
    </p>
    </div>


    <div className="justify-center items-center flex flex-col" data-aos="fade-up" data-aos-delay="200">
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

export default Homepage