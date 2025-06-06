import { useState, useEffect } from 'react'
import { getCart, saveCart } from '../lib/cartUtils'
import { Link } from 'react-router-dom'
import { formatRupiah } from '../lib/formatrupiah'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

const CartPages = () => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    const items = getCart();
    setCartItems(items || []); // Add fallback to empty array
    setSelectedItems(new Set(items?.map(item => item.id) || []));
  }, []);

  useEffect(() => {
     document.title = 'Keranjang | Retup';
  })

const updateCart = (updated) => {
  setCartItems(updated);
  saveCart(updated);
};

  const incrementQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decrementQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: (item.quantity || 1) - 1 } : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

const toggleSelectItem = (id) => {
  const updated = cartItems.map(item =>
    item.id === id ? { ...item, selected: !item.selected } : item
  );
  updateCart(updated);
  setCartItems(updated);
  setSelectedItems(prev => {
    const newSet = prev.has(id) ? new Set([...prev].filter(x => x !== id)) : new Set([...prev, id]);
    return newSet;
  });
};

const toggleSelectAll = () => {
  const selectAll = selectedItems.size !== cartItems.length;
  const updated = cartItems.map(item => ({ ...item, selected: selectAll }));
  updateCart(updated);
  setCartItems(updated);
  setSelectedItems(new Set(selectAll ? updated.map(i => i.id) : []));
};

  const subtotal = cartItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-screen mx-auto p-6 sm:p-4 bg-white">
        <div className="bg-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-ag-futura mb-4">Cart Empty</h2>
          <p className="text-gray-600 mb-6">Try to add one of your favorite products</p>
          <Link to="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg font-ag-futura">Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen mx-auto p-6 sm:p-4 min-h-screen bg-white">
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedItems.size === cartItems.length}
            onChange={toggleSelectAll}
            className="w-4 h-4 text-black border-gray-300 rounded"
          />
          <span className="font-medium">Select All</span>
        </label>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className={`border-b ${!selectedItems.has(item.id) ? 'opacity-40' : ''}`}>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-4 h-4 text-black border-gray-300 rounded"
                    />
                    <img src={item.image || item.imageUrl} alt={item.name} className="object-contain w-32 h-32" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{formatRupiah(item.price)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center border rounded w-fit">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity || 1}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-3 py-1 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4 font-medium">
                  {((item.price || 0) * (item.quantity || 1)).toLocaleString('id-ID')}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                     <Icon icon="pajamas:remove" className="w-5 h-5" />
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className={`bg-white rounded-lg p-4 ${!selectedItems.has(item.id) ? 'opacity-40' : ''}`}>
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="w-4 h-4 text-black border-gray-300 rounded mt-1"
              />
              <img src={item.image || item.imageUrl} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                <p className="text-gray-500 text-xs mb-3">{formatRupiah(item.price)}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm">{item.quantity || 1}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-2 py-1 text-sm hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-right">
              <span className="font-medium">
                {((item.price || 0) * (item.quantity || 1)).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-end">
        <div className="items-center mb-4 md:mb-0 md:mr-6">
          <span className="text-lg">Subtotal</span>
          <span className="text-2xl font-ag-futura p-2">{" "}{subtotal.toLocaleString('id-ID')}</span>
          <p className="text-sm text-gray-500 mt-2 md:mt-1">Taxes and shipping calculated at checkout</p>
        </div>
        <button 
          onClick={() => {
            const selectedCartItems = cartItems.map(item => ({
              ...item,
              selected: selectedItems.has(item.id)
            })).filter(item => selectedItems.has(item.id));
            
            if (selectedCartItems.length > 0) {
              saveCart(selectedCartItems);
              navigate('/checkout', { 
                state: { fromCart: true }  // Tambahkan state untuk tracking
              });
            }
          }}
          className={`w-80 py-4 rounded-lg font-medium text-lg transition-all mt-2 md:mt-0 md:ml-4 ${
            selectedItems.size > 0 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedItems.size === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPages;