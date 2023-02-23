// /* register.js */

// const form = document.querySelector('#registrationForm');
//       form.addEventListener('submit', async (event) => {
//         event.preventDefault();
//
//         try {
//           const response = await axios.post('/register', data);
//           console.log(response.data);
//           alert('Registration successful!');
//         } catch (error) {
//           console.error(error);
//           alert('Registration failed');
//         }
//       });

window.addEventListener('DOMContentLoaded', () => {
	//   var input = document.querySelector('#phone');
	//   const telInput = window.intlTelInput(input, {
	//     // show dial codes too
	//     separateDialCode: true,
	//     // If there are some countries you want to show on the top.
	//     // here we are promoting russia and singapore.
	//     preferredCountries: ['ro', 'gb'],
	//     //Default country
	//     initialCountry: 'gb',
	//     // show only these countres, remove all other
	//     // onlyCountries: ["ru", "cn","pk", "sg", "my", "bd"],
	//     // If there are some countries you want to execlde.
	//     // here we are exluding india and israel.
	//     // excludeCountries: ["in","il"]
	//   });

	const form = document.getElementById('registerForm');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const userFullName = document.querySelector('#inputFullName').value;
		const userEmail = document.querySelector('#inputEmail').value;
		const userCountry = document.querySelector('#inputCountry').value;
		const userCity = document.querySelector('#inputCity').value;
		const userPassword = document.querySelector('#inputPassword').value;
		const userPasswordConfirm = document.querySelector(
			'#inputPasswordConfirm',
		).value;
		const userPhone = document.querySelector('#inputPhone').value;
		const subscribe = document.querySelector('#subscribed').checked;
		const data = {
			userFullName,
			userEmail,
			userCountry,
			userCity,
			userPassword,
			userPasswordConfirm,
			userPhone,
			subscribed,
		};
		// const obj = new FormData();

		// obj.append();

		// console.log('obj', [...obj]);
		makeCall(data);
	});
});
const headers = {
	'Content-Type': 'json',
};
function makeCall(payload) {
	axios
		.post(window.location.href, {
			headers: headers,
			payload: payload,
		})
		.then(function (response) {
			let code = response.status;

			console.log('The code is', code);

			if (code === 200) {
				// sessionStorage.setItem('greenSuccess', 'true');
				window.location.href = '/customer-home';
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

// // const el = document.querySelector('#inputEmail')

// // el.addEventListener('change', () => {

// //     console.log('asdasda')

// //     // const selectedValue = telInput.getNumber();

// //     // console.log(selectedValue)
// // })

// // var currentTab = 0; // Current tab is set to be the first tab (0)
// // showTab(currentTab); // Display the crurrent tab

// // function showTab(n) {
// //   // This function will display the specified tab of the form...
// //   var x = document.getElementsByClassName("form-group");
// //   x[n].style.display = "block";
// //   //... and fix the Previous/Next buttons:
// //   if (n == 0) {
// //     document.getElementById("prevBtn").style.display = "none";
// //   } else {
// //     document.getElementById("prevBtn").style.display = "inline";
// //   }
// //   if (n == (x.length - 1)) {
// //     document.getElementById("nextBtn").innerHTML = "Submit";
// //   } else {
// //     document.getElementById("nextBtn")
// // .innerHTML = "Next";
// //   }
// //   //... and run a function that will display the correct step indicator:
// //   fixStepIndicator(n)
// // }

// // function nextPrev(n) {
// //   // This function will figure out which tab to display
// //   var x = document.getElementsByClassName("form-group");
// //   // Exit the function if any field in the current tab is invalid:
// //   if (n == 1 && !validateForm()) return false;
// //   // Hide the current tab:
// //   x[currentTab].style.display = "none";
// //   // Increase or decrease the current tab by 1:
// //   currentTab = currentTab + n;
// //   // if you have reached the end of the form...
// //   if (currentTab >= x.length) {
// //     // ... the form gets submitted:
// //     document.getElementById("regForm").submit();
// //     return false;
// //   }
// //   // Otherwise, display the correct tab:
// //   showTab(currentTab);
// // }

// // function validateForm() {
// //   // This function deals with validation of the form fields
// //   var x, y, i, valid = true;
// //   x = document.getElementsByClassName("form-group");
// //   y = x[currentTab].getElementsByTagName("input");
// //   // A loop that checks every input field in the current tab:
// //   for (i = 0; i < y.length; i++) {
// //     // If a field is empty...
// //     if (y[i].value == "") {
// //       // add an "invalid" class to the field:
// //       y[i].className += " invalid";
// //       // and set the current valid status to false
// //       valid = false;
// //     }
// //   }
// //   // If the valid status is true, mark the step as finished and valid:
// //   if (valid) {
// //     document.getElementsByClassName("step")[currentTab].className += " finish";
// //   }
// //   return valid; // return the valid status
// // }

// // function fixStepIndicator(n) {
// //   // This function removes the "active" class of all steps...
// //   var i, x = document.getElementsByClassName("step");
// //   for (i = 0; i < x.length; i++) {
// //     x[i].className = x[i].className.replace(" active", "");
// //   }
// //   //...
// //     // and adds the "active" class to the current step:
// //     x[n].className += " active";
// //   }

// // window.addEventListener('DOMContentLoaded', () => {
// //   console.log('DOMContentLoaded')
// //   const form = document.getElementById("register-form");
// //   const username = document.getElementById("username");
// //   const firstName = document.getElementById("first-name");
// //   const lastName = document.getElementById("last-name");
// //   const country = document.getElementById("country");
// //   const city = document.getElementById("city");
// //   const street = document.getElementById("street");
// //   const phone = document.getElementById("phone");
// //   const email = document.getElementById("email");
// //   const password = document.getElementById("password");

// //   form.addEventListener("submit", e => {
// //     e.preventDefault();

// //     let isValid = true;

// //     if (!firstName.checkValidity()) {
// //       document.getElementById("name-error").style.display = "block";
// //       document.getElementById("name-error").textContent = firstName.validationMessage;
// //       isValid = false;
// //     }
// //     if (!country.checkValidity()) {
// //       document.getElementById("country-error").style.display = "block";
// //       document.getElementById("country-error").textContent = "Please select a country.";
// //       isValid = false;
// //     }

// //     if (!city.checkValidity()) {
// //       document.getElementById("city-error").style.display = "block";
// //       document.getElementById("city-error").textContent = city.validationMessage;
// //       isValid = false;
// //     }

// //     if (!street.checkValidity()) {
// //       document.getElementById("street-error").style.display = "block";
// //       document.getElementById("street-error").textContent = street.validationMessage;
// //       isValid = false;
// //     }

// //     if (!phone.checkValidity()) {
// //       document.getElementById("phone-error").style.display = "block";
// //       document.getElementById("phone-error").textContent = phone.validationMessage;
// //       isValid = false;
// //     }

// //     if (!email.checkValidity()) {
// //       document.getElementById("email-error").style.display = "block";
// //       document.getElementById("email-error").textContent = email.validationMessage;
// //       isValid = false;
// //     }

// //     if (!password.checkValidity()) {
// //       document.getElementById("password-error").style.display = "block";
// //       document.getElementById("password-error").textContent = password.validationMessage;
// //       isValid = false;
// //     }

// //     if (isValid) {
// //       form.submit();
// //     }
// //   });
// // });
