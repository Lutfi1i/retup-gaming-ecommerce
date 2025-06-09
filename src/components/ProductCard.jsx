import { formatRupiah } from '../lib/formatrupiah';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { addToCart } from '../lib/cartUtils';
import { useEffect, useState } from 'react';
import { getLiked, saveLiked } from '../lib/likeUtils';
import { isAuthenticated } from '../lib/AuthUtils';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
    const likedItems = getLiked();
    const isLiked = likedItems.some(item => item.id === product.id);
    setLiked(isLiked);
  }, [product]);

  const handleLike = () => {
    const likedItems = getLiked();
    const alreadyLiked = likedItems.find(item => item.id === product.id);

    if (alreadyLiked) {
      const updated = likedItems.filter(item => item.id !== product.id);
      saveLiked(updated);
      setLiked(false);
    } else {
      const updated = [...likedItems, product];
      saveLiked(updated);
      setLiked(true);
    }
  };

   const handleCart = () => {
      if (!isAuthenticated()) {
        navigate('/login')
        return;
      }
  
    addToCart(product); // fungsi asli kamu
    };


  return (
    <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 w-full max-w-sm mx-auto">
      <div className="flex justify-end pt-2 pr-2">
        <Icon 
            icon={liked ? "weui:like-filled" : "weui:like-outlined"}
            className={`w-8 h-8 cursor-pointer transition-colors ${liked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-400'}`}
            onClick={handleLike}
          />
      </div>
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative h-32 w-full">
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="object-contain p-2 w-full h-full" 
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg text-black truncate">{product.name}</h2>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-raleway">{formatRupiah(product.price)}</span>
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button 
          onClick={handleCart}
          className="w-full bg-white outline-[0.6px] hover:bg-black active:bg-black hover:text-white active:text-white transition-colors text-black py-2 px-4 rounded-md text-sm font-bold">
          Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
