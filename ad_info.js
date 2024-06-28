import { getAdById } from "./api_ads.js"
import { getUserById } from "./api_users.js"
import { createComment, getComments } from "./api_comments.js"
import { getLikesByAdId, isLikedByUser, addLike, removeLike, getLikesByUserId } from "./api_likes.js"

const search = new URLSearchParams(window.location.search)
const adId = Number(search.get('adId'))
const userId = Number(search.get('id'))

console.log('adId:', adId); 
console.log('userId:', userId);

if (isNaN(adId) || isNaN(userId)) {
    console.error('Invalid adId or userId');
} else {
    loadAdInfo();
    loadComments();

    const likeBtn = document.querySelector('#likeBtn');
    likeBtn.addEventListener('click', handleLikeClick);

    const postCommentBtn = document.querySelector('#postCommentBtn');
    postCommentBtn.addEventListener('click', handlePostComment);
}

async function loadAdInfo() {
    const ad = await getAdById(adId)
    const user = await getUserById(ad.userId)
    const likes = await getLikesByAdId(adId)

    const adDetailsContainer = document.querySelector('#adDetails')
    const likeBtn = document.querySelector('#likeBtn')

    const adDetailsHtml = `
        <p><img src="${ad.image}" style="width: 150px; height: 150px;"></p>
        <h3>Title: ${ad.title}</h3>
        <p>Description: ${ad.description}</p>
        <p>Price: ${ad.price}</p>
        <p>Likes: <span id="likeCount">${likes.length}</span></p>
        <p>Author: ${user.firstName} ${user.lastName}</p>
        <p>Phone number: ${user.phoneNumber}</p>
    `

    adDetailsContainer.innerHTML = adDetailsHtml
    const userLikes = await getLikesByUserId(userId)
    const likedAds = userLikes.map(like => like.adId)
    ad.likedByUser = likedAds.includes(adId)

    if (ad.likedByUser) {
        likeBtn.textContent = 'Dislike'
    } else {
        likeBtn.textContent = 'Like'
    }
}

async function handleLikeClick() {
    const likeBtn = document.querySelector('#likeBtn')
    const likeCountSpan = document.querySelector('#likeCount')
    let likeCount = parseInt(likeCountSpan.textContent, 10)

    const isLiked = await isLikedByUser(adId, userId)

    if (!isLiked) {
        await addLike(adId, userId)
        likeCount++
        likeBtn.textContent = 'Dislike'
    } else {
        await removeLike(adId, userId)
        likeCount = Math.max(0, likeCount - 1)
        likeBtn.textContent = 'Like'
    }

    likeCountSpan.textContent = likeCount
}

async function loadComments() {
    const comments = await getComments()
    const adComments = comments.filter(comment => comment.adId === adId)
    const commentsContainer = document.querySelector('#comments')

    let commentsHtml = ''
    if (adComments.length > 0) {
        for (const comment of adComments) {
            const user = await getUserById(comment.userId)
            commentsHtml += `
                <div>
                    <p><strong>${user.firstName} ${user.lastName}</strong>:</p>
                    <p>${comment.text}</p>
                </div>
            `
        }
    } else {
        commentsHtml = '<p>No comments yet.</p>'
    }

    commentsContainer.innerHTML = commentsHtml
}

async function handlePostComment() {
    const commentInput = document.querySelector('#commentInput')
    const commentText = commentInput.value.trim()

    if (commentText === '') {
        return
    }

    await createComment(commentText, adId, userId)

    commentInput.value = ''
    loadComments()
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadAdInfo()
    await loadComments()

    const likeBtn = document.querySelector('#likeBtn')
    likeBtn.addEventListener('click', handleLikeClick)

    const postCommentBtn = document.querySelector('#postCommentBtn')
    postCommentBtn.addEventListener('click', handlePostComment)
})
