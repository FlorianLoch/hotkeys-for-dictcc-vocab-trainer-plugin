'use strict';

// This script gets copied into the page and runs in its context
const initializeFn = function initialize(hotkeyFnsKeyUp, hotkeyFnsKeyDown) {
  console.log("'Hotkeys for dict.cc vocab trainer' script successfully inserted into page!");

  // Remove the global key handler set by dict.cc
  // Most of the functionality provided isn't needed with us,
  // the rest we implement in another fashion.
  // Focussing the search box (on the result page) respectively
  // the type-in-answer-mechanism happens by pressing "I" - as in "input" - first
  // instead of pressing any key.
  document.onkeydown = undefined;

  function addEventHandler(eventName, handlerFns) {
    document.addEventListener(eventName, (e) => {
      // Debounce the key events
      if (e.repeat) {
        return;
      }

      // Variable maintained by the main js source.
      // TODO: also ignore input in case of of any other input field being the currently focussed element
      if (e.code !== "Escape" && inputhasfocus) {
        return;
      }

      const fn = handlerFns[e.code];

      if (fn) {
        fn(e);
      }

      console.log(`Received key event "${eventName}": `, e);
    });
  }

  addEventHandler("keyup", hotkeyFnsKeyUp);
  addEventHandler("keydown", hotkeyFnsKeyDown);
}

function shotgunifyFnSource(fn) {
  return `(${fn.toString()})();`;
}

function copySourceIntoPage(src) {
  const script = document.createElement('script');

  script.textContent = src;
  document.head.appendChild(script);
}


copySourceIntoPage(initializeFn);

// The matching mechanism for content scripts is not sufficient in our case,
// we therefore "manually" decide which script to inject. To make it easier we
// inject the vocab trainer script when the URL looks like it and the result list script
// for every other URL being matched by the content script pattern in manifest.json.
if (window.location.href.match(/.*:\/\/.*my\.dict\.cc\/trainer_v2\/.*/)) {
  copySourceIntoPage(shotgunifyFnSource(vocabTrainerScript));
} else {
  copySourceIntoPage(shotgunifyFnSource(resultListScript));
}