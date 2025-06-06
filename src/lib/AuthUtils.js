export const isAuthenticated = () => {
  return !!localStorage.getItem('currentUser'); // true jika sudah login
};
