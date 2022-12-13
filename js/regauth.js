import * as Init from "./pageLinks.js";
import {dataAndLinksInit} from "./pageLinks.js";

const authForm = document.querySelector('#authForm'),
      regForm = document.querySelector('#regForm'),
      authEmailInput = document.querySelector('#authEmailInput'),
      authPasswordInput = document.querySelector('#passwordLoginInput'),
      regSurnameInput = document.querySelector('#regSurnameInput'),
      regNameInput = document.querySelector('#regNameInput'),
      regEmailInput = document.querySelector('#regEmailInput'),
      regPasswordInput = document.querySelector('#regPasswordInput'),
      agreementInput = document.querySelector('#agreement-input');

[authEmailInput, authPasswordInput, regSurnameInput, regNameInput, regEmailInput, regPasswordInput].forEach((elem) => {
    elem.addEventListener('input', () => {
        let span = elem.nextElementSibling;
        if (elem.classList.contains('error')) {
            elem.classList.toggle('error');
            span.remove();
        }
    })
})
function validateForm(isAuth =  false) {
    let errors = 0;

    if (isAuth) {
        validateInput(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, authEmailInput);
        validateInput(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10}$/, authPasswordInput);
    } else {
        validateInput(/^[А-Я][а-я]+$/, regSurnameInput);
        validateInput(/^[А-Я][а-я]+$/, regNameInput);
        validateInput(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, regEmailInput);
        validateInput(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10}$/, regPasswordInput);
    }


    function validateInput(pattern, input) {
        let inputValue = input.value.trim(), span;
        if (!pattern.test(inputValue)) {
            input.value = '';
            input.classList.add('error');
            span = document.createElement('span');
            span.classList.add('error');
            if (input.getAttribute('name') === 'email') {
                span.textContent = 'Имя почтового ящика, @, доменное имя (раздел. ".")';
            }
            if (input.getAttribute('name') === 'password') {
                span.textContent = '10 символов, минимум 1 буква лат. алфавита и 1 цифра';
            }
            if (input.getAttribute('name') === 'name'|| input.getAttribute('name') === 'surname') {
                span.textContent = 'Разрешена только кириллица';
            }
            input.parentElement.insertBefore(span, input.nextElementSibling);

            errors++;
        }

        return errors;
    }

    return errors <= 0;
}

authForm.addEventListener('submit', authFormdata);
function authFormdata(e) {
    e.preventDefault();

    if (validateForm(true)) {
        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let formData = new FormData(authForm);
        let obj = {}, currentUserid, span;

        for(let item of formData.entries()) {
            obj[item[0]] = item[1];
        }

        let correctData = {
            email: false,
            password: false
        };
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === obj.email && accounts[i].password === obj.password) {
                currentUserid = accounts[i];
                correctData.email = true;
                correctData.password = true;
            } else if (accounts[i].email === obj.email) {
                correctData.email = true;
            } else if (accounts[i].password === obj.password) {
                correctData.password = true;
            }
        }

        span = document.createElement('span')
        if (correctData.email && !correctData.password) {
            span.classList.add('error');
            span.textContent = 'Неверный пароль';
            authForm.insertBefore(span, regPasswordInput.nextElementSibling);
            regPasswordInput.value = '';
            regPasswordInput.classList.toggle('error');
            agreementInput.checked = false;
        } else if (correctData.email && correctData.password) {
            currentUserid.autoAuth = !!obj.checkbox;
            localStorage.setItem('user', JSON.stringify(currentUserid));
            document.body.dataset.modalOpened = '';
            setTimeout(() => {
                authForm.reset();
            }, 150);
            dataAndLinksInit();
        } else {
            span.classList.add('error');
            span.textContent = 'Пользователь с данным email-адресом не найден';
            regPasswordInput.value = '';
            regPasswordInput.classList.toggle('error');
            agreementInput.checked = false;
        }
    }
}

regForm.addEventListener('submit', regFormdata);
function regFormdata(e) {
    e.preventDefault();
    if (validateForm()) {
        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let formData = new FormData(regForm);
        let obj = {}, span;

        for(let item of formData.entries()) {
            obj[item[0]] = item[1];
        }
        obj.autoAuth = false;

        span = document.createElement('span');
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === obj.email) {
                span.classList.add('error');
                span.textContent = 'Данный email-адрес уже зарегистрирован';
                regForm.insertBefore(span, regEmailInput.nextElementSibling);
                regEmailInput.classList.toggle('error');
                return;
            }
        }
        accounts.push(obj);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        document.body.dataset.modalOpened = '';
        setTimeout(() => {
            regForm.reset();
        }, 150);
        dataAndLinksInit();
    }
}