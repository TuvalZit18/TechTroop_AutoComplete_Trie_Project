import promptSync from "prompt-sync";

import HandlePrintMessages from "../Views/AutoCompleteTrie/HandleTerminalMessages.js";
import AutoCompleteTrie from "../Models/AutoCompleteTrie.js";
const prompt = promptSync();

let input, command, word;
const autoCompleteTrie = new AutoCompleteTrie();
HandlePrintMessages.printWelcomeMessage();
do {
  input = prompt("> ");
  const spaceIndex = input.indexOf(" ");
  const arg1 =
    spaceIndex === -1 ? input.trim() : input.slice(0, spaceIndex).trim();
  const arg2 =
    spaceIndex === -1
      ? undefined
      : input
          .slice(spaceIndex + 1)
          .trim()
          .replace(/^"|"$/g, "");
  command = arg1;
  word = arg2;

  switch (command) {
    case "add":
      if (autoCompleteTrie.findWord(word))
        HandlePrintMessages.printFoundWordMessage(word, true);
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
      if (word && word.length > 0)
        HandlePrintMessages.printAutoCompleteSuggestions(
          word,
          autoCompleteTrie.predictWords(word),
        );
      else {
        HandlePrintMessages.printAutoCompleteSuggestions("", []);
      }
      break;
    case "help":
      HandlePrintMessages.printCommands();
      break;
    case "use":
      if (autoCompleteTrie.findWord(word))
        HandlePrintMessages.printUseWord(
          word,
          autoCompleteTrie.useWord(word).frequency,
        );
      else {
        HandlePrintMessages.printFoundWordMessage(word, false);
      }
      break;
    case "exit":
      HandlePrintMessages.printExitMessage();
      break;
    default:
      HandlePrintMessages.printWrongCommand(command);
      break;
  }
} while (command !== "exit");
