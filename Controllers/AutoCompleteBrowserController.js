import AutoCompeteTrie from "../Models/AutoCompleteTrie.js";
import View from "../Views/AutoCompleteBrowser/main.js";
document.addEventListener("DOMContentLoaded", () => {
  const trie = new AutoCompeteTrie();
  const button = document.querySelector(".btnAdd");
  const input = document.querySelector(".inputAdd");
  const messageContainer = document.querySelector(".message-container");
  const counterWordsSpan = document.querySelector(".counter-words-text");
  counterWordsSpan.textContent = trie.predictWords("").length;
  button.addEventListener("click", (event) =>
    onClick_btnAdd(event, trie, input, messageContainer, counterWordsSpan),
  );

  /** @type {HTMLInputElement} */

  const autoCompleteInput = document.querySelector("#autoCompleteInput");
  const autoCompleteList = document.querySelector(".auto-complete-list");
  const autoComplete = document.querySelector(".auto-complete");
  autoCompleteInput.addEventListener("input", (event) =>
    onTextChange(event, trie, messageContainer, autoCompleteList, autoComplete),
  );
  autoCompleteInput.addEventListener("focus", (event) =>
    onTextChange(event, trie, messageContainer, autoCompleteList, autoComplete),
  );

  autoCompleteInput.addEventListener(
    "blur",
    () => (autoComplete.style.display = "none"),
  );
});

const setMessage = (container, message, type) => {
  container.textContent = message;

  container.classList.remove("success", "failure");
  container.classList.add(type);
};

const onClick_btnAdd = (
  event,
  trie,
  input,
  messageContainer,
  counterWordsSpan,
) => {
  const word = input.value;
  if (word.length > 0) {
    if (trie.findWord(word)) {
      const message = View.printAlreadyExist(word);
      message.split();
      setMessage(messageContainer, message, "failure");
    } else {
      trie.addWord(word);
      counterWordsSpan.textContent = trie.predictWords("").length;
      const message = View.printAddWordMessage(word);
      setMessage(messageContainer, message, "success");
    }
  }
};

const onTextChange = (
  event,
  trie,
  messageContainer,
  autoCompleteList,
  autoComplete,
) => {
  const prefix = event.target.value;
  let predictions;
  if (prefix.length > 0) {
    autoComplete.style.display = "flex";
    autoCompleteList.innerHTML = "";
    predictions = trie.predictWords(prefix);
    let isMouseDown = false;

    for (const prediction of predictions) {
      const li = document.createElement("li");
      const highlightedSpan = document.createElement("span");
      highlightedSpan.textContent = prefix;
      highlightedSpan.classList.add("highlight");
      li.appendChild(highlightedSpan);
      const span = document.createElement("span");
      span.textContent = prediction.word.substr(prefix.length);
      li.appendChild(span);

      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isMouseDown = true;
        autoCompleteInput.value = prediction.word;
      });

      li.addEventListener("mouseenter", () => {
        if (isMouseDown) {
          autoCompleteInput.value = prediction.word;
        }
      });

      li.addEventListener("mouseup", () => {
        isMouseDown = false;
        trie.useWord(prediction.word);
        autoComplete.style.display = "none";
      });
      autoCompleteList.appendChild(li);
    }
  } else {
    autoComplete.style.display = "none";
  }
};
