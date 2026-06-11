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
  console.log("Goodbye!\n");
};

const printAddWordMessage = (word) => {
  console.log(`✓ Added ${word} to dictionary.\n`);
};

const printFoundWordMessage = (word, isWordFound) => {
  if (isWordFound) console.log(`✓ '${word}' exists in dictionary.\n`);
  else console.log(`✗ '${word}' not found in dictionary.\n`);
};

const printAutoCompleteSuggestions = (prefix, suggestions) => {
  console.log(`Suggestions for '${prefix}': ${suggestions.join(", ")}\n`);
};

export default {
  printWelcomeMessage,
  printCommands,
  printExitMessage,
  printAddWordMessage,
  printFoundWordMessage,
  printAutoCompleteSuggestions,
};
