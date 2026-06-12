class AutoCompleteTrie {
  constructor(val = "") {
    this.value = val;
    this.children = {};
    this.endOfWord = false;
    this.frequency = 0;
  }
  /**
   * Adding new word to the AutoCompleteTrie
   * @param {String} word  - words to add to trie.
   */
  addWord(word) {
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
    let current = this;
    const letters = word.toLowerCase().split("");

    for (const letter of letters) {
      if (!current.children[letter]) return false;
      current = current.children[letter];
    }
    return current.endOfWord;
  }

  predictWords(prefix) {
    const completions = [];
    this._allWordsHelper(prefix, this, completions);
    return completions.sort(
      (node1, node2) => node2.frequency - node1.frequency,
    );
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

    if (remainingNode.endOfWord)
      allWords.push({
        word: prefix.toLowerCase(),
        frequency: remainingNode.frequency,
      });

    const letters = Object.keys(remainingNode.children);
    if (letters.length === 0) return;

    for (const letter of letters) {
      this._allWordsHelper(prefix + letter, node, allWords);
    }
  }
  useWord(word) {
    let lastLetterNode = this._getRemainingTree(word, this);
    lastLetterNode.frequency++;
    return lastLetterNode;
  }
}

export default AutoCompleteTrie;
