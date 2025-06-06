import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { auth, provider, signInWithPopup } from '../lib/GoogleAuth';


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  useEffect(() => {
    document.title = "Masuk/Login | Retup";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login berhasil!');
      navigate('/home'); // arahkan ke homepage
    } else {
      alert('Username atau password salah!');
    }
  };

  const handleLoginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('currentUser', JSON.stringify({ username: user.displayName, email: user.email }));
    alert("Login berhasil sebagai " + user.displayName);
    navigate('/home'); 
    window.location.reload(); 
  } catch (error) {
    console.error("Login gagal:", error);
    alert("Gagal login dengan Google.");
  }
};



  return (
    <div>
      <div className="">
        <div
          className="w-full h-20 md:h-24 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/kbrdr.png')" }}
        ></div>

        <div className="max-w-md mx-auto px-4 py-10">
          <h1 className="text-3xl font-ag-futura mb-8">Log In</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="type here..."
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm">Password</label>
                <a href="#" className="text-red-500 text-sm">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="type here..."
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div className="flex justify-end mb-8">
              <button
                type="submit"
                className="bg-white shadow-md px-5 py-3 rounded flex items-center justify-between w-32 hover:bg-gray-50"
              >
                <span className="font-ag-futura">Enter</span>
                <Icon icon="uil:enter" width={24} height={30} />
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Or resume with</p>
            </div>

            <div className="flex justify-center mb-8">
              <button
                type="button"
                onClick={handleLoginWithGoogle}
                className="bg-white shadow-xl px-12 py-2 rounded flex items-center justify-center hover:bg-gray-50"
              >
                <img
                  src="/assets/google.png"
                  alt="Google"
                  className="w-9 h-9"
                />
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-black font-medium hover:underline">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
