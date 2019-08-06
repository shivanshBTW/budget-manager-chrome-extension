    chrome.storage.sync.get(['total','limit'], (budget)=>{
        document.getElementById('total').innerText= budget.total;
        document.getElementById('limit').innerText= budget.limit;
    });

    document.getElementById('spendAmount').addEventListener('click',()=>{
        chrome.storage.sync.get(['total','limit'], (budget)=>{
            let newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            let amount = document.getElementById('amount').value;
            if(amount){
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total':newTotal},function(){
                if(amount && newTotal>=budget.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: "Limit Reached!",
                        message: "Limit is reached!!!"
                    };

                    chrome.notifications.create('limitNotif',  notifOptions);
                }
            });

            document.getElementById('total').innerText = newTotal;
            document.getElementById('amount').value = '';
        })
    })