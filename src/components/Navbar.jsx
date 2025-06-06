import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../lib/cartUtils";
import { useState, useEffect } from "react";
import { getLiked } from "../lib/likeUtils";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const specialDealsText = [
    "Dapatkan diskon 20% untuk pembelian pertama!",
    "Gratis ongkir untuk pembelian di atas Rp100.000!",
    "Dapatkan voucher belanja Rp50.000 untuk pembelian di atas Rp300.000!"
  ];

  const [cont, setCont] = useState(0);

  const Liked = getLiked();
  const totalLiked = Array.isArray(Liked) ? Liked.length : 0;

  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const changev = setInterval(() => {
      setCont((prev) => (prev + 1) % specialDealsText.length);
    }, 2000);
    return () => clearInterval(changev);
  }, [specialDealsText.length]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  setCurrentUser(user);
}, []);

  const handleForSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  const navLeftButton = [
    { to: "/", label: "Home"},
    { to: "/produk", label: "Product"},
    { to: "/faq", label: "FAQ"},
    { to: "/garansi", label: "Warranty"}
  ];

  return (
    <div className="w-full font-helvetica-light">
      <div className="bg-black text-white h-10 flex items-center justify-center relative overflow-hidden">
        {specialDealsText.map((text, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-500 ease-in-out font-ag-futura uppercase text-center text-[10px] md:text-[16px] ${
              i === cont ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between gap-6 px-6 py-4 bg-white shadow">
        {/* Logo + Menu */}
        <div className="hidden md:flex items-center gap-6 underline++">
          <img src="/Logo-Retup.png" className="w-8 h-8" alt="Retup Logo" />
          {navLeftButton.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              className={`text-gray-600 hover:text-gray-800 transition-colors ${button.className}`}
            >
              {button.label}
            </Link>
          ))}
        </div>

        {/*  Hamburger (mobile) */}
        <button className="md:hidden" onClick={() => setIsLeftOpen(!isLeftOpen)}>
          <Icon icon="mdi:menu" width={28} />
        </button>

        {/* Search & Icons */}
        <div className="flex items-center gap-3 relative">
          <form onSubmit={handleForSearch} className="flex gap-2">
            <Icon icon="mdi:magnify" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-44 border rounded-full py-1 px-2 pl-8 text-sm transition-colors"
              placeholder="Search here..."
            />
          </form>

          {/* Cart */}
          <div className="relative hidden md:inline">
            <Link to="/cart" className="relative">
              <Icon icon="material-symbols-light:shopping-bag-outline" width={24} height={30} />
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

    
          <div className="relaitve hidden md:inline">
            <Link to="/wishlist" className="relative">
              <Icon icon="weui:like-outlined" width={24} height={30} />
              {totalLiked > 0 && (
                  <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalLiked}
                  </span>
              )}
            </Link>
          </div>

          {/*  Login */}
         {currentUser ? (
              <div className="relative hidden md:inline">
                <Link to="/profile" className="text-sm font-semibold">
                  {currentUser.username}
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:inline">
                <Link to="/login" className="hover:font-ag-futura pl-3">Login</Link>
              </div>
            )}
          {/*  Mobile User Icon */}
          <div className="md:hidden cursor-pointer" onClick={() => setIsRightOpen(!isRightOpen)}>
            <Icon icon="iconamoon:profile-fill" width={24} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isRightOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsRightOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-60 bg-white shadow-md z-50 px-4 py-6 transform transition-transform duration-300 ease-in-out ${
            isRightOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setIsRightOpen(false)}>
              <Icon icon="mdi:close" width={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <Icon icon="material-symbols-light:shopping-bag-outline" width={24} />
              Keranjang
            </Link>
            <Link to="/wishlist" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mt-5">
              <Icon icon="weui:like-outlined" width={24} height={30} />
              Wishlist
            </Link>
            {currentUser ? (
              <div className="md:inline relative">
                <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mt-5">
                   {currentUser.username}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:inline gap-4">
                <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mt-5">Login</Link>
              </div>
            )}
          </nav>
        </div>

        {/* Left Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isLeftOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsLeftOpen(false)}
        ></div>
        <div
          className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md z-50 px-6 py-4 transform transition-transform duration-300 ease-in-out ${
            isLeftOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <img src="/Logo-Retup.png" className="w-8 h-8" alt="Retup Logo" />
            <button onClick={() => setIsLeftOpen(false)}>
              <Icon icon="mdi:close" width={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {navLeftButton.map((button, index) => (
              <Link
                key={index}
                to={button.to}
                className={`text-gray-600 hover:text-gray-800 transition-colors ${button.className}`}
                onClick={() => setIsLeftOpen(false)}
              >
                {button.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
