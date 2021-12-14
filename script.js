// Establish variables
let resetButton = document.getElementById('reset');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let submit = document.getElementById("submit");

// Display an error message when the user puts in invalid credentials
function throwError() {
    let errorMessage = document.querySelector('.wrong-creds');
    errorMessage.style.display = 'inline';
}

// Reset input the user has entered
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
.then (user => {
    if (user.id) {
        window.open("main-page.html")
    }
    else {
        throwError()
    }
})
}

resetButton.addEventListener("click", resetInput);
submit.addEventListener("click", checkSignIn);