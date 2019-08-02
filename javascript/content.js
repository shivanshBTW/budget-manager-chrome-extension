function injectScript() {
    // inject custom script
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL('javascript/inject.js');
    s.onload = function () {
        this.remove();
    };
    document.getElementById('nlmsg').appendChild(s);

    // inject auth script
    let firebaseAuth = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    firebaseAuth.src = "https://www.gstatic.com/firebasejs/6.3.3/firebase.js";
    firebaseAuth.onload = function () {
        window.dispatchEvent(new Event('AUTH_SCRIPT_LOADED'));
        this.remove();
    };
    document.getElementById('nlmsg').appendChild(firebaseAuth);


    let externalCSS = document.createElement('style');
    // externalCSS.setAttribute('rel', 'stylesheet');
    externalCSS.innerText = '.loader22 {\n' +
        '  border: 7px solid #f3f3f3; /* Light grey */\n' +
        '  border-top: 7px solid #3498db; /* Blue */\n' +
        '  border-radius: 50%;\n' +
        '  width: 40px;\n' +
        '  height: 40px;\n' +
        '  animation: spin 2s linear infinite;\n' +
        '  margin: 20px auto;\n' +
        '}\n' +
        '\n' +
        '@keyframes spin {\n' +
        '  0% { transform: rotate(0deg); }\n' +
        '  100% { transform: rotate(360deg); }\n' +
        '}';
    document.getElementById('nlmsg').appendChild(externalCSS);
}

injectScript();


// NEXT tasks:
// show popup form on the click of fill the form button, in the next version.
// 1- different ways of sending messages.
//         extremely critical since some of the scripts can only perform certain actions.
// 2- Go to typescript kind of structure, going forward.


// CURRENT tasks:
// No data to fill yet.
//
// fields = [
//     {
//         fieldName: "Add_EMAIL",
//         fieldValue: gg,
//         fieldType: "text",
//         required: true,
//     },
//     {
//         fieldName: "Add_State",
//         fieldValue: "ANDHRA PRADESH",
//         fieldType: "dropdown",
//         required: true,
//     },
//     {
//         fieldName: "Add_State",
//         fieldValue: true,
//         fieldType: "radio",
//         required: true,
//     }
// ]