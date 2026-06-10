class AutoCompleteTrie {
  constructor(val = "") {
    this.value = val;
    this.children = {};
    this.endOfWord = false;
  }
  /**
   * Adding new word to the AutoCompleteTrie
   * @param {String} word  - words to add to trie.
   */
  addWord(word) {
    if (typeof word !== "string") {
      //# Invalid Input
    }
    if (word.length === 0) {
      //# Empty String
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
}
