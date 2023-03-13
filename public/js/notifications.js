/** notifications.js */

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const checkbox = document.getElementById("flexSwitchCheckChecked");

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      // Code to run when the checkbox is checked
      axios
        .post("/notifications", {
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
    } else {
      // Code to run when the checkbox is unchecked
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
