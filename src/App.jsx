import { Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Productoverview from './pages/Productoverview';
import Landingpage from './pages/landingpage';
import Login from './pages/login';
import Register from './pages/register';
import SearchPage from './pages/searchPage';
import CartPages from './pages/cartPages';
import WishlistPages from './pages/likedPages';
import PublicRoute from './components/PublicRoute';
import Homepage from './pages/homepage';
import ProfilePage from './pages/profile';
import CategoryPage from './pages/categories';
import CheckoutPage from './pages/CheckOut';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <PublicRoute>
            <Landingpage />
          </PublicRoute>
        } />
        {/* Tambahkan route index jika ada halaman home */}

        {/* Ini route untuk halaman produk */}
        <Route path="/products/:productName" element={<Productoverview />} />
        <Route path='login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />


        <Route path='register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

        <Route path='query' element={<SearchPage />}/>
        <Route path='cart' element={<CartPages />}/>
        <Route path='wishlist' element={<WishlistPages />}/>
        <Route path='/search' element={<SearchPage />} />
        <Route path='home' element={<Homepage />}/>
        <Route path='profile' element={<ProfilePage />}/>
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path='/checkout' element={<CheckoutPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
