const printWelcomeMessage = () => {
  console.log("=== AutoComplete Trie Console ===");
  console.log("Type 'help' for commands");
};

const printCommands = () => {
  console.log(`
  Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program`);
};

const printExitMessage = () => {
  console.log("Goodbye!");
};

const printAddWordMessage = (word) => {
  console.log(`✓ Added ${word} to dictionary.`);
};

const printFoundWordMessage = (word, isWordFound) => {
  if (isWordFound) console.log(`✓ '${word}' exists in dictionary.`);
  else console.log(`✗ '${word}' exists in dictionary.`);
};

const printAutoCompleteSuggestins = (prefix, suggestions) => {
  console.log(`Suggestions for '${prefix}':${suggestions.joim(", ")}`);
};

export default {
  printWelcomeMessage,
  printCommands,
  printExitMessage,
  printFoundWordMessage,
  printAutoCompleteSuggestins,
};
