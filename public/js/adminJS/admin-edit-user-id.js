window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const alert = document.querySelector("#alert-border-3");

  if (alert) {
    setTimeout(() => {
      alert.parentNode.removeChild(alert);
    }, 1700);
  }

  // const inputPassword = document.getElementById("inputPassword");
  // const inputPasswordConfirm = document.getElementById("inputPasswordConfirm");
  // const incorectConfPassword = document.getElementById("incorect-confPassword");
  // incorectConfPassword.style.display = "none";
  // // phoneAlert.style.display = 'none'

  // const phoneNumber = document.getElementById("inputPhone");
  // const phoneAlert = document.getElementById("incorect-phone");

  // const form = document.querySelector("#edit-user-form");

  // inputPasswordConfirm.addEventListener("change", () => {});

  // form.addEventListener("submit", async (event) => {
  //   event.preventDefault();

  //   if (!validatePhoneNumber(phoneNumber.value)) {
  //     phoneAlert.style.display = "block";
  //     setTimeout(() => {
  //       phoneAlert.style.display = "none";
  //     }, 2000);
  //   } else {
  //     phoneAlert.style.display = "none";
  //     if (inputPassword.value !== inputPasswordConfirm.value) {
  //       incorectConfPassword.style.display = "block";
  //       setTimeout(() => {
  //         incorectConfPassword.style.display = "none";
  //       }, 2000);
  //     } else {
  //       incorectConfPassword.style.display = "none";
  //       form.submit();
  //     }
  //   }
  // });
});
