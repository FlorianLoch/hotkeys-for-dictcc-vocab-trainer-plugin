'use strict';

const script = () => {
  'use strict';

  console.log("'Hotkeys for dict.cc vocab trainer' script successfully inserted into page!");

  let currentRowIdx = 0;

  const hotkeyFns = {
    "ArrowUp": moveUp,
    "ArrowDown": moveDown,
    "ArrowLeft": selectVocab,
    "ArrowRight": addVocab,
    "Escape": focusPage
  }

  document.addEventListener("keyup", (e) => {
    const fn = hotkeyFns[e.code];

    if (fn) {
      fn(e);
    }

    console.log("Received key pressed event: ", e.code);
  });

  // Wrap the callback triggered when vocabularies
  // have successfully been added on the serverside
  const add2myvocab_serverside_callback_orig = add2myvocab_serverside_callback;
  add2myvocab_serverside_callback = (txt) => {
    console.log(`Successfully saved vocabs to list '${my_vocab_lists["x" + current_trainerlist_id]}'. It now contains ${txt} vocabs.`);
    add2myvocab_serverside_callback_orig(txt);
  };

  function focusPage() {
    document.activeElement.blur();
  }

  function moveUp() {
    if (currentRowIdx === 1) {
      return;
    }

    hlrow(currentRowIdx, 2);

    currentRowIdx--;

    hlrow(currentRowIdx, 1);
  }

  function moveDown() {
    if (currentRowIdx === nres) {
      return;
    }

    hlrow(currentRowIdx, 2);

    currentRowIdx++;

    hlrow(currentRowIdx, 1);
  }

  function selectVocab() {
    // Adapted from original page source, does the same but does not
    // open the menu (hlrow())
    if (markedrows["tr" + currentRowIdx ] != 1) {
      setrowcolor(currentRowIdx, "#ffcc99");
      markedrows["tr" + currentRowIdx] = 1;
    }
    else {
      if (currentRowIdx % 2) {
         // There is actually code in the page checking whether this
         // value has been set - and if, a different color gets set (the same color) ^^.
         // So this differentation is pointless - at least to me.
         // But perhaps there is a setting somewhere to have alternating row colors.
        setrowcolor(currentRowIdx, "#eeeeee");
      }
      else {
        setrowcolor(currentRowIdx, "#dddddd");
      }
      markedrows["tr" + currentRowIdx] = 0;

      // combine with this
      hlrow(currentRowIdx, 1);
    }
  }

  function addVocab() {
    add2myvocab_serverside();
  }
};

runFnInPage(script);

function runFnInPage(fn) {
  const script = document.createElement('script');
  const source = `(${fn.toString()})()`;

  script.textContent = source;
  document.head.appendChild(script);
}