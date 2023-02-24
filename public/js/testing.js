let ne = 3;

let mo = undefined;
if (ne === 1) {
	mo = ne;
} else {
	mo = 3;
}

$('.responsive').slick({
	dots: true,
	arrows: true,
	infinite: false,
	speed: 300,
	slidesToShow: 2,
	slidesToScroll: 1,
	variableWidth: true,

	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: false,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 0.5,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});



const alert = document.querySelector(".alert");

if(alert){
	setTimeout( ()=> {
		alert.parentNode.removeChild(alert);
	}, 1700)
}