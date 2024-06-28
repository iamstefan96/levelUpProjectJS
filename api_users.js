// pribavljanje svih korisnika
async function getUsers() {
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    const data = await response.json()
    return data
}
// pribavljanje korisnika po id-ju
async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}
// Pribavljanje korisnika po username i password
async function getUserByUsernameAndPassword(username, password) {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`, {method: 'GET'})
    const data = await response.json()
    return data
}
// Kreiranje novog korisnika
async function createUser(firstName, lastName, username, password, address, phoneNumber, gender, admin) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            firstName: firstName,
            lastName: lastName, 
            username: username, 
            password: password, 
            address: address, 
            phoneNumber: phoneNumber,
            gender: gender,
            admin: admin
        })
    })
    const data = await response.json()
    return data
}
// azuriranje korisnika
async function editUser(id,firstName, lastName, username, password, address, phoneNumber, gender, admin) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            firstName: firstName,
            lastName: lastName, 
            username: username, 
            password: password, 
            address: address, 
            phoneNumber: phoneNumber,
            gender: gender,
            admin: admin
        })
    })
    const data = await response.json()
    return data
}

export { getUsers, getUserById, createUser, editUser, getUserByUsernameAndPassword }