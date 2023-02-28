/* app.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	// let called = false;
	// document.addEventListener('scroll', (e) => {
	//   if (window.scrollY  <= 10) {
	//     called = false;
	//   }
	//   if (window.scrollY  >= 850) {
	//     if (called) return;
	//     called = true;
	//   }
	// })

	//   if (window.scrollY >= 220) {
	//     countUp()
	//   }
	// });

	const countUp = () => {};

	let functionCalled = false;

	function myFunction() {
		if (functionCalled) {
			return;
		}
		functionCalled = true;
		let valueDisplays = document.querySelectorAll('.num');
		let interval = 2000;
		valueDisplays.forEach((valueDisplay) => {
			let startValue = 0;
			let endValue = parseInt(valueDisplay.getAttribute('data-val'));
			let duration = Math.floor(interval / endValue);
			let counter = setInterval(() => {
				startValue += 1;
				valueDisplay.textContent = startValue;
				if (startValue == endValue) {
					clearInterval(counter);
				}
			}, duration);
		});
		// Function code here
	}
	window.addEventListener('scroll', function () {
		if (window.scrollY >= 175) {
			myFunction();
		}
	});
});
