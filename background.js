const apiKey = "IGKG0A8DQ3GDU3LOG19WQ19NRACM1997";

/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detectAI') {
    const text = request.text;

    fetch('https://api.sapling.ai/api/v1/aidetect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((result) => {
        sendResponse({ result });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    return true;
  }
}); */

chrome.runtime.onMessage.addListener(async (data) => {
  try {
    if (data.event == "detectAI" && data.prefs.text.trim("") != "") {
      const input = {
        key: apiKey,
        text: data.prefs.text,
      };

      const res = await fetch("https://api.sapling.ai/api/v1/aidetect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const finres = await res.json();
      console.log("Score: " + finres.score);

      chrome.storage.local.set({
        "score": finres.score,
      }, () => { 
         console.log("Score updated!")
      });


    }
  } catch (e) {
    console.log(e.message);
  }
});
