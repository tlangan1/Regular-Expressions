function ApplyRegExp(exp) {
  var modifiers = "";
  if (document.querySelector("#global-match").checked) {
    modifiers += "g";
  }
  if (document.querySelector("#case-insensitive-match").checked) {
    modifiers += "i";
  }
  if (document.querySelector("#test-multi-line-string")) {
    modifiers += "m";
  }

  exp = RegExp(exp, modifiers);

  if (document.querySelector("#test-string-1")) {
    document.querySelector("#test-result-1").innerText = document
      .querySelector("#test-string-1")
      .value.match(exp);
  }
  if (document.querySelector("#test-string-2")) {
    document.querySelector("#test-result-2").innerText = document
      .querySelector("#test-string-2")
      .value.match(exp);
  }
  if (document.querySelector("#test-multi-line-string")) {
    document.querySelector("#test-multi-line-result").innerText = document
      .querySelector("#test-multi-line-string")
      .value.match(exp);
  }
}
