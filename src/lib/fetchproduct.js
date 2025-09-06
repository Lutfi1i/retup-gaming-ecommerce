const BASE_URL = '/api/products';

export async function fetchProducts() {
    const res = await fetch(BASE_URL, {
        headers: {
            // Example: 'Origin' header is set by browser automatically
            // You can add other headers if needed
        },
        mode: 'cors'
    });
    return await res.json();
}

export async function fetchIDProdut(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        headers: {
            // Example: 'Origin' header is set by browser automatically
        },
        mode: 'cors'
    });
    return await res.json();
}
