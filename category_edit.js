import { updateCategory, getCategoryById } from "./api_categories.js"

const search = window.location.search
const params = new URLSearchParams(search)
const id = Number(params.get('id'))

const btnUpdate = document.querySelector('#btn-update')

async function fillFormWithData() {
    try {
        const category = await getCategoryById(id)
        document.querySelector('#input-name').value = category.name
        document.querySelector('#input-image').value = category.image
    } catch (error) {
        console.error('Error:', error)
    }
}

async function updateCategoryData() {
    const name = document.querySelector('#input-name').value
    const image = document.querySelector('#input-image').value
    const errorMessage = document.querySelector('#error-message')

    if (name == '' || image == '') {
        errorMessage.style.display = 'block'
    }else {
        errorMessage.style.display = 'none'
        try {
            await updateCategory(id, name, image)
            window.history.back()
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

fillFormWithData()

btnUpdate.addEventListener('click', updateCategoryData)
