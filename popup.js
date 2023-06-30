const text = document.getElementById("inputText");
const result = document.getElementById("result");
const button = document.getElementById("detectButton");

button.onclick = () => {
  const prefs = {
    text: text.value,
    step: false,
  };
  chrome.runtime.sendMessage({
    event: "detectAI",
    prefs,
  });
  result.innerHTML = "<h1>Calculating...</h1>";
  setTimeout(refresh, 3000);
};

chrome.storage.local.get(["score", "text"], (res) => {
  if (!isNaN(res.score)) {
    result.innerHTML =
      "There is a <h1>" +
      (res.score * 100).toFixed(3) +
      "%</h1> accuracy rate that this was written by AI.";
    if (res.text) {
      text.value = res.text;
    }
  } else {
    result.innerHTML =
      "Click the button above to see your results! The lower the score, the lower the chance of AI being detected!";
    text.value = "Enter your text here!";
  }
});

const refresh = () => {
  chrome.storage.local.get(["score"], (res) => {
    if (!isNaN(res.score)) {
      result.innerHTML =
        "There is a <h1>" +
        (res.score * 100).toFixed(3) +
        "%</h1> accuracy rate that this was written by AI.";
    } else {
      result.innerHTML =
        "Click the button above to see your results! The lower the score, the lower the chance of AI being detected!";
      text.value = "Enter your text here!";
    }
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === "highlightedText") {
    text.value = request.text;
  }
});
