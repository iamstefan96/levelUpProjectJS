const COMMENTS_API_URL = 'http://localhost:3000/comments';

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP greška! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch greška: ', error);
        throw error;
    }
}

// Kreiranje komentara
async function createComment(text, adId, userId) {
    const commentData = { text, adId, userId };
    return await fetchData(COMMENTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    });
}

// Pribavljanje svih komentara
async function getComments() {
    return await fetchData(COMMENTS_API_URL, { method: 'GET' });
}

export { createComment, getComments };
