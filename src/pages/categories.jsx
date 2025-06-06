import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../lib/fetchproduct';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams(); // ambil nama kategori dari URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((all) => {
      // Filter berdasarkan kategori (pastikan lowercase/slug sama)
      const filtered = all.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setProducts(filtered);
    });
  }, [categoryName]);

  useEffect(() => {
    document.title = `Kategori: ${categoryName} | Retup`;
  }, [categoryName]);

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 font-helvetica-light">
      <h1 className="text-4xl text-center font-ag-futura uppercase mb-20">
      {categoryName}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Belum ada produk untuk kategori ini.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
