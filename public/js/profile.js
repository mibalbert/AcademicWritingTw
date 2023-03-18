/* profile.js */

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const alert = document.getElementById("alert");

  if (alert) {
    setTimeout(() => {
      alert.remove();
    }, 1700);
  }

  // const firstName = document.getElementById("inputFirstName");
  // const lastName = document.getElementById("inputLastName");
  // const country = document.getElementById("inputCountry");
  // const city = document.getElementById("inputCity");
  // const phone = document.getElementById("inputPhone");

  const formElements = document.querySelectorAll("form input");
  const initialValues = {};
  const button = document.getElementById("saveChanges");

  formElements.forEach((element) => {
    initialValues[element.name] = element.value;

    element.addEventListener("input", (event) => {
      if (event.target.value !== initialValues[event.target.name]) {
        // the input value has been modified
        button.classList.remove("disabled");
      }

      initialValues[event.target.name] = event.target.value;
    });
  });

  // document.getElementById("saveChanges").addEventListener("click", () => {
  //   axios
  //     .post("/profile", {
  //       firstName: firstName.value,
  //       lastName: lastName.value,
  //       country: country.value,
  //       city: city.value,
  //       phone: phone.value,
  //     })
  //     .then(function (response) {
  //       if (response.statusText) {
  //         alert.style.display = "block";
  //         setTimeout(() => {
  //           alert.style.display = "none";
  //         }, 1700);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // });
});
