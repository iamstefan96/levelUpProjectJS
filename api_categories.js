const API_URL = 'http://localhost:3000/categories';

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
}

// Pribavljanje svih kategorija
async function getCategories() {
    return await fetchData(API_URL, { method: 'GET' });
}

// Pribavljanje kategorije po ID-ju
async function getCategoryById(id) {
    return await fetchData(`${API_URL}/${id}`, { method: 'GET' });
}

// Brisanje kategorije po ID-ju
async function deleteCategoryById(id) {
    return await fetchData(`${API_URL}/${id}`, { method: 'DELETE' });
}

// Kreiranje nove kategorije
async function createCategory(name, image) {
    const categoryData = { name, image };
    return await fetchData(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    });
}

// Azuriranje kategorije
async function updateCategory(id, name, image) {
    const categoryData = { name, image };
    return await fetchData(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    });
}

export { getCategories, getCategoryById, deleteCategoryById, createCategory, updateCategory };
