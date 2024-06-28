import { createAd } from "./api_ads.js"
import { getCategories } from "./api_categories.js"

const search = window.location.search
const params = new URLSearchParams(search)
const id = Number(params.get('id'))

const btnAdd = document.querySelector('#add-btn')


async function newCategory() {
    const title = document.querySelector('#input-title').value
    const description = document.querySelector('#input-description').value
    const price = document.querySelector('#input-price').value
    const image = document.querySelector('#input-image').value
    const categoryId = document.querySelector('#ctg-select').value
    const userId = id
    const errorMessage = document.querySelector('#error-message')

    if(title == '' || description == '' || price == '' || image == ''){
        errorMessage.style.display = 'block'
    }else {
        errorMessage.style.display = 'none'
        try {
            await createAd(title, description, price, image, Number(categoryId), userId)
            window.history.back()
        }catch(error) {
            console.error('Error:', error)
        }
    } 

}
async function filteredCategory() {
    const select = document.querySelector('#ctg-select')
    const categories = await getCategories()
    
    for (const category of categories) {
        const option = document.createElement('option')
        option.value = category.id.toString()
        option.innerHTML = category.name
        select.appendChild(option)
    } 
}

btnAdd.addEventListener('click', newCategory)
window.addEventListener('DOMContentLoaded', filteredCategory())
