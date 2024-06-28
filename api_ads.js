const API_URL = 'http://localhost:3000/ads';

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

// Kreiranje oglasa
async function createAd(title, description, price, image, categoryId, userId) {
    const adData = { title, description, price, image, categoryId, userId };
    return await fetchData(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adData),
    });
}

// Azuriranje oglasa
async function editAd(id, title, description, price, image, categoryId, userId) {
    const adData = { title, description, price, image, categoryId, userId };
    return await fetchData(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adData),
    });
}

// Pribavljanje oglasa koji pripadaju prijavljenom korisniku
async function getAdsByUserId(userId) {
    return await fetchData(`${API_URL}?userId=${userId}`);
}

// Brisanje oglasa po id-ju
async function deleteAdById(id) {
    return await fetchData(`${API_URL}/${id}`, { method: 'DELETE' });
}

// Pribavljanje svih oglasa
async function getAds() {
    return await fetchData(API_URL);
}

// Pribavljanje kategorije po id-ju
async function getAdById(id) {
    return await fetchData(`${API_URL}/${id}`);
}

export { getAdsByUserId, deleteAdById, getAds, createAd, editAd, getAdById };