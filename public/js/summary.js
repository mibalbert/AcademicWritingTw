window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");

  const itemsData = new Map([
    [{ name: "Academic Paper Writing" }, { price: 10 }],
    [{ name: "Disertation Services" }, { price: 11 }],
    [{ name: "Writing Incl. Calculations" }, { price: 9 }],
    [{ name: "Admission Services" }, { price: 10 }],
    [{ name: "Math/Physic/Economic/Statistic Problems" }, { price: 40 }],
    [{ name: "Multiple Choice Questions" }, { price: 12 }],
    [{ name: "Editing" }, { price: 12 }],
    [{ name: "Proofreading" }, { price: 12 }],
    [{ name: "Rewriting" }, { price: 44 }],
    [{ name: "Copywriting" }, { price: 9 }],
    [{ name: "Resume/CV Services" }, { price: 10 }],
    [{ name: "Rewriting" }, { price: 12 }],
    [{ name: "Essay" }, { price: 12 }],
    [{ name: "Coursework" }, { price: 4 }],
    [{ name: "Research Paper" }, { price: 4 }],
    [{ name: "Term-paper" }, { price: 6 }],
    [{ name: "Case Study" }, { price: 54 }],
    [{ name: "Capstone Project" }, { price: 12 }],
    [{ name: "Assignment" }, { price: 43 }],
    [{ name: "Num. of Pages" }, { price: 43 }],
    [{ name: "Freshman" }, { price: 43 }],
    [{ name: "High School" }, { price: 43 }],
    [{ name: "Sophomore" }, { price: 43 }],
    [{ name: "Junior" }, { price: 23 }],
    [{ name: "Senior" }, { price: 13 }],
    [{ name: "Master" }, { price: 3 }],
    [{ name: "Doctoral" }, { price: 53 }],
    [{ name: "3 Days" }, { price: 4 }],
    [{ name: "5 Days" }, { price: 3 }],
    [{ name: "7 Days" }, { price: 10 }],
    [{ name: "14 Days" }, { price: 5 }],
    [{ name: "17 Days" }, { price: 6 }],
    [{ name: "30 Days" }, { price: 4 }],
    [{ name: "40 Days" }, { price: 80 }],
    [{ name: "MLA" }, { price: 43 }],
    [{ name: "APA" }, { price: 43 }],
    [{ name: "Chicago" }, { price: 43 }],
    [{ name: "Harvard" }, { price: 43 }],
    [{ name: "OSCOLA" }, { price: 43 }],
    [{ name: "Art" }, { price: 6 }],
    [{ name: "Music" }, { price: 8 }],
    [{ name: "Paintings" }, { price: 5 }],
    [{ name: "Theatre" }, { price: 5 }],
    [{ name: "Arhitecture" }, { price: 8 }],
    [{ name: "Business" }, { price: 7 }],
    [{ name: "Comm. & Media" }, { price: 5 }],
    [{ name: "Journalism" }, { price: 10 }],
    [{ name: "Advertising" }, { price: 7 }],
    [{ name: "Public Relations" }, { price: 10 }],
    [{ name: "Comm. Strategies" }, { price: 10 }],
    [{ name: "Economics" }, { price: 10 }],
    [{ name: "Logistics" }, { price: 10 }],
    [{ name: "Trade" }, { price: 5 }],
    [{ name: "E-commerce" }, { price: 10 }],
    [{ name: "Social Work" }, { price: 10 }],
    [{ name: "Political Science" }, { price: 5 }],
    [{ name: "Sociology" }, { price: 10 }],
    [{ name: "Finance" }, { price: 8 }],
    [{ name: "Physical Studies" }, { price: 5 }],
    [{ name: "Accounting" }, { price: 8 }],
    [{ name: "Investment" }, { price: 8 }],
    [{ name: "Engineering" }, { price: 6 }],
    [{ name: "English" }, { price: 7 }],
    [{ name: "Healthcare & Medicine" }, { price: 8 }],
    [{ name: "Medicine & Dentistry" }, { price: 10 }],
    [{ name: "Nursing" }, { price: 6 }],
    [{ name: "Phatogenesis of Disease" }, { price: 7 }],
    [{ name: "History" }, { price: 6 }],
    [{ name: "IT & Technology" }, { price: 10 }],
    [{ name: "Law" }, { price: 7 }],
    [{ name: "Literature" }, { price: 6 }],
    [{ name: "Management" }, { price: 8 }],
    [{ name: "Sports" }, { price: 6 }],
    [{ name: "Marketing" }, { price: 6 }],
    [{ name: "Int. Relations" }, { price: 7 }],
    [{ name: "Public Health" }, { price: 6 }],
    [{ name: "Linguistics" }, { price: 8 }],
    [{ name: "Mathematics" }, { price: 10 }],
    [{ name: "Natural Science" }, { price: 7 }],
    [{ name: "Agriculture" }, { price: 5 }],
    [{ name: "Env. Science" }, { price: 5 }],
    [{ name: "Anthropology" }, { price: 5 }],
    [{ name: "Chemistry" }, { price: 5 }],
    [{ name: "Astronomy" }, { price: 10 }],
    [{ name: "Geology" }, { price: 9 }],
    [{ name: "Geography" }, { price: 5 }],
    [{ name: "Biology" }, { price: 9 }],
    [{ name: "Physics" }, { price: 5 }],
    [{ name: "Pedagogy" }, { price: 7 }],
    [{ name: "Philosophy" }, { price: 10 }],
    [{ name: "Psychology" }, { price: 7 }],
    [{ name: "Statistics" }, { price: 10 }],
    [{ name: "Other" }, { price: 8 }],
    [{ name: "Religion & Theology" }, { price: 5 }],
    [{ name: "Tourism" }, { price: 10 }],
    [{ name: "Education" }, { price: 8 }],
    [{ name: "Nutrition" }, { price: 5 }],
    [{ name: "Criminal Justice" }, { price: 6 }],
    [{ name: "Property/Real Estate" }, { price: 8 }],
    [{ name: "3" }, { price: 8 }],
    [{ name: "5" }, { price: 7 }],
    [{ name: "7" }, { price: 5 }],
    [{ name: "13" }, { price: 5 }],
    [{ name: "17" }, { price: 4 }],
    [{ name: "30" }, { price: 4 }],
    [{ name: "40" }, { price: 4 }],
  ]);

  function getPriceByName(name) {
    const item = Array.from(itemsData.keys()).find((key) => key.name === name);
    if (item) {
      // console.log(item);
      // console.log(itemsData.get(item).price);
      return itemsData.get(item).price;
    }
    return null;
  }

  const currency = sessionStorage.getItem("currency");
  const typeService = sessionStorage.getItem("typeService");
  const typePaper = sessionStorage.getItem("typePaper");
  const numOfPages = sessionStorage.getItem("numOfPages");
  const academicLevel = sessionStorage.getItem("academicLevel");
  const urgency = sessionStorage.getItem("urgency");
  const format = sessionStorage.getItem("format");
  const subjectArea = sessionStorage.getItem("subjectArea");
  const topic = sessionStorage.getItem("topic");
  const details = sessionStorage.getItem("details");
  const numOfResources = sessionStorage.getItem("numOfResources");

  const currencyDiv = document.getElementById("list-choices-more-currency");
  const topicDiv = document.getElementById("list-choices-more-title");
  // const topicDivPrice = document.getElementById("list-choices-more-title");
  const typeServiceDiv = document.getElementById(
    "list-choices-more-type-service"
  );
  const typeServiceDivPrice = document.getElementById(
    "list-choices-more-type-service-price"
  );
  const typePaperDiv = document.getElementById("list-choices-more-type-paper");
  const typePaperDivPrice = document.getElementById(
    "list-choices-more-type-paper-price"
  );
  const academicLevelDiv = document.getElementById(
    "list-choices-more-academic-level"
  );
  const academicLevelDivPrice = document.getElementById(
    "list-choices-more-academic-level-price"
  );
  const numOfPagesDiv = document.getElementById(
    "list-choices-more-number-of-pages"
  );
  const numOfPagesDivPrice = document.getElementById(
    "list-choices-more-number-of-pages-price"
  );
  const formatDiv = document.getElementById("list-choices-more-format");
  const formatDivPrice = document.getElementById(
    "list-choices-more-format-price"
  );
  const numOfResoucesDiv = document.getElementById(
    "list-choices-more-number-of-resources"
  );
  const numOfResoucesDivPrice = document.getElementById(
    "list-choices-more-number-of-resources-price"
  );

  const urgencyDiv = document.getElementById("list-choices-more-urgency");
  const urgencyDivPrice = document.getElementById(
    "list-choices-more-urgency-price"
  );
  const subjectAreaDiv = document.getElementById(
    "list-choices-more-subject-area"
  );
  const subjectAreaDivPrice = document.getElementById(
    "list-choices-more-subject-area-price"
  );
  const descriptionDiv = document.getElementById(
    "list-choices-more-description"
  );
  const descriptionDivPrice = document.getElementById(
    "list-choices-more-description-price"
  );

  currencyDiv.innerHTML = currency;
  typeServiceDiv.innerHTML = typeService;
  typePaperDiv.innerHTML = typePaper;
  numOfPagesDiv.innerHTML = numOfPages;
  numOfResoucesDiv.innerHTML = numOfResources;
  academicLevelDiv.innerHTML = academicLevel;
  urgencyDiv.innerHTML = urgency + " days";
  formatDiv.innerHTML = format;
  subjectAreaDiv.innerHTML = subjectArea;
  topicDiv.innerHTML = topic;
  descriptionDiv.innerHTML = details;
  /////price
  typeServiceDivPrice.innerHTML = getPriceByName(typeService) + " " + currency;
  typePaperDivPrice.innerHTML = getPriceByName(typePaper) + " " + currency;
  numOfPagesDivPrice.innerHTML = numOfPages * 2 + " " + currency;
  numOfResoucesDivPrice.innerHTML = numOfResources * 2 + " " + currency;
  academicLevelDivPrice.innerHTML =
    getPriceByName(academicLevel) + " " + currency;
  urgencyDivPrice.innerHTML = getPriceByName(urgency) + " " + currency;
  formatDivPrice.innerHTML = getPriceByName(format) + " " + currency;
  subjectAreaDivPrice.innerHTML = getPriceByName(subjectArea) + " " + currency;

  document.getElementById("submit").innerText =
    "Pay " + sessionStorage.getItem("total") + " " + currency;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const { publishableKey } = await fetch("/config").then((r) => r.json());
  if (!publishableKey) {
    addMessage(
      "No publishable key returned from the server. Please check `.env` and try again"
    );
    alert("Please set your Stripe publishable API key in the .env file");
  }

  const stripe = Stripe(publishableKey);

  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  // When the form is submitted...
  const form = document.getElementById("payment-form");
  let submitted = false;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable double submission of the form
    if (submitted) {
      return;
    }
    submitted = true;
    form.querySelector("button").disabled = true;

    // Make a call to the server to create a new
    // payment intent and store its client_secret.
    const { error: backendError, clientSecret } = await fetch(
      "/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "usd",
          paymentMethodType: "card",
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);

      // reenable the form.
      submitted = false;
      form.querySelector("button").disabled = false;
      return;
    }

    addMessage(`Client secret returned.`);

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");

    // Confirm the card payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: nameInput.value,
            email: emailInput.value,
          },
        },
      });

    if (stripeError) {
      addMessage(stripeError.message);

      // reenable the form.
      submitted = false;
      form.querySelector("button").disabled = false;
      setTimeout(() => {
        removeAddMessage();
      }, 2000);
      return;
    }
    window.location.href = "/customer-home";
    // addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    // setTimeout(() => {
    //   removeAddMessage();
    // }, 2000);
  });

  const addMessage = (message) => {
    const messagesDiv = document.querySelector("#messages");
    messagesDiv.style.display = "block";
    const messageWithLinks = addDashboardLinks(message);
    messagesDiv.innerHTML += `> ${messageWithLinks}<br>`;
    console.log(`Debug: ${message}`);
  };
  const removeAddMessage = () => {
    const messagesDiv = document.querySelector("#messages");
    messagesDiv.style.display = "none";
  };
  const addDashboardLinks = (message) => {
    const piDashboardBase = "https://dashboard.stripe.com/test/payments";
    return message.replace(
      /(pi_(\S*)\b)/g,
      `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
    );
  };
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const { publishableKey } = await fetch("/config").then((r) => r.json());

// const stripe = Stripe(publishableKey);

// const items = [
//   {
//     // currency,
//     typeService,
//     typePaper,
//     numOfPages,
//     numOfResources,
//     academicLevel,
//     urgency,
//     format,
//     subjectArea,
//     topic,
//     details,
//   },
// ];

// let elements;

// initialize();

// async function initialize() {
//   const response = await fetch("/create-payment-intent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items }),
//   });

//   const { clientSecret } = await response.json();

//   elements = stripe.elements();

//   const paymentElementOptions = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#32325D",
//       },
//     },
//     paymentMethod: {
//       card: elements.create("card", {
//         hidePostalCode: true,
//       }),
//       billing_details: {
//         name: "John Doe",
//         email: "john.ibrahimovice@gmail.com",
//         // name: document.querySelector("#name").value,
//         // email: document.querySelector("#email").value,
//       },
//     },
//   };

//   const paymentElement = elements.create("payment", paymentElementOptions);
//   paymentElement.mount("#payment-element");

//   paymentElement.on("payment_intent.succeeded", async (event) => {
//     const paymentIntent = event.paymentIntent;
//     const { paymentIntentId } = paymentIntent;
//     const response = await fetch("/confirm-payment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paymentIntentId }),
//     });
//     const data = await response.json();
//     console.log(data);
//     showMessage("Payment succeeded! Your payment has been confirmed.");
//   });

//   paymentElement.on("payment_intent.payment_failed", (event) => {
//     const paymentIntent = event.paymentIntent;
//     showMessage(
//       `Payment failed. ${paymentIntent.last_payment_error?.message ?? ""}`
//     );
//   });
// }

// async function handleSubmit(e) {
//   e.preventDefault();

//   setLoading(true);

//   const { error } = await stripe.confirmCardPayment(clientSecret, {
//     payment_method: {
//       card: elements.getElement("card"),
//       billing_details: {
//         name: "John Doe",
//         email: "john.ibrahimovice@gmail.com",
//         // name: document.querySelector("#name").value,
//         // email: document.querySelector("#email").value,
//       },
//     },
//   });

//   if (error) {
//     showMessage(error.message);
//   }

//   setLoading(false);
// }

// function showMessage(messageText) {
//   const messageContainer = document.querySelector("#payment-message");

//   messageContainer.classList.remove("hidden");
//   messageContainer.textContent = messageText;

//   setTimeout(function () {
//     messageContainer.classList.add("hidden");
//     messageText.textContent = "";
//   }, 4000);
// }

// function setLoading(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("#submit").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("#submit").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
// }

// document
//   .querySelector("#payment-form")
//   .addEventListener("submit", handleSubmit);

//   // console.log(items);

//   const { clientSecret } = await fetch("/create-payment-intent", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ items }),
//   }).then((r) => r.json());

//   const elements = stripe.elements({ clientSecret });
//   const paymentElement = elements.create("payment");

//   paymentElement.mount("#payment-element");

//   const linkAuthenticationElement = elements.create("linkAuthentication");
//   linkAuthenticationElement.mount("#link-authentication-element");

//   linkAuthenticationElement.on("change", (event) => {
//     emailAddress = event.value.email;
//   });

//   const form = document.getElementById("payment-form");
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: getReturnUrl(paymentIntent),
//         // receipt_email: emailAddress,
//       },
//     });

//     if (error) {
//       // Handle the error
//       const messages = document.getElementById("error-messages");
//       messages.innerHTML = error.message;
//       console.log(error);
//     } else {
//       // Handle the success
//       console.log(paymentIntent);
//     }

//     setLoading(false);
//   });

//   function getReturnUrl(paymentIntent) {
//     if (paymentIntent.status === "succeeded") {
//       // Payment succeeded, redirect to success page
//       return "/success";
//     } else if (paymentIntent.status === "processing") {
//       // Payment is still processing, redirect to processing page
//       return "/processing";
//     } else {
//       // Payment failed, redirect to failure page
//       return "/failure";
//     }
//   }

//   // Show a spinner on payment submission
//   function setLoading(isLoading) {
//     if (isLoading) {
//       // Disable the button and show a spinner
//       document.querySelector("#submit").disabled = true;
//       document.querySelector("#spinner").classList.remove("hidden");
//       document.querySelector("#button-text").classList.add("hidden");
//     } else {
//       document.querySelector("#submit").disabled = false;
//       document.querySelector("#spinner").classList.add("hidden");
//       document.querySelector("#button-text").classList.remove("hidden");
//     }
//   }
// });
