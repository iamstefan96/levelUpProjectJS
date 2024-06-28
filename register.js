import { createUser, getUsers } from "./api_users.js"

const btnRegister = document.querySelector('#btn-register')        
const text = document.querySelector('.show')
const errorText = document.querySelector('#error-text')

async function loadData(){
    try {
        const user = await newUser()
        console.log(user)
        if (user) {
            window.location.href = "/index.html"
        }
    } catch(error) {
        console.error(error)
    }
}

async function newUser() {
    const firstName = document.querySelector('#input-firstname').value 
    const lastName = document.querySelector('#input-lastname').value
    const username = document.querySelector('#input-username').value
    const password = document.querySelector('#input-password').value
    const password2 = document.querySelector('#input-password2').value
    const address = document.querySelector('#input-address').value
    const phoneNumber = document.querySelector('#input-phoneNumber').value
    const gender = document.querySelector('#input-male').checked ? 'M' : 'F'
    const admin = document.querySelector('#input-admin').checked

    if(password != password2){
        text.style.display = 'block'
        return
    } 
    if(firstName == '' || lastName == '' || password == '' || password2 == '' || address == '' || phoneNumber == ''){
        errorText.style.display = 'block'
        return
    }
    if(username.length < 5 || password.length < 5) {
        errorText.style.display = 'block'
        errorText.innerHTML = "Username and password must contain at least 5 characters."
        return
    }

    const users = await getUsers()
    const existingUser = users.find(user => user.username == username)
    if (existingUser) {
        errorText.style.display = 'block'
        errorText.innerHTML = "Username already exists. Please choose another username."
        return
    }

    try {
        const user = await createUser(firstName, lastName, username, password, address, phoneNumber, gender, admin)
        console.log(user)
        text.style.display = 'none'
        errorText.style.display = 'none'
        return user
    } catch(error) {
        console.error(error)
    }
}

btnRegister.addEventListener('click', loadData)
