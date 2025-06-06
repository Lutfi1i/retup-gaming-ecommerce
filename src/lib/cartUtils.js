export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
     
    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}

export const clearCart = () => {
  localStorage.removeItem('cartItems');
};

export const saveTempCheckout = (item) => {
  localStorage.setItem('temp-checkout', JSON.stringify([item]));
};

export const getTempCheckout = () => {
  const items = localStorage.getItem('temp-checkout');
  return items ? JSON.parse(items) : null;
};

export const clearTempCheckout = () => {
  localStorage.removeItem('temp-checkout');
};