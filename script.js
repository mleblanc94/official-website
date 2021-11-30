// Connect to server
fetch('http://localhost:3000/')
.then(response => response.json())
.then(console.log)
// Establish variables
let resetButton = document.getElementById('reset');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let submit = document.getElementById("submit");

// send the username and password to the database to verify authenticity of account
// function authenticator() {
//     let username = usernameInput.value;
//     let password = passwordInput.value;
//     for (let i = 0; i < userDatabase.length; i++)
//     if (username === userDatabase[i].username && password === userDatabase[i].password) {
//         i++;
//         window.open("main-page.html")
//     } else (
//         throwError()
//     )
// }

function throwError() {
    let errorMessage = document.querySelector('.wrong-creds');
    errorMessage.style.display = 'inline';
}

// Reset what the user has entered
let resetInput = () => {
    usernameInput.value = "";
    passwordInput.value = "";
}

// Calling server to check signin information
let checkSignIn = () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
        username: username,
        password: password
    }) 
})
.then(response => response.json())
.then (data => {
    if (data === 'success') {
        window.open("main-page.html")
    }
    else {
        throwError()
    }
})
}



resetButton.addEventListener("click", resetInput);
submit.addEventListener("click", checkSignIn);

// Temporary Database
let userDatabase = [
    {
        username: "mleblanc94",
        password: "Garfield20"
    },
    {
        username: "test",
        password: "test"
    }
]