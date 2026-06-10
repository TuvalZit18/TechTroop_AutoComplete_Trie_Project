# AutoComplete Trie Project

A console-based autocomplete application built using a **Trie (Prefix Tree)** data structure. The project allows users to add words, search for words, and get autocomplete suggestions based on a prefix.

## Methods

### addWord(word)

Adds a word to the Trie.

### findWord(word)

Returns `true` if the word exists, otherwise `false`.

### predictWords(prefix)

Returns all words that start with the given prefix.

### \_getRemainingTree(prefix, node)

Helper method that navigates to the node representing the last character of a prefix.

### \_allWordsHelper(prefix, node, allWords)

Helper method that recursively collects all words from a given node.

## Console Commands

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `add <word>`        | Add a word to the dictionary |
| `find <word>`       | Check if a word exists       |
| `complete <prefix>` | Get autocomplete suggestions |
| `help`              | Show available commands      |
| `exit`              | Exit the application         |

### Bonus Commands

| Command      | Description                    |
| ------------ | ------------------------------ |
| `use <word>` | Increment a word's usage count |

Autocomplete suggestions can optionally be ranked by usage frequency, showing the most frequently used words first.
