const BASE_URL = '/api/products';

export async function fetchProducts() {
    const res = await fetch(BASE_URL);
    return await res.json();
}

export async function fetchIDProdut(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
}