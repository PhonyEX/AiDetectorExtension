/* document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
      chrome.runtime.sendMessage({ action: 'detectAI', text: selectedText }, (response) => {
        if (response.error) {
          console.error(response.error);
          return;
        }
        const aiDetected = response.result.aiDetected;
  
        if (aiDetected) {
          console.log('AI detected in the selected text.');
        } else {
          console.log('No AI detected in the selected text.');
        }
      });
    }
  });
  */
