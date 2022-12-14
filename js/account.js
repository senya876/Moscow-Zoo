import { logout } from "./pageLinks.js";

const user = JSON.parse(localStorage.getItem('user'));
if (!user.email) {
    window.location.href = 'index.html';
}

if (!user.autoAuth) {
    window.onbeforeunload = () => {
        localStorage.setItem('user', JSON.stringify({
            surname: '',
            name: '',
            email: '',
            password: '',
            autoAuth: false
        }));
    };
}
//
const logoutButtons = document.querySelectorAll('.header__button-logout');
logoutButtons.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
})
//
const userName = document.querySelector('#user-name'),
      userSurname = document.querySelector('#user-surname'),
      userEmail = document.querySelector('#user-email'),
      userPassword = document.querySelector('#user-password');

userName.textContent += ' ' + user.name;
userSurname.textContent += ' ' + user.surname;
userEmail.textContent += ' ' + user.email;
userPassword.textContent += ' ' + user.password;