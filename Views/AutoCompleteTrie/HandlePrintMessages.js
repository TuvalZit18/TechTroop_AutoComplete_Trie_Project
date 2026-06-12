const printWelcomeMessage = () => {
  console.log("=== AutoComplete Trie Console ===");
  console.log("Type 'help' for commands");
};

const printCommands = () => {
  console.log(`Commands:
add <word>      - Add word to dictionary
find <word>     - Check if word exists
complete <prefix> - Get completions
help           - Show this message
exit           - Quit program\n`);
};

const printExitMessage = () => {
  console.log("Goodbye!");
};

const printAddWordMessage = (word) => {
  console.log(`✓ Added '${word}' to dictionary.\n`);
};

const printFoundWordMessage = (word, isWordFound) => {
  if (isWordFound) console.log(`✓ '${word}' exists in dictionary.\n`);
  else console.log(`✗ '${word}' not found in dictionary.\n`);
};

const printAutoCompleteSuggestions = (prefix, suggestions) => {
  let suggestionsDisplay = "";
  for (const suggestion of suggestions) {
    suggestionsDisplay += `${suggestion.word} (${suggestion.frequency}), `;
  }

  console.log(
    `Suggestions for '${prefix}': ${suggestionsDisplay.slice(0, -2)}\n`,
  );
};

const printUseWord = (word, frequency) => {
  console.log(`✓ Incremented usage for '${word}' (now ${frequency})\n`);
};

const printWrongCommand = (command) => {
  console.error(
    `'${command}' is not recognized as an internal or external command.\n`,
  );
};

export default {
  printWelcomeMessage,
  printCommands,
  printExitMessage,
  printAddWordMessage,
  printFoundWordMessage,
  printAutoCompleteSuggestions,
  printUseWord,
  printWrongCommand,
};
