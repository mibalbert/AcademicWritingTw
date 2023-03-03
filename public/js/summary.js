
window.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded')

  
  const currency = sessionStorage.getItem('currency');
  const typeService = sessionStorage.getItem('typeService');
  const typePaper = sessionStorage.getItem('typePaper');
  const numOfPages = sessionStorage.getItem('numOfPages');
  const academicLevel =sessionStorage.getItem('academicLevel');
  const urgency =  sessionStorage.getItem('urgency');
  const format = sessionStorage.getItem('format');
  const subjectArea = sessionStorage.getItem('subjectArea');
  const topic = sessionStorage.getItem('topic');
  const details = sessionStorage.getItem('details');
  const numOfResources = sessionStorage.getItem('numOfResources');


  
  const currencyDiv = document.getElementById('list-choices-more-currency');
  const topicDiv = document.getElementById('list-choices-more-title');
  const typeServiceDiv = document.getElementById('list-choices-more-type-service');
  const typePaperDiv = document.getElementById('list-choices-more-type-paper');
  const academicLevelDiv = document.getElementById('list-choices-more-academic-level');
  const numOfPagesDiv = document.getElementById('list-choices-more-number-of-pages');
  const formatDiv = document.getElementById('list-choices-more-format');
  const numOfResoucesDiv = document.getElementById('list-choices-more-number-of-resources');
  const urgencyDiv = document.getElementById('list-choices-more-urgency');
  const subjectAreaDiv = document.getElementById('list-choices-more-subject-area');
  const descriptionDiv = document.getElementById('list-choices-more-description');

 
  currencyDiv.innerHTML = currency
  typeServiceDiv.innerHTML = typeService
  typePaperDiv.innerHTML = typePaper
  numOfPagesDiv.innerHTML = numOfPages
  academicLevelDiv.innerHTML = academicLevel
  urgencyDiv.innerHTML = urgency
  formatDiv.innerHTML = format
  subjectAreaDiv.innerHTML = subjectArea
  topicDiv.innerHTML = topic
  descriptionDiv.innerHTML = details



  const {publishableKey } = await fetch('/config').then( r => r.json() )

  const stripe = Stripe(publishableKey)

  const items = [{ currency: 'usd'}] 




  const {clientSecret} = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  }).then( r => r.json() )


  const elements = stripe.elements({ clientSecret })
  const paymentElement = elements.create('payment')

  paymentElement.mount('#payment-element')

  const form = document.getElementById('payment-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const {error} = stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href.split('?')[0] + 'complete'
      }
    })
    if(error) {
      const messages = document.getElementById('error-messages')
      messages.innerHTML = error.message
    }
  })












  const summaryBody = document.querySelector('summary')

  const allItems = Object.entries(sessionStorage);
  
  // Loop through the items and log each key-value pair
  const ul = document.createElement('ul');
  

  allItems.forEach(item => {
    const [key, value] = item;
    const li = document.createElement('li');
    li.textContent = `${key}: ${value}`;
    ul.appendChild(li);
  });
  
  // Add the ul element to the document
  // summaryBody.appendChild(ul);







})
