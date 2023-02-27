// /** login.js */



document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContent Loaded');

  const alert = document.querySelector(".alert");

  if(alert){
    setTimeout( ()=> {
      alert.parentNode.removeChild(alert);
    }, 2700)
  }

});

// const form = document.getElementById('loginForm');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);

//   for (var pair of formData.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }


//   const response = await fetch('/login', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();

//   if (data.exists) {
//     // Email exists, submit the form
//     form.submit();
//   } else {
//     // Email not found, show the alert
//     const alertContainer = document.querySelector('#alert-container');
//     const alert = document.querySelector('#alert');

//     alertContainer.appendChild(alert);
//     alert.classList.remove('d-none');
//   }
// });













// //     const form = document.getElementById('loginForm');

// //     form.addEventListener('submit', async (e) => {
// //       e.preventDefault();
// //       const inputLogEmail = document.querySelector('#inputLogEmail').value;
// //       const inputLogPassword = document.querySelector('#inputLogPassword').value;

// //       const data = {
// //         inputLogEmail,
// //         inputLogPassword,
// //       };

// // document.addEventListener('DOMContentLoaded', () => {
// //   console.log('DOMContent Loaded');

// //   sessionStorage.removeItem('incorectEmail');
// //   sessionStorage.removeItem('incorectPassword');
// //   sessionStorage.removeItem('loggedSuccesful');

// //   const incorectEmail = sessionStorage.getItem('incorectEmail');
// //   const incorectPassword = sessionStorage.getItem('incorectPassword');

// //   console.log(incorectEmail);

// //   function makeCall(payload) {
// //     return axios.post('/login', { payload });
// //   }
// //   const form = document.getElementById('loginForm');

// //   form.addEventListener('submit', async (e) => {
// //     e.preventDefault();
// //     const inputLogEmail = document.querySelector('#inputLogEmail').value;
// //     const inputLogPassword = document.querySelector('#inputLogPassword').value;

// //     const data = {
// //       inputLogEmail,
// //       inputLogPassword,
// //     };

// //     console.log('clicked');

// //     try {
// //       const response = await makeCall(data);
// //       console.log("REsponse",response);
// //       const code = response.status;

// //       if (code === 404) {
// //         sessionStorage.setItem('incorectEmail', 'true');
// //       } else if (code === 409) {
// //         sessionStorage.setItem('incorectPassword', 'true');
// //       } else {
// //         // sessionStorage.setItem('loggedSuccesful', 'true');
// //         // window.location.href = '/customer-home';
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       const code = error.response.status;
// //       console.log(error.response.status);
// //       console.log(error.response.message);
// //     }
// //   });
// // });

// // // Get the form element and add an event listener to listen for form submission

// // document.addEventListener('DOMContentLoaded', () => {
// //   console.log('DOMContent Loaded');

// // 	sessionStorage.removeItem('incorectEmail')
// // 	sessionStorage.removeItem('incorectPassword')
// // 	sessionStorage.removeItem('loggedSuccesful')

// // 	const incorectEmail = sessionStorage.getItem('incorectEmail')
// // 	const incorectPassword = sessionStorage.getItem('incorectPassword');

// // 	console.log(incorectEmail)

// // 	sessionStorage.removeItem('incorectEmail')
// // 	sessionStorage.removeItem('incorectPassword')
// // 	sessionStorage.removeItem('loggedSuccesful')

// // 	const incorectEmail = sessionStorage.getItem('incorectEmail')
// // 	const incorectPassword = sessionStorage.getItem('incorectPassword');

// // 	console.log(incorectEmail)
// // 	// if(incorectEmail) {

// // 	// }

// //   const form = document.getElementById('loginForm');
// //   const loginError = document.getElementById('login-error');

// //   form.addEventListener('submit', async (e) => {
// //     console.log('submit clicked')
// //     e.preventDefault();
// //     const inputLogEmail = document.querySelector('#inputLogEmail').value;
// //     const inputLogPassword = document.querySelector('#inputLogPassword').value;

// //     const data = {
// //       inputLogEmail,
// //       inputLogPassword,
// //     };

// //     console.log("the make call", await makeCall(data));
// //   });
// // });

// // function makeCall(payload) {
// //   axios
// //     .post('/login', {
// //       payload: payload,
// //     })
// //     .then(function (response) {
// //       // let code = response.status;
// // 			console.log(response)
// //       if (code === 404) {
// //         sessionStorage.setItem('incorectEmail', 'true');
// //       } else if (code === 409) {
// //         sessionStorage.setItem('incorectPassword', 'true');
// //       } else {
// //         sessionStorage.setItem('loggedSuccesful', 'true');
// //         window.location.href = '/customer-home';
// //       }
// //     })
// //     .catch(function (error) {
// //       console.log(error);
// //       let code = error.response.status;
// //       console.log(error.response.status);
// //       console.log(error.response.message);

// //       //   if (code === 409) {
// //       //     sessionStorage.setItem('yellowTransit', 'true');
// //       //     location.reload();
// //       //   } else if (code === 403) {
// //       //     sessionStorage.setItem('yellowDelivered', 'true');
// //       //     location.reload();
// //       //   } else if (code === 404) {
// //       //     sessionStorage.setItem('redNotFound', 'true');
// //       //     location.reload();
// //       //   }
// //     });
// // }
