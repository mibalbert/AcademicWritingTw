/* profile.js */

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  // JavaScript code to add event listeners and disable submit button
  const newPasswordField = document.getElementById('newPassword');
  const newPasswordConfirmField = document.getElementById('newPasswordConfirm');
  const submitBtn = document.getElementById('submitBtn');

  // Add event listeners to the password fields
  newPasswordField.addEventListener('input', checkPasswords);
  newPasswordConfirmField.addEventListener('input', checkPasswords);

  function checkPasswords() {
    // Get the values of the password fields
    const newPasswordValue = newPasswordField.value;
    const newPasswordConfirmValue = newPasswordConfirmField.value;

    // Disable the submit button if the passwords don't match
    if (newPasswordValue !== newPasswordConfirmValue) {
      submitBtn.classList.add('disabled');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('disabled');
      submitBtn.disabled = false;
    }
  }
  
});
