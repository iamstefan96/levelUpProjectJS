import { getUserByUsernameAndPassword } from "./api_users.js"

const btnLogin = document.querySelector('#btn-login')
const errorMessage = document.querySelector('#show')
btnLogin.addEventListener('click', loadData)

async function loadData() {
    const user = await logUser()
    console.log(user)
}
async function logUser(){
    const username = document.querySelector('#input-username').value
    const password = document.querySelector('#input-password').value

    const user = await getUserByUsernameAndPassword(username, password)
    console.log(user)
    if (user.length == 0) {
        errorMessage.innerHTML = 'Username or password do not match!'
    } else {
        const userId = user[0].id

        if(user[0].admin == true){
            window.location.href = `/admin.html?id=${userId}`
        }else {
            window.location.href = `/user.html?id=${userId}`
        }
    }
}
