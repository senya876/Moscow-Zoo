var timer;
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".main__slider-item");
    let dots = document.querySelectorAll(".main__slider-itemDots");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    clearTimeout(timer);
    timer = setTimeout(() => nextSlide(1), 4000);
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function backSlide() {
    showSlides(slideIndex -= 1);  
}