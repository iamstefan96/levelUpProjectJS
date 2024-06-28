import { editAd, getAdById} from "./api_ads.js"
import { getCategories } from "./api_categories.js"

const search = window.location.search
const params = new URLSearchParams(search)
const id = Number(params.get('id'))
const adId = Number(params.get('adId'))

const btnUpdate = document.querySelector('#edit-btn')
let ad 

document.addEventListener('DOMContentLoaded', async () => {
  try {
    ad = await getAdById(adId)
    await filteredCategory()
    fillFormWithData(ad)
    
  } catch (error) {
    console.error('Error:', error)
  }
})

function fillFormWithData(ad) {
  const { title, description, price, image, categoryId } = ad
  document.querySelector('#input-title').value = title
  document.querySelector('#input-description').value = description
  document.querySelector('#input-price').value = price
  document.querySelector('#input-image').value = image
  document.querySelector('#ctg-select').value = categoryId
}

async function updateAdData() {
  const title = document.querySelector('#input-title').value
  const description = document.querySelector('#input-description').value
  const price = document.querySelector('#input-price').value
  const image = document.querySelector('#input-image').value
  const categoryId = Number(document.querySelector('#ctg-select').value)
  const userId = id
  const errorMessage = document.querySelector('#error-message')

  if (title === '' || description === '' || price === '' || image === '') {
    errorMessage.style.display = 'block'
  } else {
    errorMessage.style.display = 'none'
    try {
      await editAd(adId, title, description, price, image, categoryId, userId)
      window.history.back()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

async function filteredCategory() {
  const select = document.querySelector('#ctg-select')
  const categories = await getCategories()

  categories.forEach(category => {
    const option = document.createElement('option')
    option.value = category.id
    option.textContent = category.name
    select.appendChild(option)
  })
}

btnUpdate.addEventListener('click', updateAdData)
