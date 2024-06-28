import { getAds } from "./api_ads.js";
import { getCategoryById, getCategories } from "./api_categories.js";
import { getUserById } from "./api_users.js";

const search = window.location.search;
const params = new URLSearchParams(search);
const id = Number(params.get('id'));

let ads = [];

async function loadData() {
    ads = await getAds();
    const categories = await getCategories();
    populateCategories(categories);
    showAds(ads);
        
    
    const logout = document.querySelector('#log-out');
    const logOutLink = document.createElement('a');
    logOutLink.href = 'login.html';
    logOutLink.innerHTML = 'Log out';
    logout.appendChild(logOutLink);
}

function populateCategories(categories) {
    const select = document.querySelector('#select');
    select.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All categories';
    select.appendChild(allOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id.toString();
        option.textContent = category.name;
        select.appendChild(option);
    });
}


async function showAds(ads) {
    const container = document.querySelector('#container');
    container.innerHTML = '';

    for (const ad of ads) {
        const div = document.createElement('div');

        const tdTitle = document.createElement('h3');
        tdTitle.textContent = ad.title;
        div.appendChild(tdTitle);

        const desc = document.createElement('p');
        desc.textContent = ad.description;
        div.appendChild(desc);

        const prc = document.createElement('p');
        prc.textContent = `Price: ${ad.price}`;
        div.appendChild(prc)

        const imgContainer = document.createElement('p');
        const img = document.createElement('img');
        img.src = ad.image;
        img.style.width = '70px';
        img.style.height = '70px';
        imgContainer.appendChild(img);
        div.appendChild(imgContainer);

        const ctgName = document.createElement('p');
        const category = await getCategoryById(ad.categoryId);
        ctgName.textContent = `Category: ${category.name}`;
        div.appendChild(ctgName);

        const author = document.createElement('p');
        const user = await getUserById(ad.userId);
        author.textContent = `Author: ${user.firstName} ${user.lastName}`;
        div.appendChild(author);

        const info = document.createElement('p');
        const link = document.createElement('a');
        link.href = `/ad_info.html?adId=${ad.id}&id=${id}`
        link.textContent = 'View ad'
        link.classList.add('btn', 'btn-dark')
        info.appendChild(link)
        div.appendChild(info)

        const br = document.createElement('br')
        div.appendChild(br)

        container.appendChild(div)
    }
}

async function filterAdsByCategoryAndPrice() {
    const select = document.querySelector('#select')
    const selectedCategory = select.value

    const priceFromInput = document.querySelector('input[placeholder="From"]')
    const priceToInput = document.querySelector('input[placeholder="To"]')
    const priceFrom = parseFloat(priceFromInput.value)
    const priceTo = parseFloat(priceToInput.value)

    const sortAttribute = document.querySelector('#sortAttribute').value
    const sortDirection = document.querySelector('#sortDirection').value

    const ads = await getAds()

    let filteredAds = ads.filter(ad => {
        const categoryIdMatches = selectedCategory === 'all' || ad.categoryId.toString() === selectedCategory
        const priceInRange = isNaN(priceFrom) || isNaN(priceTo) || (ad.price >= priceFrom && ad.price <= priceTo)
        return categoryIdMatches && priceInRange
    })

    if (sortAttribute === 'price') {
        filteredAds.sort((ad1, ad2) => {
            return sortDirection === 'asc' ? ad1.price - ad2.price : ad2.price - ad1.price
        })
    } else if (sortAttribute === 'title') {
        filteredAds.sort((ad1, ad2) => {
            return sortDirection === 'asc' ? ad1.title.localeCompare(ad2.title) : ad2.title.localeCompare(ad1.title)
        })
    }

    showAds(filteredAds)
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

window.addEventListener('DOMContentLoaded', loadData)
filterBtn.addEventListener('click', filterAdsByCategoryAndPrice)
