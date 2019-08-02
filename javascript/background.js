chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sendRequestType == 281) {
        chrome.tabs.create({url: "https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp"}, (tab) => {
            chrome.tabs.sendMessage(tab.id, {sendRequestType: 281});
            chrome.tabs.executeScript(tab.id, {code: "let callItScript = document.createElement('script');callItScript.innerHTML = 'sendRequest(281);';document.getElementById('footerDiv').appendChild(callItScript);"})
        });
    }
});