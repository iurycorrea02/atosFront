const baseURL = 'https://gorest.co.in/public/v2/users'

const modals = document.querySelectorAll('[data-modal]')
const tableToInject = document.querySelector('#table-users')

modals.forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    event.preventDefault()

    const modal = document.getElementById(trigger.dataset.modal)

    modal.classList.add('open')

    const exits = modal.querySelectorAll('.modal-exit')

    exits.forEach(function (exit) {
      exit.addEventListener('click', function (event) {
        event.preventDefault()

        modal.classList.remove('open')
      })
    })
  })
})

async function fetchUsers() {
  const data = await fetch(baseURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer cdaf3c28cefcc17f551e710dc59c0d5e5d9ae1fa5789a2903eee7746724677dd`
    }
  })
  const response = await data.json()

  return response
}

async function DisplayUsers() {
  const users = await fetchUsers()

  let usersToInjectInTable = ''

  const usersFormattedToTable = users.map(({ id, name, email }) => {
    usersToInjectInTable += `
            <tr id="user_${id}">
                <th>${id}</th>
                <th>${name}</th>
                <th>${email}</th>
                <th>
                  <button id="btn-edit-${id}" class="btn-edit-user">Editar</button>
                  <button id="btn-delete-${id}" class="btn-delete-user">Excluir</button>
                </th>
            </tr>
        `
  })

  tableToInject.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
        </tr>
        ${usersToInjectInTable}
    `

  const btnsEditUsers = document.querySelectorAll('.btn-edit-user')
  btnsEditUsers.forEach(button => {
    button.addEventListener('click', editUser)
  })

  const btnsDeleteUsers = document.querySelectorAll('.btn-delete-user')
  btnsDeleteUsers.forEach(button => {
    button.addEventListener('click', deleteUser)
  })
}

DisplayUsers()

function editUser(event) {
  const idUser = event.target.id.replace('btn-edit-', '')
  console.log(idUser)

  fetch(`${baseURL}/${idUser}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer cdaf3c28cefcc17f551e710dc59c0d5e5d9ae1fa5789a2903eee7746724677dd`
    }
  })
    .then(async response => {
      console.log(response)
    })
    .catch(error => error)
}

function deleteUser(event) {
  const idUser = event.target.id.replace('btn-delete-', '')

  fetch(`${baseURL}/${idUser}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer cdaf3c28cefcc17f551e710dc59c0d5e5d9ae1fa5789a2903eee7746724677dd`
    }
  })
    .then(async response => {
      console.log(response)
    })
    .catch(error => error)
}

DisplayUsers()
