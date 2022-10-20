$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow_left_icon.svg" alt="left_arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow_right_icon.svg" alt="right_arrow"></button>',
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });
});