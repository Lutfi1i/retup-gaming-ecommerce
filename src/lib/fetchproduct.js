const BASE_URL = 'https://api-e-commerce-retup-10.vercel.app/api/products';

export async function fetchProducts() {
    const res = await fetch(BASE_URL);
    return await res.json();
}

export async function fetchIDProdut(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
}
