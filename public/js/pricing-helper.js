// Check if an element with the ID "example" exists on the page
export function totalAmount() {
  const itemsVal = document.getElementsByName("bigItemVal");
  // document.getElementsByName("itemVal").style.display === "block";

  if (itemsVal) {
    // Get the innerHTML of the element with ID "example"
    // var exampleInnerHtml = document.getElementById("").innerHTML;

    console.log(itemsVal.style);

    const plm = [itemsVal].map((el) => {
      return el;
    });

    console.log(plm[0].style);

    // // Do something with the innerHTML, for example, log it to the console
    // console.log("The innerHTML of #example is " + exampleInnerHtml);

    // // Set up a MutationObserver to detect changes to the element with ID "example"
    // var observer = new MutationObserver(function (mutationsList) {
    //   for (var mutation of mutationsList) {
    //     if (mutation.type === "childList") {
    //       // Get the innerHTML of the element after it changes
    //       var newExampleInnerHtml =
    //         document.getElementById("example").innerHTML;
    //       // Do something with the new innerHTML, for example, log it to the console
    //       console.log(
    //         "The new innerHTML of #example is " + newExampleInnerHtml
    //       );
    //     }
    //   }
    // });

    // // Start observing changes to the element with ID "example"
    // observer.observe(document.getElementById("example"), { childList: true });
  }
}
