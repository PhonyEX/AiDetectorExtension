const apiKey = "QY21KK1KOQ8Z098CS63OCMZLFHLL1ADY";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "detectText",
    title: "Detect AI",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "detectText") {
    const text = info.selectionText;
    openExtensionAndDetectText(text);
  }
});

const openExtensionAndDetectText = (text) => {
  chrome.runtime.sendMessage({ event: "openExtension" });

  setTimeout(() => {
    chrome.runtime.sendMessage({ event: "highlightedText", text });
  }, 500);
};

chrome.runtime.onMessage.addListener(async (data) => {
  try {
    if (data.event === "detectAI" && data.prefs.text.trim("") !== "") {
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
      console.log("Response: " + JSON.stringify(finres));

      chrome.storage.local.set(finres);
    }
  } catch (e) {
    console.log(e.message);
  }
});
