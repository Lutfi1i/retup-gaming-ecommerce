import { formatRupiah } from "../lib/formatrupiah";
import { Link } from "react-router-dom";

function DealsCard({ product }) {
  const HalfDiscount = product.price / 2;

  return (
    <div className="font font-helvetica-light">
      <Link to={`/products/${product.slug}`}>
        <div className="flex border border-gray-200 p-15 py-2 pl-1 gap-4 items-center justify-center">
          <img
            src={product.imageUrl}
            className="w-[120px] h-[120px] object-contain mb-2"
          />
          <div>
            <p className="text-sm font-semibold flex">{product.name}</p>
            <div className="flex items-center gap-3">
            <p className="text-sm line-through text-gray-500 font-raleway">
              {formatRupiah(product.price)}
            </p>
            <span className="text-center text-black font-raleway flex">
              {formatRupiah(HalfDiscount)}
            </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default DealsCard;