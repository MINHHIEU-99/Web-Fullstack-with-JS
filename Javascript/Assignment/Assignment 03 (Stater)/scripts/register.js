'use strict';

const registerBtn = document.getElementById('btn-submit');
const fNInput = document.getElementById('input-firstname');
const lNInput = document.getElementById('input-lastname');
const uNInput = document.getElementById('input-username');
const pwInput = document.getElementById('input-password');
const pwcInput = document.getElementById('input-password-confirm');

const KEY = 'USER_ARRAY';
let userArr = JSON.parse(getFromStorage(KEY, '[]'));
let userNameArr = JSON.parse(getFromStorage('USER_NAME', '[]'));

// let currentUser = JSON.parse(getFromStorage('CURRENT_USER', '[]'));
// saveToStorage(KEY, JSON.stringify(userArr))

registerBtn.addEventListener('click', function () {
    const data = {
        firstName: fNInput.value,
        lastName: lNInput.value,
        userName: uNInput.value,
        password: pwInput.value,
    };
    const passwordConfirm = pwcInput.value;

    /* Ham validate du lieu dau vao */
    function validateData(data) {
        if (data.firstName == '') {
            alert('First Name must be filled out');
            return false;
        }
        if (data.lastName == '') {
            alert('Last Name must be filled out');
            return false;
        }
        if (data.userName == '') {
            alert('Username must be filled out');
            return false;
        }
        if (data.password == '') {
            alert('Password must be filled out');
            return false;
        }
        if (data.passwordConfirm == '') {
            alert('Please confirm your password');
            return false;
        }
        if (data.password.length <= 8) {
            alert('Password must have more than 8 characters');
            return false;
        }
        if (passwordConfirm !== data.password) {
            alert('Password does not match');
            return false;
        }
        if (userNameArr.includes(data.userName)) {
            alert('User name already exists');
            return false;
        } else return 1;
    }
    /* CLEAR INPUT FORM */
    function clearInput() {
        document.getElementById('myForm').reset();
    }

    const validate = validateData(data);
    if (validate) {
        const user = parseUser(data);
        console.log(user);

        userArr.push(user);
        userNameArr.push(user.userName);

        saveToStorage(KEY, JSON.stringify(userArr));
        saveToStorage('USER_NAME', JSON.stringify(userNameArr));

        clearInput();
        window.location.href = '../pages/login.html';
        // console.log(userArr);
        // console.log(userNameArr);
    }
});

// userArr.splice(0, 1);
// userNameArr.splice(0, 1);
// saveToStorage(KEY, JSON.stringify(userArr));
// saveToStorage('USER_NAME', JSON.stringify(userNameArr));

// console.log(userArr);
// console.log(userNameArr);
