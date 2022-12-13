import {logoutButtons, logout} from "./pageLinks.js";

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
// 1. Во время авторизации не срабатывает проверка "запомнить вход"
// 2. Вывод данных пользователя в этом скрипте и использовать импортированные кнопки