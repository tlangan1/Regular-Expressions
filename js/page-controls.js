"use strict";

// This line of code executes when the page the script is loaded
addEventListener("load", onLoad);

// -------------------------------------------------------------
// The helper functions for the executable code above

// This function gets executed when the web page loading this script finishes loading
function onLoad(event) {
  var currentPageNumber = 1;

  var pages = document.querySelectorAll("div.page");

  var numberPage = createNumberPageFunction();
  pages.forEach(numberPage);

  document.querySelector(".initial-page").click();

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
    currentPageNumber -= 1;
    document.querySelector(".next-page").href = "#p" + (currentPageNumber + 1);
    document.querySelector(".previous-page").href = "#p" + currentPageNumber;

    document.querySelector(".next-page").attributes["more_pages"].value = true;
    if (!document.querySelector("#p" + (currentPageNumber - 1))) {
      document.querySelector(".previous-page").attributes[
        "more_pages"
      ].value = false;
    }
  }

  function onNextPageClick(event) {
    currentPageNumber += 1;
    document.querySelector(".next-page").href = "#p" + currentPageNumber;
    document.querySelector(".previous-page").href =
      "#p" + (currentPageNumber - 1);

    document.querySelector(".previous-page").attributes[
      "more_pages"
    ].value = true;
    if (!document.querySelector("#p" + (currentPageNumber + 1))) {
      document.querySelector(".next-page").attributes[
        "more_pages"
      ].value = false;
    }

    // Tom L. (05-09-2022): Scolling issue: This does not work.
    // window.scrollTo(0, 0);
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
        document.querySelector("button.experiment").innerText = "Do Experiment";
      } else {
        document.querySelector("aside.experiment").attributes["class"].value =
          document
            .querySelector("aside.experiment")
            .attributes["class"].value.replace("hidden", "");
        document.querySelector("button.experiment").innerText =
          "Hide Experiment";
      }
      visible = !visible;
    }

    return toggleExperiment;
  }

  function nonWordBoundaryExample(pattern) {
    function specificNonWordBoundaryExample() {
      document.querySelector("#test-string-1").value = "bad";
      document.querySelector("#test-string-2").value = "advice";
      document.querySelector(".pattern").value = pattern;
      // I need to close over the same function object, toggleExperiment, here and in the addEventListener above
      // however, I need to override the toggle.  Regardless of which state it is in I need is to become visible.
      toggleExperiment(event, true);
    }

    return specificNonWordBoundaryExample;
  }
}
