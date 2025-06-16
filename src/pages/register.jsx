import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { auth, provider, signInWithPopup } from '../lib/GoogleAuth';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi dasar
    if (!form.username || !form.password || !form.confirmPassword || !form.email) {
      return alert('Harap isi semua kolom');
    }

    if (form.password !== form.confirmPassword) {
      return alert('Konfirmasi password tidak cocok');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find((u) => u.username === form.username);
    if (exists) {
      return alert('Username sudah digunakan');
    }

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Register berhasil!');
    navigate('/login');
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
    <div className="font-helvetica-light">
      <div className="w-full h-20 md:h-24 bg-cover bg-center" style={{ backgroundImage: "url('public/assets/kbrdr.png')" }}></div>

      <div className="px-4 py-10 mx-auto max-w-[800px]">
        <h1 className="text-3xl font-ag-futura mb-8">Register</h1>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3">
            {/* Email & Password */}
            <div className="w-1/2 px-8">
              <div className="mb-6">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="type here..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="type here..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Username & Confirm */}
            <div className="w-1/2 px-8">
              <div className="mb-6">
                <label className="block text-sm mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="type here..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="type here..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-white shadow-md px-5 py-3 rounded flex items-center justify-between w-32 hover:bg-gray-50"
            >
              <span className="font-ag-futura">Enter</span>
              <Icon icon="uil:enter" width={24} height={30} />
            </button>
          </div>
        </form>

        <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Or Continue with</p>
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
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
