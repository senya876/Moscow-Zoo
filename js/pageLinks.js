const authButtons = [
        ...document.querySelectorAll('.header__button-enter'),
        document.querySelector('#goToAuth')
    ],
    regButtons = [
        ...document.querySelectorAll('.header__button-registration'),
        document.querySelector('#goToReg')
    ],
    accountLinks = document.querySelectorAll('.header__button-moveto-account'),
    authModal = document.querySelector('#openModalIn'),
    regModal = document.querySelector('#openModalReg'),
    logoutButtons = document.querySelectorAll('.header__button-logout');

function htmlName() {
    let st = unescape(window.location.href);
    let r = st.substring(st.lastIndexOf('/') + 1, st.length);
    return r;
}
function logout() {
    let user = {
        surname: '',
        name: '',
        email: '',
        password: '',
        autoAuth: false
    };
    localStorage.setItem('user', JSON.stringify(user));
    window.location.reload();
}

dataAndLinksInit();
function dataAndLinksInit() {
    if (!localStorage.getItem('user')) {
        let user = {
            surname: '',
            name: '',
            email: '',
            password: '',
            autoAuth: false
        };
        localStorage.setItem('user', JSON.stringify(user));
    }
    if (!localStorage.getItem('accounts')) localStorage.setItem('accounts', JSON.stringify([]));

    if (htmlName() !== 'personal-account.html' && !JSON.parse(localStorage.getItem('user')).email) {
        authButtons.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.dataset.modalOpened = 'auth';
            });
        })
        regButtons.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.dataset.modalOpened = 'reg';
            });
        })

        authModal.addEventListener('click', ({ target }) => {
            if (target.getAttribute('id') === 'close'|| target.parentElement.getAttribute('id') === 'close' || target.classList.contains('modal')) {
                document.body.dataset.modalOpened = '';
                setTimeout(() => {
                    authForm.reset();
                }, 150);
            }
        });
        regModal.addEventListener('click', ({ target }) => {
            if (target.getAttribute('id') === 'close'|| target.parentElement.getAttribute('id') === 'close' || target.classList.contains('modal')) {
                document.body.dataset.modalOpened = '';
                setTimeout(() => {
                    regForm.reset();
                }, 150);
            }
        });

    } else if (htmlName() !== 'personal-account.html' && JSON.parse(localStorage.getItem('user')).email) {
        authButtons.forEach((elem) => {
            elem.classList.toggle('hidden');
        })
        regButtons.forEach((elem) => {
            elem.classList.toggle('hidden');
        })
        accountLinks.forEach((elem) => {
            elem.classList.toggle('hidden');
        })
        logoutButtons.forEach((elem) => {
            elem.classList.toggle('hidden');
        })

        logoutButtons.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        })
    }
}


export {
    authButtons,
    regButtons,
    accountLinks,
    authModal,
    regModal,
    logoutButtons,
    htmlName,
    logout,
    dataAndLinksInit
};