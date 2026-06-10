class AutoCompleteTrie {
  constructor(val = "") {
    this.value = val;
    this.children = {};
    this.endOfWord = false;
  }
}
