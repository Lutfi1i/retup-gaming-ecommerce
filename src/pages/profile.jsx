import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode] = useState(false);
  const [form, setForm] = useState({ email: '', name: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    if (user) setForm({ email: user.email, name: user.name });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    // Optionally redirect to login page
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSave = () => {
  //   const updatedUser = { ...currentUser, ...form };
  //   setCurrentUser(updatedUser);
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  //   setEditMode(false);
  // };

  const navigate = useNavigate();


  return (
    <div className="font-helvetica-light mb-80">
      <div className="h-30 mb-20 content-center bg-[#F1F1F1] border-b-[0,1]">
        <h2 className="font-ag-futura text-4xl pl-4">Account</h2>
      </div>

      <div className="w-3/4 pl-12">
        {currentUser ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-md font-ag-futura">Email</h2>
              <p>*Email tidak dapat diganti*</p>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              ) : (
                <p>{currentUser.email}</p>
              )}
            </div>
            <div>
              <h2 className="text-md font-ag-futura">Username</h2>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              ) : (
                <p>{currentUser.username}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
        <button
          onClick={() => {
            handleLogout();
            navigate('/');
            window.location.reload();
          }}
          className="mt-4 text-red-600 font-bold text-sm hover:underline font-ag-futura"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
