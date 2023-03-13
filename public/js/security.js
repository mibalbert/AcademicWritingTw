/** profile.js */

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const newPasswordConfirm = document.getElementById("newPasswordConfirm");

  const alertSuccess = document.getElementById("alert-good");
  const alertFailed = document.getElementById("alert-failed");
  const alertSame = document.getElementById("alert-the-same");
  alertSuccess.style.display = "none";
  alertFailed.style.display = "none";
  alertSame.style.display = "none";

  const incorectConfPassword = document.getElementById("incorect-confPassword");
  incorectConfPassword.style.display = "none";

  const form = document.getElementById("securityForm");

  newPasswordConfirm.addEventListener("change", () => {});

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

  const showErrorAlert = (alertElem) => {
    alertElem.style.display = "block";
    setTimeout(() => {
      alertElem.style.display = "none";
    }, 1700);
  };

  document.getElementById("saveChanges").addEventListener("click", () => {
    console.log("clicked");
    if (newPassword.value !== newPasswordConfirm.value) {
      showErrorAlert(incorectConfPassword);
    } else if (currentPassword.value === newPassword.value) {
      showErrorAlert(alertSame);
    } else {
      incorectConfPassword.style.display = "none";
      // form.submit();
      button.classList.add("disabled");
      axios
        .post("/security", {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        })
        .then(function (response) {
          console.log(response);
          button.classList.remove("disabled");

          if (
            response.data === "Congratulations! You have changed your password"
          ) {
            alertSuccess.style.display = "block";
            setTimeout(() => {
              currentPassword.value = "";
              newPassword.value = "";
              newPasswordConfirm.value = "";
              alertSuccess.style.display = "none";
            }, 1700);
          } else if (response.data === "Passwords don't match") {
            showErrorAlert(alertFailed);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});
