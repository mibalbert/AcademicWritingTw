/* pricing.js */

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const typeOfServiceData = new Map([
    [{ name: "Academic Paper Writing" }, { price: 10 }],
    [{ name: "Disertation Services"}, { price: 11}],
    [{ name: "Writing Incl. Calculations"}, { price: 9.2}],
    [{ name: "Admission Services"},{ price: 10}],
    [{ name: "Math/Physic/Economic/Statistic Problems"}, { price: 40}],
    ["Multiple Choice Questions", { 12}],
    ["Editing", 12],
    ["Proofreading", 12],
    ["Rewriting", 44],
    ["Copywriting", 9],
    ["Resume/CV services", 10],
    ["Rewriting", 12],
  ]);

  // console.log(typeOfServiceData)

  const typeOfPaperData = new Map([
    [1, "Essay", w12],
    [2, "Coursework", 4],
    [3, "Research Paper", 4],
    [4, "Term-paper", 6],
    [5, "Case Study", 54],
    [6, "Capstone Project", 12],
    [7, "Assignment", 43],
  ]);

  for (const det of typeOfServiceData) {
    console.log(det);
  }

  const radioGroup = document.getElementsByName("currency");
  const typeService = document.getElementById("typeService");
  const typePaper = document.getElementById("typePaper");
  const numOfPages = document.getElementById("numOfPages");
  const academicLevel = document.getElementById("academicLevel");
  const radioUrgency = document.getElementsByName("urgency");
  const radioFormat = document.getElementsByName("paperFormat");
  const subjectArea = document.getElementById("subjectArea");
  const numOfResouces = document.getElementById("numOfResouces");
  const topic = document.getElementById("topic");
  const details = document.getElementById("paperDetails");
  const textarea = document.querySelector("textarea");

  const currencyMiniBig = document.getElementById("currencyMiniBig");
  const currencyMiniVal = document.getElementById("currencyMiniVal");

  const typeServiceMiniBig = document.getElementById("typeServiceMiniBig");
  const typeServiceMiniVal = document.getElementById("typeServiceMiniVal");

  const typePaperMiniBig = document.getElementById("typePaperMiniBig");
  const typePaperMiniVal = document.getElementById("typePaperMiniVal");

  const numOfPagesMiniBig = document.getElementById("numOfPagesMiniBig");
  const numOfPagesMiniVal = document.getElementById("numOfPagesMiniVal");

  const academicLevelMiniBig = document.getElementById("academicLevelMiniBig");
  const academicLevelMiniVal = document.getElementById("academicLevelMiniVal");

  const urgencyMiniBig = document.getElementById("urgencyMiniBig");
  const urgencyMiniVal = document.getElementById("urgencyMiniVal");

  const paperFormatMiniBig = document.getElementById("paperFormatMiniBig");
  const paperFormatMiniVal = document.getElementById("paperFormatMiniVal");

  const subjectAreaMiniBig = document.getElementById("subjectAreaMiniBig");
  const subjectAreaMiniVal = document.getElementById("subjectAreaMiniVal");

  const numberOfResourcesMiniBig = document.getElementById(
    "numberOfResourcesMiniBig"
  );
  const numberOfResourcesMiniVal = document.getElementById(
    "numberOfResourcesMiniVal"
  );

  const myDiv = document.getElementById("userMainCartForm");
  const inputs = myDiv.querySelectorAll("input, select, text, textarea");
  const formData = {};

  inputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  // console.log(formData);

  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", async function (event) {
    if (event.keyCode === 13 && event.target.nodeName !== "TEXTAREA") {
      event.preventDefault();
    }

    window.location = "/summary";
  });

  let selectedValue;
  for (const radio of radioGroup) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  let selectedValue2;
  for (const radio of radioUrgency) {
    if (radio.checked) {
      selectedValue2 = radio.value;
      break;
    }
  }
  let selectedValue3;
  for (const radio of radioFormat) {
    if (radio.checked) {
      selectedValue3 = radio.value;
      break;
    }
  }

  sessionStorage.setItem("currency", selectedValue);
  sessionStorage.setItem("typeService", typeService.value);
  sessionStorage.setItem("typePaper", typePaper.value);
  sessionStorage.setItem("numOfPages", numOfPages.value);
  sessionStorage.setItem("academicLevel", academicLevel.value);
  sessionStorage.setItem("urgency", selectedValue2);
  sessionStorage.setItem("format", selectedValue3);
  sessionStorage.setItem("subjectArea", subjectArea.value);
  sessionStorage.setItem("topic", topic.value);
  sessionStorage.setItem("details", details.value);
  sessionStorage.setItem("numOfResources", numOfResouces.value);

  typeService.addEventListener("click", function () {
    let tps = this.value;
    sessionStorage.setItem("typeService", tps);

    // console.log(tps);
    typeServiceMiniBig.style.display = "block";
    typeServiceMiniVal.innerHTML = tps;
  });

  typePaper.addEventListener("click", function () {
    let tpP = this.value;

    sessionStorage.setItem("typePaper", tpP);
    typePaperMiniBig.style.display = "block";
    typePaperMiniVal.innerHTML = tpP;
  });

  academicLevel.addEventListener("click", function () {
    let acdL = this.value;
    sessionStorage.setItem("academicLevel", acdL);
    academicLevelMiniBig.style.display = "block";
    academicLevelMiniVal.innerHTML = acdL;
  });

  subjectArea.addEventListener("click", function () {
    let sub = this.value;
    // console.log("Selected value: " + sub);
    sessionStorage.setItem("subjectArea", sub);
    subjectAreaMiniBig.style.display = "block";
    subjectAreaMiniVal.innerHTML = sub;
  });

  for (let i = 0; i < radioGroup.length; i++) {
    radioGroup[i].addEventListener("change", function () {
      let selectedValue = undefined;

      for (let i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
          selectedValue = radioGroup[i].value;
          break;
        }
      }
      sessionStorage.setItem("currency", selectedValue);
      currencyMiniBig.style.display = "block";
      currencyMiniVal.innerHTML = selectedValue.toUpperCase();
    });
  }

  for (let i = 0; i < radioUrgency.length; i++) {
    radioUrgency[i].addEventListener("change", function () {
      let selectedValue = undefined;

      for (let i = 0; i < radioUrgency.length; i++) {
        if (radioUrgency[i].checked) {
          selectedValue = radioUrgency[i].value;
          break;
        }
      }
      sessionStorage.setItem("urgency", selectedValue);
      urgencyMiniBig.style.display = "block";
      urgencyMiniVal.innerHTML = selectedValue + " days";
    });
  }

  for (let i = 0; i < radioFormat.length; i++) {
    radioFormat[i].addEventListener("change", function () {
      let fmt = undefined;

      for (let i = 0; i < radioFormat.length; i++) {
        if (radioFormat[i].checked) {
          fmt = radioFormat[i].value;
          break;
        }
      }
      sessionStorage.setItem("format", fmt);
      paperFormatMiniBig.style.display = "block";
      paperFormatMiniVal.innerHTML = fmt;
    });
  }

  topic.addEventListener("input", function () {
    // console.log(this.value);
    sessionStorage.setItem("topic", this.value);
  });

  details.addEventListener("input", function () {
    // console.log(this.value);
    sessionStorage.setItem("details", this.value);
  });

  const plus = document.querySelector(".plus"),
    minus = document.querySelector(".minus");
  const plusR = document.querySelector(".plus-r"),
    minusR = document.querySelector(".minus-r");

  let a = 1;

  plus.addEventListener("click", () => {
    a++;
    // a = a < 10 ? '0' +  a : a;
    numOfPages.value = a;
    sessionStorage.setItem("numOfPages", numOfPages.value);
    numOfPagesMiniBig.style.display = "block";
    numOfPagesMiniVal.innerHTML = numOfPages.value;
  });
  minus.addEventListener("click", () => {
    if (a > 1) {
      a--;
      // a = a < 10 ? '0' + a : a;
      numOfPages.value = a;
      sessionStorage.setItem("numOfPages", numOfPages.value);
      numOfPagesMiniBig.style.display = "block";
      numOfPagesMiniVal.innerHTML = a;
    }
  });
  plusR.addEventListener("click", () => {
    a++;
    // a = a < 10 ? '0' +  a : a;
    numOfResouces.value = a;
    sessionStorage.setItem("numOfResources", numOfResouces.value);
    numberOfResourcesMiniBig.style.display = "block";
    numberOfResourcesMiniVal.innerHTML = a;
  });
  minusR.addEventListener("click", () => {
    if (a > 1) {
      a--;
      // a = a < 10 ? '0' + a : a;
      numOfResouces.value = a;
      sessionStorage.setItem("numOfResources", numOfResouces.value);
      numberOfResourcesMiniBig.style.display = "block";
      numberOfResourcesMiniVal.innerHTML = a;
    }
  });

  // numOfPages.addEventListener('change', function (event) {
  //   if (event.key === 'Enter') {
  //   event.preventDefault();
  //   a = numOfPages.value;

  //   numOfPagesMiniBig.style.display = 'block'
  //   numOfPagesMiniVal.innerHTML = a
  //   }
  // });

  numOfPages.addEventListener("input", function (event) {
    event.preventDefault();
    a = numOfPages.value;
    numOfPagesMiniBig.style.display = "block";
    numOfPagesMiniVal.innerHTML = this.value;
  });

  numOfResouces.addEventListener("input", function (event) {
    event.preventDefault();
    a = numOfResouces.value;
    numberOfResourcesMiniBig.style.display = "block";
    numberOfResourcesMiniVal.innerHTML = a;
  });

  textarea.addEventListener("keydown", autosize);

  function autosize() {
    var el = this;
    setTimeout(function () {
      el.style.cssText = "height:auto; padding:0.25rem";
      var maxHeight = 250; // max height in pixels
      if (el.scrollHeight > maxHeight) {
        el.style.cssText = "height:" + maxHeight + "px";
      } else {
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }
    }, 0);
  }

  /**
   * Define a function to navigate betweens form steps.
   * It accepts one parameter. That is - step number.
   */
  const navigateToFormStep = (stepNumber) => {
    localStorage.setItem("currentStep", stepNumber);
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
      formStepElement.classList.add("d-none");
    });
    /**
     * Mark all form steps as unfinished.
     */
    document
      .querySelectorAll(".form-stepper-list")
      .forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove(
          "form-stepper-active",
          "form-stepper-completed"
        );
      });
    /**
     * Show the current form step (as passed to the function).
     */
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector(
      'li[step="' + stepNumber + '"]'
    );
    /**
     * Mark the current form step as active.
     */
    formStepCircle.classList.remove(
      "form-stepper-unfinished",
      "form-stepper-completed"
    );
    formStepCircle.classList.add("form-stepper-active");
    /**
     * Loop through each form step circles.
     * This loop will continue up to the current step number.
     * Example: If the current step is 3,
     * then the loop will perform operations for step 1 and 2.
     */
    for (let index = 0; index < stepNumber; index++) {
      /**
       * Select the form step circle (progress bar).
       */
      const formStepCircle = document.querySelector('li[step="' + index + '"]');
      /**
       * Check if the element exist. If yes, then proceed.
       */
      if (formStepCircle) {
        /**
         * Mark the form step as completed.
         */
        formStepCircle.classList.remove(
          "form-stepper-unfinished",
          "form-stepper-active"
        );
        formStepCircle.classList.add("form-stepper-completed");
      }
    }
  };

  // // Retrieve the current step from the local storage on page load
  // const currentStep = localStorage.getItem('currentStep');

  // // If there's a current step stored, navigate to it on page load
  // if (currentStep) {
  //   navigateToFormStep(currentStep);
  // } else {
  //   // If there's no current step stored, navigate to the last step
  //   const lastStep = document.querySelectorAll('.form-step').length - 1;
  //   navigateToFormStep(lastStep);
  // }

  document
    .querySelectorAll(".btn-navigate-form-step")
    .forEach((formNavigationBtn) => {
      formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(
          formNavigationBtn.getAttribute("step_number")
        );
        navigateToFormStep(stepNumber);
      });
    });
  document
    .querySelectorAll(".btn-navigate-form-step2")
    .forEach((formNavigationBtn) => {
      formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(
          formNavigationBtn.getAttribute("step_number")
        );
        navigateToFormStep(stepNumber);
      });
    });

  const table = document.querySelector("#table");
  table.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "TD") {
      const radio = target.parentNode.firstChild.firstChild;
      if (radio) {
        radio.checked = true;
      }
    }
  });
});
