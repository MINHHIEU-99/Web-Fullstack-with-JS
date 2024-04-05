'use strict';

const loginBtn = document.getElementById('btn-submit');
const uNInput = document.getElementById('input-username');
const pWInput = document.getElementById('input-password');

let userArr = JSON.parse(getFromStorage('USER_ARRAY', '[]'));
let userNameArr = JSON.parse(getFromStorage('USER_NAME', '[]'));

let currentUser;
// saveToStorage('CURRENT_USER', JSON.stringify(currentUser));

loginBtn.addEventListener('click', function () {
    const loginInfo = {
        userName: uNInput.value,
        password: pWInput.value,
    };

    let loginUser = userArr[userNameArr.findIndex(e => e == loginInfo.userName)];
    function validateData(data) {
        if (data.userName == '') {
            alert('Username must be filled out');
            return false;
        }
        if (data.password == '') {
            alert('Password must be filled out');
            return false;
        }
        if (!userNameArr.includes(data.userName)) {
            alert('Wrong username or password');
            return false;
        } else {
            if (loginUser.password !== data.password) {
                alert('Wrong username or password');
                return false;
            } else return 1;
        }
    }
    function clearInput() {
        document.getElementById('myForm').reset();
    }

    const validate = validateData(loginInfo);
    if (validate) {
        currentUser = parseUser(loginUser);
        saveToStorage('CURRENT_USER', JSON.stringify(currentUser));
        clearInput();
        window.location.href = '../index.html';

        console.log(currentUser);
    }
});

console.log(userArr);

