'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}



/*const tempClient = {
    nome: "teste-update",
    email: "cezar.deev@gmail.com",
    celular: "21934567899",
    cidade: "São Jose dos Campos"
} */

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))


// CRUD - Create Read update delete


// CRUD - Delete
const deleteClient = (index, client) => {
    const dbClient = readClient()
    dbClient.splice (index, 1)
    setLocalStorage(dbClient)
}

// CRUD - Update
const updateclient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// CRUD - Read
const readClient = () => getLocalStorage()

// CRUD - Create
const createClient  = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
    
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}


// Interação com layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach (field => field.value = "")
}

const salveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client)
        clearFields()
        closeModal()
    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

//evento
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)    

document.getElementById('modalClose')
    .addEventListener('click', closeModal) 

document.getElementById('salvar')
    .addEventListener('click', salveClient)  

    