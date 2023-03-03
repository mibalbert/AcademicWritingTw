
/** complete.js */

window.addEventListener('DOMContentLoaded', async () => {
    console.log("DOMContentLoaded")

    const { publishableKey } = await fetch('/config').then( r => r.json() )
    const stripe = Stripe(publishableKey)

    const params = new URLSearchParams(window.location.href)

    const clientSecret = params.get('payment_intent_client_secret')

    const {paymentIntent} =  await stripe.retrievePaymentIntent(clientSecret)

    const paymentIntentPre = document.getElementById('payment-intent') 

    paymentIntentPre.innerHTML = JSON.stringify(paymentIntent, null, 2)

})