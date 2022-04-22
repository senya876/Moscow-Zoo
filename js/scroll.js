function htmlName() {
    let st = unescape(window.location.href);
    let i = false;
    let r = st.substring(st.lastIndexOf('/') + 1, st.length);

    return r;
};

function scrollToelement(elem){
    console.log(elem)
    elem.scrollIntoView({
        behavior: 'smooth'
    });
};

(function autoScroll(){
    let elemSelector = localStorage.getItem('toElement');
    if (elemSelector !== ""){
        let elem = document.querySelector(JSON.parse(elemSelector).element);
        scrollToelement(elem);
    }
    localStorage.setItem('toElement','');
}())

const links = Array.from(document.querySelectorAll('.links'));
    
links.forEach((elem) => {
    if (elem.textContent.trim() === 'О нас'){
        elem.addEventListener('click' , (e) => {
            e.preventDefault();
            if (htmlName() === 'index.html'){
                const about = document.querySelector('#about'); 
                scrollToelement(about);
            } else{
                window.location.href='index.html';
                localStorage.setItem('toElement', JSON.stringify({element: "#about"}));
            }
            
        });
    }
})