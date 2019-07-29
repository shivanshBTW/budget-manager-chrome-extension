function main(){
    document.getElementById('saveLimit').addEventListener('click',()=>{
        let limit = document.getElementById('limit').value;
        if(limit){
            chrome.storage.sync.set({'limit':limit}, ()=>{
                close();
            })
        }
    })
    document.getElementById('resetTotal').addEventListener('click', ()=>{
        chrome.storage.sync.set({'total':0}, ()=>{
            var notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: "Total Reset",
                message: "Total is now reset"
            };
            chrome.notifications.create('TotalReset',  notifOptions);
        })
    })
}
main();