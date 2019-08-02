document.getElementById('openLinkButton').addEventListener('click', () => {
    console.log('message sent');
    chrome.runtime.sendMessage({sendRequestType: 281});
});