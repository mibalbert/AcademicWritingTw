/** complete.js */

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");

  const { publishableKey } = await fetch("/config").then((r) => r.json());
  const stripe = Stripe(publishableKey);

  const params = new URLSearchParams(window.location.href);

  const clientSecret = params.get("payment_intent_client_secret");

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  const payedTotal = document.getElementById("payed-total");
  payedTotal.innerHTML = paymentIntent.amount / 100;

  const payedTotalCurrency = document.getElementById("payed-total-currency");

  payedTotalCurrency.innerHTML = paymentIntent.currency.toUpperCase();

  //   const paymentType = document.getElementById("payment-type");
  //   paymentType.innerHTML = paymentIntent.amount;
  const paymentStatus = document.getElementById("payment-status");
  paymentStatus.innerHTML = paymentIntent.status.toUpperCase();

  //   const paymentIntentPre = document.getElementById("payment-intent");

  //   paymentIntentPre.innerHTML = JSON.stringify(paymentIntent, null, 2);
});
