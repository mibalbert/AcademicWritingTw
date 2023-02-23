// const stripe = stripe('pk_test_51M8J3ODkSINlMgTAHhY9Mgtc1SLvrLobqV4o9SbXSRP3xD28KcdCJfoqfhrNZ5kuesWzSMJOJxy4IXEoUA61k6Xb005OKKQQCV');

// const elements = stripe.elements();
// const cardElement = elements.create('card');

// cardElement.mount('#card-element');

// const form = document.getElementById('payment-form');
// const submitButton = document.getElementById('submit');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   submitButton.disabled = true;

//   const { paymentIntent, error } = await stripe.confirmCardPayment(
//     '${paymentIntent.client_secret}',
//     {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: form.querySelector('input[name="name"]').value,
//         },
//       },
//     }
//   );

//   if (error) {
//     // Display error message
//     console.error(error);
//     submitButton.disabled = false;
//   } else {
//     // Payment succeeded
//     console.log(paymentIntent);
//     submitButton.disabled = false;
//   }
//   const { paymentMethod, error } = await stripe.createPaymentMethod({
//     type: 'card',
//     card: cardNumber,
//     billing_details: {
//       name: document.getElementById('name').value,
//     },
//   });

//   if (error) {
//     console.error(error);
//   } else {
//     // Send the payment method ID to your server to complete the payment
//     const response = await fetch('/charge', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
//     });
//     if (response.ok) {
//       console.log('Payment successful!');
//     } else {
//       console.error('Payment failed.');
//     }
//   }
// });
