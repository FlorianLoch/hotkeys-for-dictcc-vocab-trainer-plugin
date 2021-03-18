'use strict';

const resultListScript = () => {
  'use strict';

  console.log("=> ResultList module loaded.")

  // Wrap the callback triggered when vocabularies
  // have successfully been added on the serverside
  const add2myvocab_serverside_callback_orig = add2myvocab_serverside_callback;
  add2myvocab_serverside_callback = (txt) => {
    if (txt.startsWith("Err")) {
      console.log(`Seems something went wrong trying to save vocabs to list '${my_vocab_lists["x" + current_trainerlist_id]}'.`);
    } else {
      console.log(`Successfully saved vocabs to list '${my_vocab_lists["x" + current_trainerlist_id]}'. It now contains ${txt} vocabs.`);
    }
    add2myvocab_serverside_callback_orig(txt);
  };

  let currentRowIdx = 0;

  const hotkeyFnsKeyUp = {
    "ArrowUp": moveUp,
    "ArrowDown": moveDown,
    "KeyS": selectVocab,
    "KeyA": addVocab,
    "KeyI": focusSearchBox,
    "KeyP": pronounce,
    "Escape": focusPage
  };

  initialize(hotkeyFnsKeyUp, []);

  function focusSearchBox() {
    focus_searchbox();
  }

  function pronounce() {
    const term_lang=lpp2_lc;
    const id = idArr[currentRowIdx];
    speak_nopop(id, term_lang+"_rec_ip");
  }

  function focusPage() {
    document.activeElement.blur();
  }

  function moveUp() {
    if (currentRowIdx === 1) {
      // If we are already in the top most row jump into the search box
      focusSearchBox();
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
         // value has been set - and if that's the case,
         // a different color gets set (the same in both cases ) ^^.
         // So I dont really understand this differentiation.
         // But perhaps there is a setting somewhere to have alternating row colors.
        setrowcolor(currentRowIdx, "#eeeeee");
      }
      else {
        setrowcolor(currentRowIdx, "#dddddd");
      }
      markedrows["tr" + currentRowIdx] = 0;

      // TODO: combine with this
      hlrow(currentRowIdx, 1);
    }
  }

  function addVocab() {
    // This should not remove the current row from the selection, therefore only trigger a "click"
    // in case it isn't already marked as selected.
    if (currentRowIdx > 0 && markedrows["tr" + currentRowIdx] !== 1) {
      selectVocab();
    }

    add2myvocab();
  }
};