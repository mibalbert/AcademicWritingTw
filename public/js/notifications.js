/** notifications.js */

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const alertSuccess = document.getElementById("alert");
  const checkbox = document.getElementById("flexSwitchCheckChecked");
  alertSuccess.style.display = "none";

  checkbox.addEventListener("change", (event) => {
    console.log(event.target.checked);
    axios
      .post("/notifications-settings", {
        checked: event.target.checked,
      })
      .then(function (response) {
        if (
          response.data ===
          "Congratulations! You have changed your notifications settings!"
        ) {
          alertSuccess.style.display = "block";
          setTimeout(() => {
            alertSuccess.style.display = "none";
          }, 1700);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
