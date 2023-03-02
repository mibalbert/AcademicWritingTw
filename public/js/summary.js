
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

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
  summaryBody.appendChild(ul);

})
