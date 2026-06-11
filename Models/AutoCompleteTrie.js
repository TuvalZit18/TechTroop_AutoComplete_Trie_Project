class AutoCompleteTrie {
  constructor(val = "") {
    this.value = val;
    this.children = {};
    this.endOfWord = false;
  }

  //TODO extract validation to different file
  /**
   * Adding new word to the AutoCompleteTrie
   * @param {String} word  - words to add to trie.
   */
  addWord(word) {
    if (typeof word !== "string") {
      // TODO decide return value for invalid string
    }
    if (word.length === 0) {
      // TODO decide return value for empty string
    }

    const letters = word.toLowerCase().split("");
    let current = this;

    for (const letter of letters) {
      if (Object.keys(current.children).includes(letter) === false) {
        current.children[letter] = new AutoCompleteTrie(letter);
        current = current.children[letter];
      } else {
        current = current.children[letter];
      }
    }
    current.endOfWord = true;
  }

  /**
   * Finding word in AutoCompleteTrie
   * @param {String} word  - words to add to trie.
   * @returns {boolean} - true word was found, otherwise false.
   */
  findWord(word) {
    if (typeof word !== "string") {
      // TODO decide return value for invalid string
    }
    if (word.length === 0) {
      // TODO decide return value for empty string
    }

    let current = this;
    const letters = word.toLowerCase().split("");

    for (const letter of letters) {
      if (!current.children[letter]) return false;
      current = current.children[letter];
    }
    return current.endOfWord;
  }

  _getRemainingTree(prefix, node) {
    let current = node;
    const letters = prefix.toLowerCase().split("");

    for (const letter of letters) {
      if (!current.children[letter]) return null;
      current = current.children[letter];
    }
    return current;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (!node) return;

    let remainingNode = this._getRemainingTree(prefix, node);
    if (!remainingNode) return;

    if (remainingNode.endOfWord) allWords.push(prefix);

    const letters = Object.keys(remainingNode.children);
    if (letters.length === 0) return;

    for (const letter of letters) {
      this._allWordsHelper(prefix + letter, node, allWords);
    }
  }
}

export default AutoCompleteTrie;
