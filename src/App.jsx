import { Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Productoverview from './pages/Productoverview';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Tambahkan route index jika ada halaman home */}
        {/* <Route index element={<Home />} /> */}

        {/* Ini route untuk halaman produk */}
        <Route path="products" element={<Productoverview />} />
      </Route>
    </Routes>
  );
}

export default App;
