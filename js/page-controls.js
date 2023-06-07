"use strict";

// This line of code executes when the page is loaded
addEventListener("load", onLoad);

// --------------------------------------------------
// The helper functions for the executable code above
// --------------------------------------------------

// This function gets executed when the web page loading this script finishes loading
function onLoad(event) {
  // --------------------------------------------------
  // Initialize these local variables
  // --------------------------------------------------
  var currentPageNumber = 1;
  var aside_width = "275px";

  // --------------------------------------------------
  // Initialize the CSS properties handler
  // --------------------------------------------------
  var cssGlobalProperties = CSSProperties(document.querySelector(":root"));

  // --------------------------------------------------
  // Initialize the aside, the "experiment" panel, hidden
  // --------------------------------------------------
  cssGlobalProperties.setProperty("--aside-width", "0px");

  // --------------------------------------------------
  // Number the pages
  // --------------------------------------------------
  var pages = document.querySelectorAll("div.page");
  var numberPage = createNumberPageFunction();
  pages.forEach(numberPage);

  // --------------------------------------------------
  // Initialize the event handlers
  // --------------------------------------------------
  document
    .querySelector(".previous-page")
    .addEventListener("click", onPreviousPageClick);

  document
    .querySelector(".next-page")
    .addEventListener("click", onNextPageClick);

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

  document
    .querySelector("#resizing-textareas")
    .addEventListener("click", toggleResizing);

  // --------------------------------------------------
  // The helper functions for the executable code above
  // Event handler functions
  // --------------------------------------------------

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

  //   function returnToggleExperiment() {
  //     var visible = false;

  function toggleExperiment(e, show) {
    var visible = !document
      .querySelector("aside.experiment")
      .attributes["class"].value.includes("hidden");
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
      document.querySelector("button.experiment").innerText = "Hide Experiment";
      cssGlobalProperties.setProperty("--aside-width", aside_width);
    }
    //   visible = !visible;
  }

  //     return toggleExperiment;
  //   }

  function toggleResizing() {
    if (cssGlobalProperties.getProperty("--textarea-resizable") == "vertical") {
      cssGlobalProperties.setProperty("--textarea-resizable", "none");
      // Here we are iterating, using forEach, over all the textareas in the experiment panel
      // and calling the function returned from removeStyle which is closed over the style passed in.
      // In this case it is the 'height'.
      document
        .querySelectorAll(".experiment textarea")
        .forEach(removeStyle("height"));

      function removeStyle(style) {
        function removeSpecificStyle(element) {
          element.style.removeProperty(style);
        }

        return removeSpecificStyle;
      }
    } else {
      cssGlobalProperties.setProperty("--textarea-resizable", "vertical");
    }
  }

  function nonWordBoundaryExample(pattern) {
    function specificNonWordBoundaryExample() {
      document.querySelector(".title").innerHTML = "Non-word Boundary Example";
      document.querySelector("#test-multi-line-string").value =
        "The frog got some really bad advice from the badger!";
      document.querySelector("#pattern").value = pattern;
      // Override the visibility toggle behavior by passing true as the second parameter.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return specificNonWordBoundaryExample;
  }

  function dotAllExample(pattern, dotAllFlag) {
    function specificDotAllExample() {
      if (dotAllFlag)
        document.querySelector(".title").innerHTML = "Dot All Flag Set";
      else document.querySelector(".title").innerHTML = "Dot All Flag NOT Set";
      document.querySelector("#test-multi-line-string").value =
        "This line is terminated\nbefore the sentance ends";
      document.querySelector("#pattern").value = pattern;
      if (dotAllFlag == "s")
        document.querySelector("#dot-all-match").checked = true;
      else document.querySelector("#dot-all-match").checked = false;
      // Override the visibility toggle behavior by passing true as the second parameter.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return specificDotAllExample;
  }

  function miscellaneousExample() {
    var miscellaneousExamples = [
      // the null experiment
      {
        title: "",
        string: "",
        pattern: "",
      },
      // identify all capitalized words
      {
        title: "Capitalized words",
        string: "The dog is home. maybe baby. Or is he? He is!",
        pattern: "[A-Z]\\w+",
      },
      // identify all sentances that are properly capitalized
      {
        title: "Capitalized sentances",
        string: "The dog is home. maybe baby. Or is he? He is!",
        pattern: "[A-Z][^.!?]*[.!?]",
      },
      {
        // identify sentances which are not capitalized.
        title: "Un-capitalized sentances",
        string: "the dog is home. Maybe baby. or is he? He is!",
        pattern: "((?<=[.!?]\\s+)[a-z]\\w+|^[a-z]\\w+)[^.!?]*[.!?]",
      },
      {
        title: "Domain name candidates",
        string: "site.com my.site.com frog again.my.site.com",
        pattern: "(\\w+\\.)+\\w+",
      },
      {
        title: "Parsing language patterns",
        string: `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`,
        pattern: "(?<=power of )(?<thing>(a )?\\w+).*?(?<= can )(?<verb>\\w+)",
      },
    ];

    function example(event) {
      var number = event.currentTarget.value;
      document.querySelector(".title").innerHTML =
        miscellaneousExamples[number].title;
      document.querySelector("#test-multi-line-string").value =
        miscellaneousExamples[number].string;
      document.querySelector("#pattern").value =
        miscellaneousExamples[number].pattern;
      // Override the visibility toggle behavior by passing true as the second parameter.
      toggleExperiment(event, true);

      ApplyRegExp();
    }

    return example;
  }

  // Generic helper functions
  // CSS Properties helper
  function CSSProperties(element) {
    function getProperty(propertyName) {
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
}
