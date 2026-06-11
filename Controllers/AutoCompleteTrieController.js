import promptSync from "prompt-sync";

import HandlePrintMessages from "../Views/AutoCompleteTrie/HandlePrintMessages.js";
import AutoCompleteTrie from "../Models/AutoCompleteTrie.js";
const prompt = promptSync();

let input, command, word;
const autoCompleteTrie = new AutoCompleteTrie();
HandlePrintMessages.printWelcomeMessage();
do {
  input = prompt("> ");
  let [arg1, arg2] = input.split(" ").map((item) => item.trim());
  command = arg1;
  word = arg2;

  switch (command) {
    case "add":
      if (autoCompleteTrie.findWord(word))
        HandlePrintMessages.printFoundWordMessage(word, false);
      else {
        autoCompleteTrie.addWord(word);
        HandlePrintMessages.printAddWordMessage(word);
      }
      break;
    case "find":
      HandlePrintMessages.printFoundWordMessage(
        word,
        autoCompleteTrie.findWord(word),
      );
      break;
    case "complete":
      HandlePrintMessages.printAutoCompleteSuggestions(
        word,
        autoCompleteTrie.predictWords(word),
      );
      break;
    case "help":
      HandlePrintMessages.printCommands();
      break;
    case "exit":
      HandlePrintMessages.printExitMessage();
      break;
  }
} while (command !== "exit");
