const btnModalCreateUser = document.querySelector('#btn-submit')

const formCreateUser = document.querySelector('#form-user')

const createUser = async (e) => {
    e.preventDefault();

    const inputNameValue = document.querySelector('#input-name').value
    const inputGenderValue = document.querySelector('input[name=gender]:checked')?.value
    const inputEmailValue = document.querySelector('#input-email').value
    const inputStatusValue = document.querySelector('#status-user').value

    const bodyToSend = {
        name: inputNameValue,
        gender: inputGenderValue === 'Masculino' ? 'male' : 'female',
        email: inputEmailValue,
        status: inputStatusValue,
    }

    fetch(baseURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer cdaf3c28cefcc17f551e710dc59c0d5e5d9ae1fa5789a2903eee7746724677dd`
        },
        body: JSON.stringify(bodyToSend),
    })
        .then(async (response) => {
            if (response.status !== 201) {
                alert("Houve algum problema ao tentar criar o usuário!")
            }

            if (response.status === 201) {   
                await DisplayUsers()
            }
        })
        .catch((error) => error)
        .finally(() => {
            const modal = document.querySelector("#open-modal-user");
            modal.classList.remove('open');

            formCreateUser.reset()
        })
}

btnModalCreateUser.addEventListener('click', createUser)