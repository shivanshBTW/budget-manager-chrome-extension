function handleFillDetails(details) {
    document.querySelectorAll('[name=NaturePayment]')[1].value = details[0].fieldValue;
    if (details[1].fieldValue !== "null") {
        document.getElementById('NetBanking').checked = true;
        setPayMod(1);
        document.querySelector('#NetBank_Name_c').value = details[1].fieldValue;
    }
    if (details[2].fieldValue !== "null") {
        document.getElementById('DebitCard').checked = true;
        setPayMod(2);
        document.querySelector('#DebitBankName_c').value = details[2].fieldValue;
    }
    document.querySelectorAll('[name="TAN"]')[1].value = details[3].fieldValue;
    document.querySelectorAll('[name=AssessYear]')[1].value = details[4].fieldValue;
    document.querySelectorAll('[name=Add_Line1]')[1].value = 'adasd';
    document.querySelectorAll('[name=Add_Line2]')[1].value = details[6].fieldValue;
    document.querySelectorAll('[name=Add_Line3]')[1].value = details[7].fieldValue;
    document.querySelectorAll('[name=Add_Line4]')[1].value = details[8].fieldValue;
    document.querySelectorAll('[name=Add_Line5]')[1].value = details[9].fieldValue;
    document.querySelectorAll('[name=Add_State]')[1].value = details[10].fieldValue;
    document.querySelectorAll('[name=Add_PIN]')[1].value = details[11].fieldValue;
    document.querySelectorAll('[name=Add_EMAIL]')[0].value = details[12].fieldValue;
    document.querySelectorAll('[name=Add_MOBILE]')[0].value = details[13].fieldValue;
    details[14].fieldValue ? document.getElementById('0021').checked = true : document.getElementById('0020').checked = true;
    details[15].fieldValue ? document.getElementById('400').checked = true : document.getElementById('200').checked = true;
}

function loginUser() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        firebase.auth().signInAnonymously();
        firebase.auth().onAuthStateChanged(firebaseUser => {
            loggedInUser = firebaseUser;
            onLogin();
        })
    })
}

function insertButton() {
    let timer = document.getElementById('timer');
    let buttonDiv = document.createElement('div');
    timer.parentElement.parentElement.appendChild(buttonDiv);
    buttonDiv.innerHTML = '<div class="dropdown" style="margin-top: 20px; margin-bottom: 10px; ">\n' +
        '  <button class="btn btn-info dropdown-toggle"  type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n' +
        '    Fill the form\n' +
        '    <span class="caret"></span>\n' +
        '  </button>\n' +
        '  <ul class="dropdown-menu" id="filledDetailsDropdown" aria-labelledby="dropdownMenu1">\n' +
        '  </ul>\n' +
        '</div>';
}

function newSubmitFn() {
    let dataObject = [
        {
            fieldName: "NaturePayment",
            fieldValue: document.querySelectorAll('[name=NaturePayment]')[1].value,
            fieldType: "dropdown",
            required: true,
        },
        {
            fieldName: "NetBank_Name_c",
            fieldValue: document.querySelector('#NetBank_Name_c').value,
            fieldType: "dropdown",
            required: true,
        },
        {
            fieldName: "DebitBankName_c",
            fieldValue: document.querySelector('#DebitBankName_c').value,
            fieldType: "dropdown",
            required: true,
        },
        {
            fieldName: "TAN",
            fieldValue: document.querySelectorAll('[name="TAN"]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "AssessYear",
            fieldValue: document.querySelectorAll('[name=AssessYear]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_Line1",
            fieldValue: document.querySelectorAll('[name=Add_Line1]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_Line2",
            fieldValue: document.querySelectorAll('[name=Add_Line2]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_Line3",
            fieldValue: document.querySelectorAll('[name=Add_Line3]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_Line4",
            fieldValue: document.querySelectorAll('[name=Add_Line4]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_Line5",
            fieldValue: document.querySelectorAll('[name=Add_Line5]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_State",
            fieldValue: document.querySelectorAll('[name=Add_State]')[1].value,
            fieldType: "dropdown",
            required: true,
        },
        {
            fieldName: "Add_PIN",
            fieldValue: document.querySelectorAll('[name=Add_PIN]')[1].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_EMAIL",
            fieldValue: document.querySelectorAll('[name=Add_EMAIL]')[0].value,
            fieldType: "text",
            required: true,
        },
        {
            fieldName: "Add_MOBILE",
            fieldValue: document.querySelectorAll('[name=Add_MOBILE]')[0].value,
            fieldType: "number",
            required: true,
        }
    ];


    if (document.getElementById('0021').checked) {
        dataObject.push({
            fieldName: "taxApplicable",
            fieldValue: true,
            fieldType: "radio",
            required: true,
        })
    } else {
        dataObject.push({
            fieldName: "taxApplicable",
            fieldValue: false,
            fieldType: "radio",
            required: true,
        })
    }


    if (document.getElementById('400').checked) {
        dataObject.push({
            fieldName: "typeOfPayment",
            fieldValue: true,
            fieldType: "radio",
            required: true,
        })
    } else {
        dataObject.push({
            fieldName: "typeOfPayment",
            fieldValue: false,
            fieldType: "radio",
            required: true,
        })
    }
    if (dataObject[3].fieldValue) {
        firebase.database().ref(`${loggedInUser.uid}/filledDetails/${dataObject[3].fieldValue}`).set(dataObject);
    }
}

function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyDQJ4f3w0e7w0nD_TnpSQqa6srJ3MyCG2o",
        authDomain: "tax-extension.firebaseapp.com",
        databaseURL: "https://tax-extension.firebaseio.com",
        projectId: "tax-extension",
        storageBucket: "tax-extension.appspot.com",
        messagingSenderId: "1004893567430",
        appId: "1:1004893567430:web:052d273aa8e695b3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

function onLogin() {
    let filledDetails = firebase.database().ref(`${loggedInUser.uid}/filledDetails`).once('value');
    if (!document.getElementById('filledDetailsDropdown').innerHTML) {


    }

    let promise1 = new Promise(resolve => {
        document.getElementById('filledDetailsDropdown').innerHTML = '<div class="loader22"></div>'
        resolve(filledDetails);
    })

    promise1.then(details => {
            if (details.val()) {
                document.getElementById('filledDetailsDropdown').innerHTML = '';
            } else {
                document.getElementById('filledDetailsDropdown').innerHTML = "<div style='text-align: center;margin: 30px 10px;font-weight: bold;'><p>There is no data present for your account yet.</p><p>Please fill the form at least once to use this feature</p></div>"
            }
            for (let key in details.val()) {
                let detArray = details.val()[key]
                for (let i = 0; i < detArray.length; i++) {
                    detArray[i] = JSON.stringify(detArray[i]);
                }
                let detailDisplay = `<li><a onclick='handleFillDetails([${detArray}])'  class="dropdown-item" href="#">TAN: ${details.val()[key][3].fieldValue.toUpperCase()}</a></li>`;
                document.getElementById('filledDetailsDropdown').innerHTML += detailDisplay;
            }
        }
    );
}

// when the auth script is loaded, login the user anonymously.
window.addEventListener('AUTH_SCRIPT_LOADED', () => {
    initializeFirebase();
    loginUser();
});


function interceptSubmit() {
    let oldValidate = validate;
    document.tax281.newSubmit = document.tax281.submit;
    document.tax281.submit = () => {
    };

    validate = (frm) => {
        const validationResult = oldValidate(frm);
        if (validationResult) {
            // save the data to firebase
            newSubmitFn();
            document.tax281.newSubmit();
        }
    }
}

interceptSubmit();
// NOTE: you don't need to wait for anything as the DOM would be loaded already by the time this script is injected into the page
insertButton();
