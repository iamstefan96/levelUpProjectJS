const BASE_URL = 'http://localhost:3000'

// Pribavi sve lajkove
async function getLikes() {
    const response = await fetch(`${BASE_URL}/likes`, { method: 'GET' })
    const data = await response.json()
    return data
}

// Pribavi lajkove koji pripadaju određenom oglasu
async function getLikesByAdId(adId) {
    const response = await fetch(`${BASE_URL}/likes?adId=${adId}`, { method: 'GET' })
    const data = await response.json()
    return data
}

// Proveri da li je korisnik lajkovao dati oglas
async function isLikedByUser(adId, userId) {
    const likes = await getLikesByAdId(adId)
    return likes.some(like => like.userId === userId)
}

// Dodaj like za dati oglas i korisnika
async function addLike(adId, userId) {
    await fetch(`${BASE_URL}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            adId: adId,
            userId: userId,
        }),
    })
}

// Ukloni like za dati oglas i korisnika
async function removeLike(adId, userId) {
    const likes = await getLikesByAdId(adId);
    const likeId = likes.find(like => like.userId === userId)?.id

    if (likeId) {
        await fetch(`${BASE_URL}/likes/${likeId}`, {
            method: 'DELETE',
        })
    }
}
async function getLikesByUserId(userId) {
    const response = await fetch(`${BASE_URL}/likes?userId=${userId}`)
    const data = await response.json()
    return data
}

export { getLikes, getLikesByAdId, isLikedByUser, addLike, removeLike, getLikesByUserId }
