'use strict';

const vocabTrainerScript = () => {
  'use strict';

  console.log("=> VocabTrainer module loaded.")

  const hotkeyFnsKeyUp = {
    "KeyI": focusAnswerfield,
    "KeyP": pronounce, // SHIFT+P reads out the answer
    "KeyU": undo,
    "Escape": focusPage,
    "Enter": answer(true, 1),
    "Backspace": answer(true, 3),
    "Space": answer(true, 2)
  };

  const hotkeyFnsKeyDown = {
    "Enter": answer(false, 1),
    "Backspace": answer(false, 3),
    "Space": answer(false, 2)
  };

  initialize(hotkeyFnsKeyUp, hotkeyFnsKeyDown);

  function focusAnswerfield() {
    document.getElementById("afid").focus();
  }

  function pronounce(evt) {
    let column = vt.question_colnum;
    let text = vt.current_question;

    if (evt.shiftKey) {
      column = vt.answer_colnum;
      text = vt.current_answer;
    }

    fs_play_audio({
      colnum: column,
      text_term: text,
      id: -1,
      change_buttons: false
    });
  }

  function undo() {
    ft_undo_last_answer()
  }

  function focusPage() {
    document.activeElement.blur();
  }

  function answer(up, buttonNmbr) {
    return (evt) => {
      if (up) {
        ft_bb_mouseup(null, buttonNmbr);

        return;
      }

      ft_bb_mousedown(null, buttonNmbr);

      // Prevent pressing "Space" from scrolling the page and
      // "Backspace" from leaving it etc.. Only necessary with keyDown
      evt.preventDefault();
    };
  }
};