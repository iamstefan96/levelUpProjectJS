import { getUserById } from "./api_users.js"
import { deleteAdById, getAdsByUserId} from "./api_ads.js"
import { getCategoryById, getCategories } from "./api_categories.js"

const search = window.location.search
const params = new URLSearchParams(search)
const id = Number(params.get('id'))



async function loadData() {
    const user = await getUserById(id)
    const ads = await getAdsByUserId(id)
    showData(user)
    showAds(ads)
    filteredCategory()


    const divLink = document.querySelector('#links')
    const logout = document.querySelector('#log-out')
    const newAd = document.createElement('a')
    newAd.href = `/add_ad.html?id=${id}`
    newAd.innerHTML = 'Add ad'
    const adsLink = document.createElement('a')
    adsLink.href = `/ads.html?id=${id}`
    adsLink.innerHTML = 'All ads'
    const logOut = document.createElement('a')
    logOut.href = 'login.html'
    logOut.addEventListener('click', function() {
        window.location.replace('login.html')
        history.replaceState({}, document.title, 'login.html')
    })
    logOut.innerHTML = 'Log out'
    divLink.appendChild(newAd)
    divLink.appendChild(adsLink)
    logout.appendChild(logOut)
}


async function filteredCategory() {
    const select = document.querySelector('#select')
    const categories = await getCategories()
    
    const allOption = document.createElement('option')
    allOption.value = 'all'
    allOption.textContent = 'All categories'
    select.appendChild(allOption)
  
    for (const category of categories) {
        const option = document.createElement('option')
        option.value = category.id.toString()
        option.textContent = category.name
        select.appendChild(option)
    }
}
async function filterAdsByCategory() {
    const select = document.querySelector('#select')
    const selectedCategory = select.value

    const ads = await getAdsByUserId(id)
  
    const filteredAds = ads.filter(ad => {
        if (selectedCategory === 'all') {
            return true
        } else {
            return ad.categoryId.toString() === selectedCategory
        }
    })
  
    showAds(filteredAds)
}
  
const filterBtn = document.querySelector('#filterBtn')
    
function showData(user) {
    const adminDataDiv = document.querySelector('#user-data')

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

async function showAds(ads) {
    const container = document.querySelector('#container')
    container.innerHTML = ''

    for (const ad of ads) {
        const div = document.createElement('div')
        const tdTitle = document.createElement('h3')
        tdTitle.innerHTML = ad.title
        div.appendChild(tdTitle)

        const desc = document.createElement('p')
        desc.innerHTML = ad.description
        div.appendChild(desc)

        const prc = document.createElement('p')
        prc.innerHTML = `Price: ${ad.price}`
        div.appendChild(prc)

        const im = document.createElement('p')
        const img = document.createElement('img')
        img.src = ad.image
        img.style.width = '100px'
        img.style.height = '100px'
        im.appendChild(img)
        div.appendChild(im)

        const ctgName = document.createElement('p')
        const category = await getCategoryById(ad.categoryId)
        ctgName.innerHTML = `Category: ${category.name}`
        div.appendChild(ctgName)

        const btnRemove = document.createElement('button')
        btnRemove.innerHTML = 'Delete'
        btnRemove.classList.add('btn', 'btn-dark')
        div.appendChild(btnRemove)

        btnRemove.addEventListener('click', async function() {  
            await deleteAdById(ad.id)
            let row = this.parentNode
            row.remove()
        }) 

        const edit = document.createElement('p')
        const link = document.createElement('a')
        link.href = `/ad_edit.html?adId=${ad.id}&id=${id}`
        link.classList.add('btn', 'btn-dark')
        link.innerHTML = 'Edit'
        edit.appendChild(link)
        div.appendChild(edit)
 
        const br = document.createElement('br')
        div.appendChild(br)

        container.appendChild(div)
    }
    
}

window.addEventListener('DOMContentLoaded', loadData)
filterBtn.addEventListener('click', filterAdsByCategory)
