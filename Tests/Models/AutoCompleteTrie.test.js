import AutoCompleteTrie from "../../Models/AutoCompleteTrie.js";

describe("Tests || Models || AutoCompleteTrie || addWord", () => {
  let autoCompleteTrie;

  beforeEach(() => {
    autoCompleteTrie = new AutoCompleteTrie();
  });

  test("Happy path — adding a valid word builds the correct trie structure.", () => {
    autoCompleteTrie.addWord("hello");
    expect(
      autoCompleteTrie.children["h"].children["e"].children["l"].children["l"]
        .children["o"],
    ).toBeDefined();
  });

  test("EndOfWord flag — the last letter of the added word has endOfWord: true.", () => {
    autoCompleteTrie.addWord("hi");
    expect(autoCompleteTrie.children["h"].endOfWord).toBe(false);
    expect(autoCompleteTrie.children["h"].children["i"].endOfWord).toBe(true);
  });

  test("Case Insestive normalization — adding words case insestively.", () => {
    autoCompleteTrie.addWord("Hello");
    expect(autoCompleteTrie.children["h"]).toBeDefined();
    expect(autoCompleteTrie.children["H"]).toBeUndefined();
  });

  test("Shared Prefix - add a shared prefix words to auto complete trie should share partial path.", () => {
    autoCompleteTrie.addWord("cat");
    autoCompleteTrie.addWord("car");
    expect(autoCompleteTrie.children["c"].children["a"]).toBeDefined();
    expect(
      autoCompleteTrie.children["c"].children["a"].children,
    ).toHaveProperty("t");
    expect(
      autoCompleteTrie.children["c"].children["a"].children,
    ).toHaveProperty("r");
  });

  test("Invalid input — passing a non-string should ...", () => {
    //INCOMPLETE
  });
  test("Empty string — passing a empty string should ...", () => {
    //INCOMPLETE
  });
});

describe("Tests || Models || AutoCompleteTrie || findWord", () => {
  let autoCompleteTrie;

  beforeEach(() => {
    autoCompleteTrie = new AutoCompleteTrie();
  });

  test("Happy path — searching for a word that exists returns true.", () => {
    autoCompleteTrie.addWord("hello");
    let isWordInTrie = autoCompleteTrie.findWord("hello");
    expect(isWordInTrie).toBe(true);
  });

  test("Word not in trie — searching for a word that was never added returns false.", () => {
    autoCompleteTrie.addWord("hello");
    let isWordInTrie = autoCompleteTrie.findWord("world");
    expect(isWordInTrie).toBe(false);
  });

  test("Prefix only — searching for 'cat' when only 'cats' was added returns false.", () => {
    autoCompleteTrie.addWord("cats");
    let isWordInTrie = autoCompleteTrie.findWord("cat");
    expect(isWordInTrie).toBe(false);
  });

  test("Case insensitive — searching for 'Hello' finds 'hello'.", () => {
    autoCompleteTrie.addWord("hello");
    let isWordInTrie = autoCompleteTrie.findWord("Hello");
    expect(isWordInTrie).toBe(true);
  });

  test("Invalid input — passing a non-string should ...", () => {
    //INCOMPLETE
  });
  test("Empty string — passing a empty string should ...", () => {
    //INCOMPLETE
  });
});
