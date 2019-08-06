var contextMenuItem = {
    "id": "spendMoney",
    "title": "spendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener((clickData) => {
        if (clickData.menuItemId === 'spendMoney' && clickData.selectionText) {
            if (isInt(clickData.selectionText)) {
                chrome.storage.sync.get(['total', 'limit'], (budget) => {
                    let newTotal = 0;
                    if (budget.total) {
                        newTotal += parseInt(budget.total);
                    }
                    newTotal += parseInt(clickData.selectionText);
                    chrome.storage.sync.set({'total': newTotal}, () => {
                        if (newTotal >= budget.limit) {
                            var notifOptions = {
                                type: 'basic',
                                iconUrl: '../icon48.png',
                                title: "Limit Reached!",
                                message: "Limit is reached!!!"
                            };
                            chrome.notifications.create('limitNotif', notifOptions);
                        }
                    });
                    //
                    // document.getElementById('total').innerText = newTotal;
                    // document.getElementById('amount').value = '';
                })
            }
        }
    }
);


chrome.storage.onChanged.addListener(function (changes,storageName) {
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString() })
})
