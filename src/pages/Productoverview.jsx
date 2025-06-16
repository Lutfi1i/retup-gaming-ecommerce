import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { formatRupiah } from '../lib/formatrupiah';
import { fetchProducts } from '../lib/fetchproduct';
import { addToCart } from '../lib/cartUtils';
import { useNavigate } from 'react-router-dom';
import { saveTempCheckout } from '../lib/cartUtils';
import { isAuthenticated } from '../lib/AuthUtils';

const Productoverview = () => {

const navigate = useNavigate();
const [quantity, setQuantity] = useState(1);
const { productName } = useParams();
const [product, setProduct] = useState(null);
const [selectedImage, setSelectedImage] = useState(0);
const [products, setProducts] = useState([]);
const ScrollProduct = useRef(null)


useEffect(() => {
  fetchProducts().then((products) => {
    setProducts(products.slice(0, 8));
  });
}, []);;

useEffect(() => {
  fetchProducts().then(allproducts => {
    const Products = allproducts.find(p => p.slug === productName);
    setProduct(Products);
  });
}, [productName]);

useEffect(() => {
  if (product) {
    document.title = 'Lihat ' + product.name;
  }
}, [product]);


const handleCart = () => {
if (!isAuthenticated()) {
navigate('/login')
return;
}
addToCart(product);
};

const buyOnLogin = () => {
  // Cek apakah user sudah login
  if (!isAuthenticated()) {
    // Simpan data produk sementara jika ingin membelinya nanti setelah login
    const tempProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      selected: true
    };

    saveTempCheckout(tempProduct); // Opsional: hanya jika kamu ingin menyimpan sebelum login
    navigate('/login', { state: { from: 'buyNow' } }); // Simpan state asal navigasi jika perlu
    return;
  }

  // Buat data produk untuk checkout
  const itemToBuy = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    imageUrl: product.image || product.imageUrl,
    selected: true
  };

  // Simpan data ke temp checkout
  saveTempCheckout(itemToBuy);

  // Navigasi ke halaman checkout dengan state penanda
  navigate('/checkout', {
    state: { fromBuyNow: true }
  });
};

const scrollToTheRight = () => {
    ScrollProduct.current.scrollBy({ left: 600, behaviour: 'smooth '});
  };

  const scrollToTheLeft = () => {
    ScrollProduct.current.scrollBy({ left: -600, behaviour: 'smooth '});
  };
  

if (!product) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img src='https://i.pinimg.com/736x/a2/e9/ac/a2e9ac3a5ba73d953c608ec5986f47ca.jpg' className='w-32 mb-10'></img>
      <h2 className='text-4xl mb-2'>何もない</h2>
      <div className="font-bold text-center text-4xl mb-2">Produk Tidak Ditemukan</div>
      <p className="text-center text-lg text-gray-600 max-w-[500px]">Periksa Jika ada kesalahan dalam penulisan atau produk yang kamu cari tidak tersedia</p>
    </div>
  );
}

  return (
   <div className="max-w-[1400px] mx-auto px-4 font-helvetica-light">
    <div className="py-4 mt-5">
        <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/products" className="text-gray-500 hover:text-black">Products</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-black truncate">{product.name}</span>
        </nav>
    </div>

    <div className="flex flex-col md:flex-row gap-8 py-8">
        {/* Left - Images */}
        <div className="md:w-1/2">
          <div className="flex">
            <div className="flex-col gap-4 mr-4 hidden md:inline">
              <div
                onClick={() => setSelectedImage(0)}
                className={`border w-16 h-16 cursor-pointer ${selectedImage === 0 ? 'border-black' : 'border-gray-200'}`}
              >
                <img src={product.imageUrl} alt="Thumbnail 1" className="w-full h-full object-contain p-1" />
              </div>
            </div>
            <div className="flex-1 border border-gray-200 flex items-center justify-center">
              <img src={product.imageUrl} alt={product.name} className="object-contain max-h-[400px] p-4" />
            </div>
          </div>
        </div>


        {/* Right - Detail */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 font-ag-futura">{product.name}</h1>
          <div>
            <span className="text-2xl font-bold">{formatRupiah(product.price)}</span>
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
              onClick={buyOnLogin}
            >
              Buy Now
            </button>
            <button 
            onClick={handleCart}

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
        <p className="text-gray-600 text-[20px]">{product.description}</p>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold mb-4">Spesifikasi Produk</h2>
        <div className="text-gray-600">
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold my-4 mb-5">Produk Terkait</h2>
        <div className="flex overflow-x-auto gap-4 px-10 py-4 scroll-smooth scrollbar-hide">
          {/* Produk Terkait */}
          </div>
        </div>
          <div>
          <div className='relative mb-15'>
        <button onClick={scrollToTheLeft} className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow'>
        <Icon icon="ic:round-navigate-before"></Icon>
          </button>
          
        <div
                            ref={ScrollProduct}
          
                            className="flex overflow-x-scroll gap-4 px-10 py-4 scroll-smooth scrollbar-hide"
                          >
          
                           {products.map((product) => (
                          <div key={product.id} className="shrink-0 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4">
                              <ProductCard product={product} />
                          </div>
                           ))}
                        </div>
                         <button onClick={scrollToTheRight} className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-3'>
                          <Icon icon="ic:round-navigate-next"></Icon>
                          </button>
                        </div>
      </div>
    </div>
  )
}

export default Productoverview;