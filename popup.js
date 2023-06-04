const text = document.getElementById("inputText");
const result = document.getElementById("result");
const button = document.getElementById("detectButton");

/* trust me on this thouhg this code may seem goofed up */

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
  console.log("Score in frontend: " + res.score);

  if (!isNaN(res.score)) {
    result.innerHTML =
      "There is a <h1> " +
      (res.score * 100).toFixed(3) +
      "%" +
      "</h1> accuracy rate that this was written by AI.";
    text.value = res.text;
    console.log(res);
  } else {
    console.log("not updated 2: " + res.score);

    result.innerHTML =
      "Click the button above to see your results! The lower the score, the lower chance of AI being detected!";
    text.value = "Enter your text here!";
  }
});

const refresh = () => {
  chrome.storage.local.get(["score"], (res) => {
    console.log("Score in frontend: " + isNaN(res.score));

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
};
