/** customer-orders.js */

const descriptions = document.querySelectorAll("#description");

descriptions.forEach((description) => {
  const words = description.textContent.split(" ");
  if (words.length > 20) {
    const shortenedText = words.slice(0, 20).join(" ") + " ...";
    description.textContent = shortenedText;
  }
});
