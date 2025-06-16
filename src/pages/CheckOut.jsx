import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getTempCheckout, clearTempCheckout, clearSelectedFromCart } from "../lib/cartUtils";
import { formatRupiah } from "../lib/formatrupiah";
import { Icon } from "@iconify/react/dist/iconify.js";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    setLoading(true);

    const tempCheckout = getTempCheckout();
    if (tempCheckout) {
      setSelectedItems(tempCheckout);
      setLoading(false);
      return;
    }

    // Otherwise, check cart
    const cart = getCart();
    if (!cart || cart.length === 0) {
      navigate('/cart');
      return;
    }

    setSelectedItems(cart);
    setLoading(false);
  }, [navigate]);

  const totalHarga = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (paymentMethod && selectedItems.length > 0) {
      if (window.confirm("Apakah Anda yakin ingin melakukan checkout?")) {
        alert("Pemesanan Berhasil")
        clearSelectedFromCart(); 
        clearTempCheckout();
        navigate("/");
      }
    } else {
      alert("Silakan pilih metode pembayaran");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <img src="/Logo-Retup.png" alt="Loading" className="w-24 h-24 " />
        <p className="text-lg text-gray-500">Memuat pesanan mu</p>
      </div>
    );
  }

  const GakJadiCheckout = () => {
    navigate(-1);
    clearTempCheckout();
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 font-helvetica-light">
      <div className="flex items-center mb-6">
        <Icon onClick={GakJadiCheckout} icon="material-symbols:arrow-back-rounded" className="text-2xl mr-2" />
        <h1 className="text-2xl font-ag-futura">Checkout</h1>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 border rounded-full text-sm ${paymentMethod === 'qris' ? 'border-cyan-200 border-3' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod("qris")}
          >
            <img src="/payment/qris.png" width={32} height={32} />
          </button>
          <button
            className={`px-4 py-2 border rounded-full text-sm ${paymentMethod === 'card' ? 'border-cyan-200 border-3' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="flex items-center gap-2">
              <img src="/payment/visa.png" width={32} height={32} />
              <img src="/payment/mastercard.png" width={32} height={32} />
            </div>
          </button>
          <button
            className={`px-4 py-2 border rounded-full text-sm ${paymentMethod === 'gopay' ? 'border-cyan-200 border-3' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod("gopay")}
          >
            <img src="/payment/gopay.png" width={32} height={32} />
          </button>
        </div>
      </div>

      {selectedItems.length === 0 ? (
        <p className="text-gray-500">Tidak ada produk yang dipilih.</p>
      ) : (
        <div className="space-y-6">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-6 border-b pb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium font-raleway">{formatRupiah(item.price * item.quantity)}</p>
            </div>
          ))}

          <div className="text-right font-bold text-xl">
            Total: {formatRupiah(totalHarga)}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-black text-white px-6 py-5 rounded-2xl hover:bg-gray-800 font-ag-futura flex items-center gap-2 shadow hover:scale-95"
            >
            <Icon icon="tdesign:secured-filled"></Icon>
              Konfirmasi Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
