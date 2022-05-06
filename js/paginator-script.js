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
  }
}
