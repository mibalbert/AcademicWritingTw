// // /* register.js */

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const alert = document.querySelector('.alert');

  if (alert) {
    setTimeout(() => {
      alert.parentNode.removeChild(alert);
    }, 2700);
  }

  const inputPassword = document.getElementById('inputPassword');
  const inputPasswordConfirm = document.getElementById('inputPasswordConfirm');
  const incorectConfPassword = document.getElementById('incorect-confPassword');
  incorectConfPassword.style.display = 'none';
  // phoneAlert.style.display = 'none'

  const phoneNumber = document.getElementById('inputPhone');
  const phoneAlert = document.getElementById('incorect-phone');

  const form = document.querySelector('#registerForm');

  inputPasswordConfirm.addEventListener('change', () => {});

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validatePhoneNumber(phoneNumber.value)) {
      phoneAlert.style.display = 'block';
      setTimeout(() => {
        phoneAlert.style.display = 'none';
      }, 2000);
    } else {
      phoneAlert.style.display = 'none';
      if (inputPassword.value !== inputPasswordConfirm.value) {
        incorectConfPassword.style.display = 'block';
        setTimeout(() => {
          incorectConfPassword.style.display = 'none';
        }, 2000);
      } else {
        incorectConfPassword.style.display = 'none';
        form.submit();
      }
    }
  });
});

function validatePhoneNumber(number) {
  const phoneNumber = number;
  const countryCodes = ['RO', 'US', 'UK', 'FR', 'CA']; // Change this to the appropriate country codes

  let isValidNumber = false;
  let countryCode = '';

  for (let i = 0; i < countryCodes.length; i++) {
    countryCode = countryCodes[i];
    const phoneNumberObj = window.libphonenumber.parsePhoneNumberFromString(
      phoneNumber,
      countryCode
    );
    if (phoneNumberObj && phoneNumberObj.isValid()) {
      isValidNumber = true;
      break;
    }
  }

  if (isValidNumber) {
    return true;
  } else {
    return false;
  }
}
