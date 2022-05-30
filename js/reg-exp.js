function ApplyRegExp() {
  var exp = document.querySelector("#pattern").value;

  // When using replaceAll with a regex the global modifier must be specified...it is not optional.
  var modifiers = "g";
  // Hence, I removed the "#global-match" checkbox.
  // if (document.querySelector("#global-match").checked) {
  //   modifiers += "g";
  // }
  if (document.querySelector("#case-insensitive-match").checked) {
    modifiers += "i";
  }
  if (document.querySelector("#dot-all-match").checked) {
    modifiers += "s";
  }
  if (document.querySelector("#test-multi-line-string")) {
    modifiers += "m";
  }

  document.querySelector(".error").innerHTML = "";
  try {
    exp = RegExp(exp, modifiers);
  } catch (error) {
    document.querySelector(".error").innerHTML = error;
    return;
  }

  if (document.querySelector("#test-multi-line-string")) {
    document.querySelector("#test-multi-line-result").innerHTML = document
      .querySelector("#test-multi-line-string")
      .value.replaceAll(exp, replacerFunction);
  }

  /*--------------------------------------------------*/
  /* functions to support the executable code above   */
  /*--------------------------------------------------*/
  // Wrap each item in the target string with spans
  function replacerFunction(item) {
    return "<span>" + item + "</span>";
  }
}
