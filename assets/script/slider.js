$(".header-carousel__container").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  cssEase: "linear",
  fade: true,

  nextArrow: $(".header-carousel__next"),
  prevArrow: $(".header-carousel__prev"),
  // responsive: [
  //   {
  //     breakpoint: 1200,
  //     settings: {
  //       arrows: true,
  //       slidesToShow: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 992,
  //     settings: {
  //       arrows: true,
  //       slidesToShow: 3,
  //     },
  //   },
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       arrows: false,
  //       slidesToShow: 2,
  //       centerPadding: "40px",
  //       centerMode: true,
  //     },
  //   },
  //   {
  //     breakpoint: 600,
  //     settings: {
  //       arrows: false,
  //       slidesToShow: 1,
  //       centerPadding: "60px",
  //       centerMode: true,
  //     },
  //   },
  // ],
});

function initSlider() {
  $(".news-content__carousel").slick({
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
  });
}
