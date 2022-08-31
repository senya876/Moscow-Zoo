var nameUser = document.getElementById('nameCheck');
var surnameUser = document.getElementById('surnameCheck');
var nameEmail = document.getElementById('emailCheck');
var namePassword = document.getElementById('passwordCheck');

// storing input from register-form
function store() {
    localStorage.setItem('nameUser', nameUser.value);
    localStorage.setItem('surnameUser', surnameUser.value);
    localStorage.setItem('nameEmail', nameEmail.value);
    localStorage.setItem('namePassword', namePassword .value);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedNameUser = localStorage.getItem('nameUser');
    var storedSurnameUser = localStorage.getItem('surnameUser');
    var storedEmail = localStorage.getItem('nameEmail');
    var storedPassword = localStorage.getItem('namePassword');

    // entered data from the login-form
    var userName = document.getElementById('nameCheck1');
    var userPw = document.getElementById('surnameCheck1');

    // check if stored data from register-form is equal to data from login form
    if(userName.value !== storedEmail || userPw.value !== storedPassword) {
        alert('ERROR');
    }else {
        alert('You are loged in.');
    }
}