import { getCategories } from "./api_categories.js"

async function loadData() {
    const categories = await getCategories()
    showCategories(categories)
}

function showCategories(categories) {
    const previous = document.querySelector('#previous')
    const next = document.querySelector('#next')
    const image = document.querySelector('#categoryImage')
    const description = document.querySelector('#categoryName')
    let currentIndex = 0

    function updateCategory() {
        const category = categories[currentIndex]
        image.src = category.image
        description.innerHTML = category.name
    }
    
    previous.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + categories.length) % categories.length
        updateCategory()
    })
    
    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % categories.length
        updateCategory()
    })
    
    updateCategory()
    
    
}

window.addEventListener('DOMContentLoaded', loadData)
