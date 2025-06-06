import React, { useState, useEffect } from 'react';
import { getLiked, saveLiked } from '../lib/likeUtils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const WishlistPages = () => {
    const [likedItems, setLikedItems] = useState([]);

    useEffect(() => {
        const items = getLiked();
        setLikedItems(Array.isArray(items) ? items : []);
    }, []);

    useEffect(() => {
        document.title = 'Wishlist | Retup';
    }, []);

    const updateLiked = (updated) => {
        setLikedItems(updated);
        saveLiked(updated);
    };

    const removeItem = (id) => {
        const updated = likedItems.filter(item => item.id !== id);
        updateLiked(updated);
    };

    const formatRupiah = (number) => {
        return 'Rp ' + (number || 0).toLocaleString('id-ID');
    };

    return likedItems.length === 0 ? (
       <div className="max-w-screen mx-auto p-6 sm:p-4 bg-white">
        <div className="bg-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-ag-futura mb-4">Wishlist Is Empty</h2>
          <p className="text-gray-600 mb-6">Try to like one of your favorite products</p>
          <Link to="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg font-ag-futura">Home</button>
          </Link>
        </div>
      </div>
    ) : (
        <div className="font-helvetica-light">
            <div className="h-30 mb-20 content-center bg-[#F0FBFB]">
                <h2 className="font-ag-futura text-4xl pl-4">Wishlist</h2>
                <p className="pl-4 truncate">All the items you loved will appear here</p>
            </div>

            <div className=" bg-white rounded-lg overflow-hidden mb-8">
                <table className="w-full">
                    <thead className="border-b">
                        <tr className="text-left">
                            <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                           
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                  <tbody>
  {likedItems
    .filter(item => item && typeof item === 'object' && item.id)
    .map(item => (
      <tr key={item.id} className="border-b">
        <td className="p-4">
          <div className="flex items-center gap-4">
            <img 
              src={item.imageUrl || '/placeholder.png'} 
              alt={item.name || 'No name'} 
              className="object-contain w-32 h-32" 
            />
            <div>
              <h3 className="font-medium line-clamp-3 md:line-clamp-4">{item.name}</h3>
              <p className="text-gray-500 text-sm">{formatRupiah(item.price)}</p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
             <Icon icon="pajamas:remove" className="w-5 h-5" />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
    </div>
    );
};

export default WishlistPages;
