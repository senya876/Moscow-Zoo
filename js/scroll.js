// Функция получения названия страницы
function htmlName() {
    let st = unescape(window.location.href);
    let i = false;
    let r = st.substring(st.lastIndexOf('/') + 1, st.length);

    return r;
};
// Функция скроллинга
function scrollToelement(elem){
    elem.scrollIntoView({
        behavior: 'smooth'
    });
};



// Скролл к элементу после перехода с другой страницы
if (localStorage.getItem('toElement')){
    let elem = document.querySelector(JSON.parse(localStorage.getItem('toElement')).element);
    scrollToelement(elem);
}
localStorage.setItem('toElement','');
// Сброс
const allLinks = document.querySelectorAll('a');
allLinks.forEach((elem) => {
    if (htmlName() === 'index.html') {
        if (elem.textContent === 'Главная') {
            elem.remove();
        }
    }

    if (htmlName() === 'types-of-animals.html') {
        if (elem.textContent === 'Виды животных') {
            elem.remove();
        }
    }
    
    elem.addEventListener('click', (e) => {
        if (elem.getAttribute('href') === '#') {
            e.preventDefault(); 
        }
    });
})
// По клику скролл к блокам
const links = Array.from(document.querySelectorAll('.links'));
links.forEach((elem) => {
    if (elem.textContent.trim() === 'О нас'){
        elem.addEventListener('click' , (e) => {
            if (htmlName() === 'index.html'){
                const about = document.querySelector('#about'); 
                scrollToelement(about);
            } else{
                window.location.href='index.html';
                localStorage.setItem('toElement', JSON.stringify({element: "#about"}));
            }
        });
    }
    if (elem.textContent.trim() === 'Контакты'){
        elem.addEventListener('click' , (e) => {
            if (htmlName() === 'index.html'){
                const contact = document.querySelector('#contact'); 
                scrollToelement(contact);
            } else{
                window.location.href='index.html';
                localStorage.setItem('toElement', JSON.stringify({element: "#contact"}));
            }
        });
    }
    if (elem.textContent.trim() === 'Услуги'){
        elem.addEventListener('click' , (e) => {
            if (htmlName() === 'index.html'){
                const services = document.querySelector('#services'); 
                scrollToelement(services);
            } else{
                window.location.href='index.html';
                localStorage.setItem('toElement', JSON.stringify({element: "#services"}));
            }
        });
    }
})