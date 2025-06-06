import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/fetchproduct'; // sesuaikan dengan path kamu
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setResults(filtered);
    });
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Search Result</h1>
      <p>
        Hasil Pencarian "<span className="font-bold">{query}</span>"
      </p>

      {results.length === 0 ? (
        <p>Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
