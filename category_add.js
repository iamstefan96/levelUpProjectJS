import { createCategory } from "./api_categories.js"

const btnAdd = document.querySelector('#btn-add')

async function newCategory() {
    const name = document.querySelector('#input-name').value
    const image = document.querySelector('#input-image').value
    const errorMessage = document.querySelector('#error-message')

    if(name == '' || image == ''){
        errorMessage.style.display = 'block'
    }else {
        errorMessage.style.display = 'none'
        try {
            await createCategory(name, image)
            window.history.back()
        }catch(error) {
            console.error('Error:', error)
        }
    } 

}

btnAdd.addEventListener('click', newCategory)