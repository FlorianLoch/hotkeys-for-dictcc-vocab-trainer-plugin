# Hotkeys for Dict.cc's vocab trainer

## Purpose
This is a simple plugin for Chromium/Chrome/Opera and all other browsers supporting the Chrome Extension API ("Chrome APIs") aiming to make usage of the Dict.cc online dictionary even more helpful and faster by providing hotkeys. It follows the concept of Vimium etc. but is custom-fitted towards Dict.cc.

## How to use
The following hotkeys are currently implemented:

### Within result lists
Key | Functionality
---|---
<kbd>ESC</kbd> | Removes focus from search box, enters "hotkey mode"
<kbd>I</kbd> | Insert. Puts focus on the search box. Leaves "hotkey mode"
<kbd>&#8595;</kbd> | Move row/vocab down
<kbd>&#8593;</kbd> | Move row/vocab up
<kbd>S</kbd> | Select. Selects the current row/vocabulary for adding them
<kbd>A</kbd> | Add. Add the currently selected vocabularies to the currently set list of vocabularies
<kbd>P</kbd> | Pronounce. Outputs the voice/TTS recording for the current row

In case one does not want the browser to scroll down/up while using the arrow keys in order to select a specific row please hold down <kbd>SHIFT</kbd>.

### Within the vocab trainer
Key | Functionality
---|---
<kbd>ESC</kbd> | Removes focus from search box, enters "hotkey mode"
<kbd>I</kbd> | Insert. Puts focus on the search box. Leaves "hotkey mode"
<kbd>P</kbd> | Pronounce. Outputs the voice/TTS recording for the currently asked vocab
<kbd>SHIFT</kbd> + <kbd>P</kbd> | Pronounce. Outputs the voice/TTS recording for the current answer
<kbd>U</kbd> | Undo. Undoes the last operation
<kbd>ENTER</kbd> | Simulates pressing the "OK" button in case one knows the vocab
<kbd>SPACE</kbd> | Simulates pressing the "?" in case one is not sure about and wants to peek the answer
<kbd>BACKSPACE</kbd> | Simulates pressing the the "X" button in case one does not know the vocab

## Caveats
It is recommended to deactivate Vimium etc. for Dict.cc in order to avoid issues with overlapping hotkeys - as with basically any website providing its own hotkeys.

## About the code
This is more quick-n-dirty than proper engineering, but as its purpose is to extend an existing page/code base via monkey patching the latter can hardly be expected resp. reached. Though, it should work flawlessly. Therefore, feel free to report any issue found.