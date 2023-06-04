const apiKey = 'TFOYA6ZKTERJTI4PU5E9VOYY0AJGUODX';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
});
