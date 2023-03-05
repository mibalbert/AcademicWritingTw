/* pricing.js */

window.addEventListener("DOMContentLoaded", () => {
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
    [{ name: "Sophomore" }, { price: 43 }],
    [{ name: "Junior" }, { price: 43 }],
    [{ name: "Senior" }, { price: 43 }],
    [{ name: "Master" }, { price: 43 }],
    [{ name: "Doctoral" }, { price: 43 }],
    [{ name: "3 Days" }, { price: 43 }],
    [{ name: "5 Days" }, { price: 43 }],
    [{ name: "7 Days" }, { price: 43 }],
    [{ name: "14 Days" }, { price: 43 }],
    [{ name: "17 Days" }, { price: 43 }],
    [{ name: "30 Days" }, { price: 43 }],
    [{ name: "40 Days" }, { price: 43 }],
    [{ name: "MLA" }, { price: 43 }],
    [{ name: "APA" }, { price: 43 }],
    [{ name: "Chicago" }, { price: 43 }],
    [{ name: "Hardvard" }, { price: 43 }],
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

  // console.log(getPriceByName("Geology"));

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
  const table = document.querySelector("#table");

  const currencyMiniBig = document.getElementById("currencyMiniBig");
  const currencyMiniVal = document.getElementById("currencyMiniVal");

  const typeServiceMiniBig = document.getElementById("typeServiceMiniBig");
  const typeServiceMiniVal = document.getElementById("typeServiceMiniVal");
  const typeServiceMiniValPrice = document.getElementById(
    "typeServiceMiniValPrice"
  );
  const typeServiceMiniValPriceCurr = document.getElementById(
    "typeServiceMiniValPriceCurr"
  );

  const typePaperMiniBig = document.getElementById("typePaperMiniBig");
  const typePaperMiniVal = document.getElementById("typePaperMiniVal");
  const typePaperMiniValPrice = document.getElementById(
    "typePaperMiniValPrice"
  );
  const typePaperMiniValPriceCurr = document.getElementById(
    "typePaperMiniValPriceCurr"
  );

  const numOfPagesMiniBig = document.getElementById("numOfPagesMiniBig");
  const numOfPagesMiniVal = document.getElementById("numOfPagesMiniVal");
  const numOfPagesMiniValPrice = document.getElementById(
    "numOfPagesMiniValPrice"
  );
  const numOfPagesMiniValPriceCurr = document.getElementById(
    "numOfPagesMiniValPriceCurr"
  );

  const academicLevelMiniBig = document.getElementById("academicLevelMiniBig");
  const academicLevelMiniVal = document.getElementById("academicLevelMiniVal");
  const academicLevelMiniValPrice = document.getElementById(
    "academicLevelMiniValPrice"
  );
  const academicLevelMiniValPriceCurr = document.getElementById(
    "academicLevelMiniValPriceCurr"
  );

  const urgencyMiniBig = document.getElementById("urgencyMiniBig");
  const urgencyMiniVal = document.getElementById("urgencyMiniVal");
  const urgencyMiniValPrice = document.getElementById("urgencyMiniValPrice");
  const urgencyMiniValPriceCurr = document.getElementById(
    "urgencyMiniValPriceCurr"
  );

  const paperFormatMiniBig = document.getElementById("paperFormatMiniBig");
  const paperFormatMiniVal = document.getElementById("paperFormatMiniVal");
  const paperFormatMiniValPrice = document.getElementById(
    "paperFormatMiniValPrice"
  );
  const paperFormatMiniValPriceCurr = document.getElementById(
    "paperFormatMiniValPriceCurr"
  );

  const subjectAreaMiniBig = document.getElementById("subjectAreaMiniBig");
  const subjectAreaMiniVal = document.getElementById("subjectAreaMiniVal");
  const subjectAreaMiniValPrice = document.getElementById(
    "subjectAreaMiniValPrice"
  );
  const subjectAreaMiniValPriceCurr = document.getElementById(
    "subjectAreaMiniValPriceCurr"
  );

  const numberOfResourcesMiniBig = document.getElementById(
    "numberOfResourcesMiniBig"
  );
  const numberOfResourcesMiniVal = document.getElementById(
    "numberOfResourcesMiniVal"
  );

  const submitBtn = document.getElementById("submit-btn");

  if (submitBtn) {
    submitBtn.addEventListener("click", async function (event) {
      if (event.keyCode === 13 && event.target.nodeName !== "TEXTAREA") {
        event.preventDefault();
      }

      window.location = "/summary";
    });
  }

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

  const total = () => {
    const totalDiv = document.getElementById("total");
    const typeServiceSess = sessionStorage.getItem("typeService");
    const typePaperSess = sessionStorage.getItem("typePaper");
    const numOfPagesSess = sessionStorage.getItem("numOfPages");
    const academicLevelSess = sessionStorage.getItem("academicLevel");
    const urgencySess = sessionStorage.getItem("urgency");
    const formatSess = sessionStorage.getItem("format");
    const subjectAreaSess = sessionStorage.getItem("subjectArea");
    const topicSess = sessionStorage.getItem("topic");
    const detailsSess = sessionStorage.getItem("details");
    const numOfResourcesSess = sessionStorage.getItem("numOfResources");

    const totalArr = [
      typeServiceSess,
      typePaperSess,
      numOfPagesSess,
      academicLevelSess,
      urgencySess,
      formatSess,
      subjectAreaSess,
      topicSess,
      detailsSess,
      numOfResourcesSess,
    ];
    const prices = totalArr.map((el) => {
      return getPriceByName(el);
    });
    const result = prices.reduce((prevVal, currVal) => {
      return prevVal + currVal;
    }, 0);

    totalDiv.innerHTML = result;
  };

  // console.log(total(totalArr));

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
    typeServiceMiniBig.style.display = "block";
    typeServiceMiniVal.innerHTML = tps;
    typeServiceMiniValPrice.innerHTML = getPriceByName(tps);
    typeServiceMiniValPrice.value = getPriceByName(tps);
    typeServiceMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
  });

  typeService.addEventListener("input", function () {
    let tps = this.value;
    sessionStorage.setItem("typeService", tps);
    typeServiceMiniBig.style.display = "block";
    typeServiceMiniVal.innerHTML = tps;
    typeServiceMiniValPrice.innerHTML = getPriceByName(tps);
    typeServiceMiniValPrice.value = getPriceByName(tps);
    typeServiceMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
  });

  typePaper.addEventListener("click", function () {
    let tpP = this.value;
    sessionStorage.setItem("typePaper", tpP);
    typePaperMiniBig.style.display = "block";
    typePaperMiniVal.innerHTML = tpP;
    typePaperMiniValPrice.innerHTML = getPriceByName(tpP);
    typePaperMiniValPrice.value = getPriceByName(tpP);
    typePaperMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");

    total();
  });

  typePaper.addEventListener("input", function () {
    let tpP = this.value;
    sessionStorage.setItem("typePaper", tpP);
    typePaperMiniBig.style.display = "block";
    typePaperMiniVal.innerHTML = tpP;
    typePaperMiniValPrice.innerHTML = getPriceByName(tpP);
    typePaperMiniValPrice.value = getPriceByName(tpP);
    typePaperMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
  });

  academicLevel.addEventListener("click", function () {
    let acdL = this.value;
    sessionStorage.setItem("academicLevel", acdL);
    academicLevelMiniBig.style.display = "block";
    academicLevelMiniVal.innerHTML = acdL;
    academicLevelMiniValPrice.innerHTML = getPriceByName(acdL);
    academicLevelMiniValPrice.value = getPriceByName(acdL);
    academicLevelMiniValPriceCurr.innerHTML =
      sessionStorage.getItem("currency");
    total();
  });
  academicLevel.addEventListener("input", function () {
    let acdL = this.value;
    sessionStorage.setItem("academicLevel", acdL);
    academicLevelMiniBig.style.display = "block";
    academicLevelMiniVal.innerHTML = acdL;
    academicLevelMiniValPrice.innerHTML = getPriceByName(acdL);
    academicLevelMiniValPrice.value = getPriceByName(acdL);
    academicLevelMiniValPriceCurr.innerHTML =
      sessionStorage.getItem("currency");
    total();
  });

  subjectArea.addEventListener("click", function () {
    let sub = this.value;
    // console.log("Selected value: " + sub);
    sessionStorage.setItem("subjectArea", sub);
    subjectAreaMiniBig.style.display = "block";
    subjectAreaMiniVal.innerHTML = sub;
    subjectAreaMiniValPrice.innerHTML = getPriceByName(sub);
    subjectAreaMiniValPrice.value = getPriceByName(sub);
    subjectAreaMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
  });
  subjectArea.addEventListener("input", function () {
    let sub = this.value;
    // console.log("Selected value: " + sub);
    sessionStorage.setItem("subjectArea", sub);
    subjectAreaMiniBig.style.display = "block";
    subjectAreaMiniVal.innerHTML = sub;
    subjectAreaMiniValPrice.innerHTML = getPriceByName(sub);
    subjectAreaMiniValPrice.value = getPriceByName(sub);
    subjectAreaMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
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

      localStorage.setItem("currency", selectedValue);

      currencyMiniBig.style.display = "block";
      currencyMiniVal.innerHTML = selectedValue.toUpperCase();

      typeServiceMiniValPriceCurr.innerHTML = selectedValue.toUpperCase();
      typePaperMiniValPriceCurr.innerHTML = selectedValue.toUpperCase();
      academicLevelMiniValPriceCurr.innerHTML = selectedValue.toUpperCase();
      subjectAreaMiniValPriceCurr.innerHTML = selectedValue.toUpperCase();
      urgencyMiniValPriceCurr.innerHTML = selectedValue.toUpperCase();
      total();
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
      urgencyMiniValPrice.innerHTML = getPriceByName(selectedValue);
      urgencyMiniValPrice.value = getPriceByName(selectedValue);
      urgencyMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
      total();
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
      paperFormatMiniValPrice.innerHTML = getPriceByName(fmt);
      paperFormatMiniValPrice.value = getPriceByName(fmt);
      paperFormatMiniValPriceCurr.innerHTML =
        sessionStorage.getItem("currency");
      total();
    });
  }

  table.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "TD") {
      const radio = target.parentNode.firstChild.firstChild;
      if (radio) {
        radio.checked = true;
        total();
      }
    }
  });

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
    numOfPagesMiniValPrice.innerHTML = a * 2;
    numOfPagesMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
    total();
  });
  minus.addEventListener("click", () => {
    if (a > 1) {
      a--;
      // a = a < 10 ? '0' + a : a;
      numOfPages.value = a;
      sessionStorage.setItem("numOfPages", numOfPages.value);
      numOfPagesMiniBig.style.display = "block";
      numOfPagesMiniVal.innerHTML = a;
      let newPrice = Math.max(numOfPagesMiniValPrice.innerHTML - 2, 3);
      numOfPagesMiniValPrice.innerHTML = newPrice;
      numOfPagesMiniValPriceCurr.innerHTML = sessionStorage.getItem("currency");
      total();
    }
  });

  plusR.addEventListener("click", () => {
    a++;
    // a = a < 10 ? '0' +  a : a;
    numOfResouces.value = a;
    sessionStorage.setItem("numOfResources", numOfResouces.value);
    numberOfResourcesMiniBig.style.display = "block";
    numberOfResourcesMiniVal.innerHTML = a;
    total();
  });
  minusR.addEventListener("click", () => {
    if (a > 1) {
      a--;
      // a = a < 10 ? '0' + a : a;
      numOfResouces.value = a;
      sessionStorage.setItem("numOfResources", numOfResouces.value);
      numberOfResourcesMiniBig.style.display = "block";
      numberOfResourcesMiniVal.innerHTML = a;
      total();
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
    total();
  });

  numOfResouces.addEventListener("input", function (event) {
    event.preventDefault();
    a = numOfResouces.value;
    numberOfResourcesMiniBig.style.display = "block";
    numberOfResourcesMiniVal.innerHTML = a;
    total();
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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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
});
