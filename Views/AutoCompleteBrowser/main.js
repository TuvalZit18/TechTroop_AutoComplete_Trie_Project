const printAddWordMessage = (word) => {
  return word.length > 0
    ? `✓ Added '${word}' to dictionary.`
    : `✗ Cannot add empty word`;
};

const printFoundWordMessage = (word, isWordFound) => {
  return isWordFound
    ? `✓ '${word}' exists in dictionary.`
    : `✗ '${word}' not found in dictionary.`;
};

const printUseWord = (word, frequency) => {
  return `✓ Incremented usage for '${word}' (now ${frequency})`;
};

const printAlreadyExist = (word) => {
  return `✗ '${word}' already exists in dictionary.`;
};

export default {
  printAddWordMessage,
  printFoundWordMessage,
  printUseWord,
  printAlreadyExist,
};
