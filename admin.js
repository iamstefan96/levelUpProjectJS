import { getUserById } from "./api_users.js"
import { getCategories, deleteCategoryById } from "./api_categories.js"

const search = window.location.search
const params = new URLSearchParams(search)
const id = Number(params.get('id'))

async function loadData() {
    const user = await getUserById(id)
    const categories = await getCategories()

    showData(user)
    showCategories(categories)
}

function showData(user) {
    const links = document.querySelector('#log-out')
    const logOut = document.createElement('a')
    logOut.href = 'login.html'
    logOut.addEventListener('click', function() {
        window.location.replace('login.html')
        history.replaceState({}, document.title, 'login.html')
    })
    logOut.innerHTML = 'Log out'
    links.appendChild(logOut)

    const adminDataDiv = document.querySelector('#admin-data')

    const fullName = document.createElement('h3')
    fullName.innerHTML = user.firstName + " " + user.lastName
    adminDataDiv.appendChild(fullName)

    const adminAddress = document.createElement('p')
    adminAddress.innerHTML = `Address: ${user.address}`
    adminDataDiv.appendChild(adminAddress)

    const adminPhoneNumber = document.createElement('p')
    adminPhoneNumber.innerHTML = `Phone number: ${user.phoneNumber}`
    adminDataDiv.appendChild(adminPhoneNumber)
}

function showCategories(categories) {
    const table = document.querySelector('#table')

    for (const category of categories) {
        const tr = document.createElement('tr')

        const tdName = document.createElement('td')
        tdName.innerHTML = category.name
        tr.appendChild(tdName)

        const tdImage = document.createElement('td')
        const img = document.createElement('img')
        img.src = category.image
        img.style.width = '70px'
        img.style.height = '70px'
        tdImage.appendChild(img)
        tr.appendChild(tdImage)

        const btnRemove = document.createElement('button')
        btnRemove.innerHTML = 'Delete'
        btnRemove.classList.add('btn', 'btn-dark')
        tr.appendChild(btnRemove)

        btnRemove.addEventListener('click', async function() {  
            await deleteCategoryById(category.id)
            let row = this.parentNode
            row.remove()
        }) 

        const tdEdit = document.createElement('td')
        const link = document.createElement('a')
        link.href = `/category_edit.html?id=${category.id}`
        link.innerHTML = 'Edit'
        link.classList.add('btn', 'btn-dark')
        tdEdit.appendChild(link)
        tr.appendChild(tdEdit)

        table.appendChild(tr)
    }
}

window.addEventListener('DOMContentLoaded', loadData)
