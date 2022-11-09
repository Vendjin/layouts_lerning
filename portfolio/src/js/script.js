const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('.menu__close');

hamburger.addEventListener('click', () =>{
    menu.classList.add('active')
});

close.addEventListener('click', () =>{
    menu.classList.remove('active')
});

const percent = document.querySelectorAll('.skills__elem-percent'),
    progress_bar = document.querySelectorAll('.skills__elem-progress_bar');

// console.log((percent))

percent.forEach((item, index) => {
    progress_bar[index].style.width = item.innerHTML;
});