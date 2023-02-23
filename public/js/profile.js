/* profile.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');

	const formElements = document.querySelectorAll('form input');
	const initialValues = {};
	const button = document.getElementById('saveChanges');

	formElements.forEach((element) => {
		initialValues[element.name] = element.value;

		element.addEventListener('input', (event) => {
			if (event.target.value !== initialValues[event.target.name]) {
				// the input value has been modified

				button.classList.remove('disabled');
			}
			initialValues[event.target.name] = event.target.value;
		});

		// const inputLogEmail = document.querySelector('#inputLogEmail').value;
		// const inputLogPassword = document.querySelector('#inputLogPassword').value;

		// const data = {
		//   inputLogEmail,
		//   inputLogPassword,
		// };
	});
	button.addEventListener('click', (e) => {
		makeCall(initialValues);
	});
});

const headers = {
	'Content-Type': 'json',
};
function makeCall(payload) {
	axios
		.put(window.location.href, {
			headers: headers,
			payload: payload,
		})
		.then(function (response) {
			let code = response.status;

			console.log('The code is', code);
			console.log(response.code);
			console.log(response.message);

			if (code === 200) {
				// sessionStorage.setItem('greenSuccess', 'true');
				// window.location.href = '/customer-home';
				console.log('it worked');
				window.location.reload();
			}
			// if (code === 409) {
			//   console.log("Email in use", code)
			//   // window.location.href = "/login";
			// }
		})
		.catch(function (error) {
			console.log(error);
			let code = error.response.status;
			console.log(error.response.status);
			console.log(error.response.message);

			//   if (code === 409) {
			//     sessionStorage.setItem('yellowTransit', 'true');
			//     location.reload();
			//   } else if (code === 403) {
			//     sessionStorage.setItem('yellowDelivered', 'true');
			//     location.reload();
			//   } else if (code === 404) {
			//     sessionStorage.setItem('redNotFound', 'true');
			//     location.reload();
			//   }
		});
}
