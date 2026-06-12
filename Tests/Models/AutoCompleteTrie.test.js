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
});

describe("Tests || Models || AutoCompleteTrie || predictWords", () => {
  let autoCompleteTrie;

  beforeEach(() => {
    autoCompleteTrie = new AutoCompleteTrie();
    autoCompleteTrie.addWord("cat");
    autoCompleteTrie.addWord("car");
    autoCompleteTrie.addWord("card");
    autoCompleteTrie.addWord("care");
    autoCompleteTrie.addWord("something");
  });

  test("Happy path —  prefix with multiple completions returns all matching words", () => {
    const predictedWords = autoCompleteTrie.predictWords("ca");

    expect(predictedWords.length).toBe(4);
    expect(predictedWords).toEqual([
      { frequency: 0, word: "cat" },
      { frequency: 0, word: "car" },
      { frequency: 0, word: "card" },
      { frequency: 0, word: "care" },
    ]);
  });
  test("Private methods - insure _remainingTree and _allWordsHelper methods were invoked when calling predictWord methods.", () => {
    const _remainingTreeSpy = jest.spyOn(autoCompleteTrie, "_getRemainingTree");
    const _allWordsHelperSpy = jest.spyOn(autoCompleteTrie, "_allWordsHelper");

    const predictedWords = autoCompleteTrie.predictWords("ca");

    expect(_remainingTreeSpy).toHaveBeenCalled();
    expect(_allWordsHelperSpy).toHaveBeenCalled();

    _remainingTreeSpy.mockRestore();
    _allWordsHelperSpy.mockRestore();
  });

  test("No matches — prefix that doesn't exist in trie returns empty array.", () => {
    const predictedWords = autoCompleteTrie.predictWords("dog");

    expect(predictedWords.length).toBe(0);
    expect(predictedWords).toEqual([]);
  });

  test("Exact word as prefix — prefix that is itself a complete word is included in results.", () => {
    const predictedWords = autoCompleteTrie.predictWords("car");

    expect(predictedWords.length).toBe(3);
    expect(predictedWords).toEqual([
      { frequency: 0, word: "car" },
      { frequency: 0, word: "card" },
      { frequency: 0, word: "care" },
    ]);
  });

  test("Single completion — prefix with only one matching word returns array with that word.", () => {
    const predictedWords = autoCompleteTrie.predictWords("some");

    expect(predictedWords.length).toBe(1);
    expect(predictedWords).toEqual([{ frequency: 0, word: "something" }]);
  });

  test("Case insensitive — uppercase prefix still finds matches", () => {
    const predictedWords = autoCompleteTrie.predictWords("Ca");
    const predictedWords2 = autoCompleteTrie.predictWords("cA");
    const predictedWords3 = autoCompleteTrie.predictWords("CA");

    expect(predictedWords.length).toBe(4);
    expect(predictedWords).toEqual([
      { frequency: 0, word: "cat" },
      { frequency: 0, word: "car" },
      { frequency: 0, word: "card" },
      { frequency: 0, word: "care" },
    ]);

    expect(predictedWords2.length).toBe(4);
    expect(predictedWords2).toEqual(predictedWords);

    expect(predictedWords3.length).toBe(4);
    expect(predictedWords2).toEqual(predictedWords);
  });

  test("Sort by frequenceis — Descending order of prediction words ", () => {
    autoCompleteTrie.useWord("card");
    autoCompleteTrie.useWord("card");
    autoCompleteTrie.useWord("card");
    autoCompleteTrie.useWord("care");
    autoCompleteTrie.useWord("care");
    autoCompleteTrie.useWord("car");

    const predictedWords = autoCompleteTrie.predictWords("Ca");

    expect(predictedWords.length).toBe(4);
    expect(predictedWords).toEqual([
      { frequency: 3, word: "card" },
      { frequency: 2, word: "care" },
      { frequency: 1, word: "car" },
      { frequency: 0, word: "cat" },
    ]);
  });
});
