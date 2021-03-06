// Establish Variables
let resetButton = document.getElementById('reset');
let firstNameInput = document.getElementById('firstName-input');
let lastNameInput = document.getElementById('lastName-input');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let submit = document.getElementById('submit');

// Send the users information to the database to save the new account information
function createAccount() {
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    console.log(firstName, lastName, username, password);
    fetch('https://shrouded-chamber-54170.herokuapp.com/register', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    }) 
})
.then(response=> response.json())
.then(user => {
    if (user.id) {
        window.open("main-page.html");
    }
})
}

// Reset what the user has entered
let resetInput = () => {
    usernameInput.value = "";
    passwordInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
}

resetButton.addEventListener("click", resetInput);
submit.addEventListener("click", createAccount);