import AutoCompleteTrie from "../../Models/AutoCompleteTrie.js";

describe("Tests || Models || AutoCompleteTrie || addWord", () => {
  let autoCompleteTrie;

  beforeEach(() => {
    autoCompleteTrie = new AutoCompleteTrie();
  });

  test("should add a word to the auto complete trie", () => {
    autoCompleteTrie.addWord("hello");
    expect(
      autoCompleteTrie.children["h"].children["e"].children["l"].children["l"]
        .children["o"],
    ).toBeDefined();
  });

  test("should add word to trie and mark last letter as EOW - end of word", () => {
    autoCompleteTrie.addWord("hi");
    expect(autoCompleteTrie.children["h"].endOfWord).toBe(false);
    expect(autoCompleteTrie.children["h"].children["i"].endOfWord).toBe(true);
  });

  test("should add a word to the auto compete trie case insensitive", () => {
    autoCompleteTrie.addWord("Hello");
    expect(autoCompleteTrie.children["h"]).toBeDefined();
    expect(autoCompleteTrie.children["H"]).toBeUndefined();
  });

  test("should add a shared prefix words to auto complete trie", () => {
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
