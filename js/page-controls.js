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
    .querySelector("button.examples-page")
    .addEventListener("click", gotoExamples);

  document
    .querySelector("#non-word-boundary-example-1")
    .addEventListener("click", nonWordBoundaryExample("\\Bad"));

  document
    .querySelector("#non-word-boundary-example-2")
    .addEventListener("click", nonWordBoundaryExample("ad\\B"));

  document
    .querySelector("#dot-all-example-1")
    .addEventListener("click", dotAllExample(".", ""));

  document
    .querySelector("#dot-all-example-2")
    .addEventListener("click", dotAllExample(".", "s"));

  document
    .querySelector("#miscellaneous-regex")
    .addEventListener("change", miscellaneousExample());

  document
    .querySelector("#case-insensitive-match")
    .addEventListener("click", ApplyRegExp);

  document
    .querySelector("#dot-all-match")
    .addEventListener("click", ApplyRegExp);

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

    document.querySelector(".previous-page").attributes[
      "more_pages"
    ].value = true;
    if (!document.querySelector("#p" + (currentPageNumber + 1))) {
      document.querySelector(".next-page").attributes[
        "more_pages"
      ].value = false;
    }
  }

  function gotoExamples(event) {
    document
      .querySelector("#p" + currentPageNumber)
      .classList.remove("visible");

    currentPageNumber = document.querySelectorAll(".page").length;
    "#p" + (currentPageNumber - 1);
    document.querySelector("#p" + currentPageNumber).classList.add("visible");

    //   disabled selected hidden
    var option1 = document.querySelector(
      "#miscellaneous-regex > option:first-child"
    );
    option1.disabled = true;
    option1.selected = true;
    option1.hidden = true;

    document.querySelector(".previous-page").attributes[
      "more_pages"
    ].value = true;
    document.querySelector(".next-page").attributes["more_pages"].value = false;
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
      clearTestString();
      document.querySelector("#test-multi-line-string").value =
        "The frog got some really bad advice from the badger!";
      document.querySelector("#pattern").value = pattern;
      // I need to close over the same function object, toggleExperiment, here and in the addEventListener above
      // however, I need to override the toggle.  Regardless of which state it is in I need is to become visible.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return specificNonWordBoundaryExample;
  }

  function dotAllExample(pattern, dotAllFlag) {
    function specificDotAllExample() {
      clearTestString();
      document.querySelector("#test-multi-line-string").value =
        "This line is terminated\nbefore the sentance ends";
      document.querySelector("#pattern").value = pattern;
      if (dotAllFlag == "s")
        document.querySelector("#dot-all-match").checked = true;
      else document.querySelector("#dot-all-match").checked = false;
      // I need to close over the same function object, toggleExperiment, here and in the addEventListener above
      // however, I need to override the toggle.  Regardless of which state it is in I need is to become visible.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return specificDotAllExample;
  }

  function miscellaneousExample() {
    var miscellaneousExamples = [
      // the null experiment
      {
        string: "",
        pattern: "",
      },
      // identify all capitalized words
      {
        string: "The dog is home. maybe baby. Or is he? He is!",
        pattern: "[A-Z]\\w+",
      },
      // identify all sentances that are properly capitalized
      {
        string: "The dog is home. maybe baby. Or is he? He is!",
        pattern: "[A-Z][^.!?]*[.!?]",
      },
      {
        // identify sentances which are not capitalized.
        string: "the dog is home. Maybe baby. or is he? He is!",
        pattern: "((?<=[.!?]\\s+)[a-z]\\w+|^[a-z]\\w+)[^.!?]*[.!?]",
      },
      {
        string: "site.com my.site.com frog again.my.site.com",
        pattern: "(\\w+\\.)+\\w+",
      },
    ];

    function example(event) {
      var number = event.currentTarget.value;
      clearTestString();
      document.querySelector("#test-multi-line-string").value =
        miscellaneousExamples[number].string;
      document.querySelector("#pattern").value =
        miscellaneousExamples[number].pattern;
      // I need to close over the same function object, toggleExperiment, here and in the addEventListener above
      // however, I need to override the toggle.  Regardless of which state it is in I need is to become visible.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return example;
  }

  function clearTestString() {
    document.querySelector("#test-multi-line-string").value = "";
  }
}
