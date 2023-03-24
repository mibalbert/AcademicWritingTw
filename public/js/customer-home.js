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
  const container3 = document.querySelector(".container3");
  const show = document.querySelector(".show");
  // const width = window.innerWidth;
  // if (width <= 782) {
  //   console.log("width is less than 782");
  //   container3.style.display = "none";
  //   show.style.display = "block";
  // } else {
  //   console.log("width is greater than 782");
  //   container3.style.display = "block";
  //   show.style.display = "none";
  // }
  window.addEventListener("resize", function () {
    const width = window.innerWidth;
    if (width <= 782) {
      console.log("width is less than 782");
      container3.style.display = "none";
      show.style.display = "block";
    } else {
      console.log("width is greater than 782");
      container3.style.display = "block";
      show.style.display = "none";
    }
  });

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
