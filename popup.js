const text = document.getElementById("inputText");
const result = document.getElementById("result");
const button = document.getElementById("detectButton");

button.onclick = () => {
  const prefs = {
    text: text.value,
  };
  chrome.runtime.sendMessage({
    event: "detectAI",
    prefs,
  });

  chrome.storage.local.get(["score"], (res) => {
    if (!isNaN(res.score)) {
      result.innerHTML =
        "There is a <h1> " +
        (res.score * 100).toFixed(3) +
        "%" +
        "</h1> accuracy rate that this was written by AI.";
    } else {
      console.log("not updated 1: " + res.score);
      result.innerHTML =
        "Click the button above to see your results! The lower the score, the lower chance of AI being detected!";
      text.value = "Enter your text here!";
    }
  });
};

chrome.storage.local.get(["score"], (res) => {
  if (!isNaN(res.score)) {
    result.innerHTML =
      "There is a <h1> " +
      (res.score * 100).toFixed(3) +
      "%" +
      "</h1> accuracy rate that this was written by AI.";
  } else {
    console.log("not updated 2: " + res.score);

    result.innerHTML =
      "Click the button above to see your results! The lower the score, the lower chance of AI being detected!";
    text.value = "Enter your text here!";
  }
});
