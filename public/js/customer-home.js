window.addEventListener("DOMContentLoaded", () => {
  const newOrder = document.getElementById("new-order");

  // if (newOrder) location.reload();
  // if (newOrder) location.reload();

  const alert = document.getElementById("alert");

  if (alert) {
    setTimeout(() => {
      alert.style.display = "none";
      // location.reload();
    }, 1700);
  }

  $(function () {
    let slickSettings = {
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1.85,
      slidesToScroll: 1,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 1224,
          settings: {
            slidesToShow: 1.45,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1.15,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 782,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    $(".responsive").slick(slickSettings);
  });
});
