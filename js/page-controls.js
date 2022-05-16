"use strict";

// This line of code executes when the page the script is loaded
addEventListener("load", onLoad);

// -------------------------------------------------------------
// The helper functions for the executable code above

// This function gets executed when the web page loading this script finishes loading
function onLoad(event) {
  var currentPageNumber = 1;
  var aside_width = "275px";

  var cssGlobalProperties = CSSProperties(document.querySelector(":root"));

  cssGlobalProperties.setProperty("--aside-width", "0px");

  var pages = document.querySelectorAll("div.page");

  var numberPage = createNumberPageFunction();
  pages.forEach(numberPage);

  document
    .querySelector(".previous-page")
    .addEventListener("click", onPreviousPageClick);

  document
    .querySelector(".next-page")
    .addEventListener("click", onNextPageClick);

  var toggleExperiment = returnToggleExperiment();

  // I need to close over the same function object, toggleExperiment, here and in nonWordBoundaryExample below
  document
    .querySelector("button.experiment")
    .addEventListener("click", toggleExperiment);

  document
    .querySelector("#non-word-boundary-example-1")
    .addEventListener("click", nonWordBoundaryExample("\\Bad"));

  document
    .querySelector("#non-word-boundary-example-2")
    .addEventListener("click", nonWordBoundaryExample("ad\\B"));

  // --------------------------------------------------
  // The helper functions for the executable code above

  function createNumberPageFunction(page) {
    var pageNumber = 0;

    return function (page) {
      page.querySelector("span.page-number").innerText = ++pageNumber;
      page.setAttribute("id", "p" + pageNumber);
    };
  }

  function onPreviousPageClick(event) {
    document
      .querySelector("#p" + currentPageNumber)
      .classList.remove("visible");
    currentPageNumber -= 1;
    document.querySelector("#p" + currentPageNumber).classList.add("visible");

    document.querySelector(".next-page").attributes["more_pages"].value = true;
    if (!document.querySelector("#p" + (currentPageNumber - 1))) {
      document.querySelector(".previous-page").attributes[
        "more_pages"
      ].value = false;
    }
  }

  function onNextPageClick(event) {
    document
      .querySelector("#p" + currentPageNumber)
      .classList.remove("visible");
    currentPageNumber += 1;
    document.querySelector("#p" + currentPageNumber).classList.add("visible");
    "#p" + (currentPageNumber - 1);

    document.querySelector(".previous-page").attributes[
      "more_pages"
    ].value = true;
    if (!document.querySelector("#p" + (currentPageNumber + 1))) {
      document.querySelector(".next-page").attributes[
        "more_pages"
      ].value = false;
    }
  }

  function returnToggleExperiment() {
    var visible = false;

    function toggleExperiment(e, show) {
      if (show) {
        visible = false;
      }
      if (visible) {
        document.querySelector("aside.experiment").attributes["class"].value +=
          " hidden";
        document.querySelector("button.experiment").innerText =
          "Regex Experiment";
        cssGlobalProperties.setProperty("--aside-width", "0px");
      } else {
        document.querySelector("aside.experiment").attributes["class"].value =
          document
            .querySelector("aside.experiment")
            .attributes["class"].value.replace("hidden", "");
        document.querySelector("button.experiment").innerText =
          "Hide Experiment";
        cssGlobalProperties.setProperty("--aside-width", aside_width);
      }
      visible = !visible;
    }

    return toggleExperiment;
  }

  function CSSProperties(element) {
    function getProperty(propertyName) {
      //   var rs = getComputedStyle(element);
      return getComputedStyle(element).getPropertyValue(propertyName);
    }
    function setProperty(propertyName, propertyValue) {
      element.style.setProperty(propertyName, propertyValue);
    }

    return {
      getProperty: getProperty,
      setProperty: setProperty,
    };
  }

  function nonWordBoundaryExample(pattern) {
    function specificNonWordBoundaryExample() {
      document.querySelector("#test-string-1").value = "bad";
      document.querySelector("#test-string-2").value = "advice";
      document.querySelector(".pattern").value = pattern;
      // I need to close over the same function object, toggleExperiment, here and in the addEventListener above
      // however, I need to override the toggle.  Regardless of which state it is in I need is to become visible.
      toggleExperiment(event, true);

      ApplyRegExp(document.querySelector(".pattern").value);
    }

    return specificNonWordBoundaryExample;
  }
}
