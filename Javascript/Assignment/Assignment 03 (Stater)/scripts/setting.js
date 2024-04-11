'use strict'

const sPInput = document.getElementById('input-page-size');
const cGInput = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');

let userArr = JSON.parse(getFromStorage('USER_ARRAY', '[]'));
let userNameArr = JSON.parse(getFromStorage('USER_NAME', '[]'));
let currentUser = getFromStorage('CURRENT_USER');

if (currentUser != undefined) currentUser = JSON.parse(currentUser);


let kayle = new User('A', 'B', 'C', '1');


console.log(kayle);
// console.log(userArr);

kayle.newsPerPage = '3';
console.log(kayle);


function clearInput() {
    document.getElementById('settingForm').reset();
}

saveBtn.addEventListener('click', function () {
    if (currentUser == undefined) {
        alert('Please log in your account');
        clearInput();
    } else {
        const data = {
            sizePageInput: sPInput.value,
            categoryInput: cGInput.value,
        };
        
        function validate (data) {
            if (data.sizePageInput <= 0) {
                alert('Number of news per page must greater than 0');
                return false;
            }
            else return true;
        };
        if (validate(data)) {
            // Update Current User
            currentUser.newsPerPage = data.sizePageInput;
            currentUser.newsCategory = data.categoryInput;
            console.log(currentUser);
            
            // Update userArr
            userArr.splice(userArr.findIndex(e => e.userName == currentUser.userName), 1);
            userArr.push(currentUser);
            console.log(userArr);

            userNameArr.splice(userNameArr.findIndex(e => e == currentUser.userName), 1);
            userNameArr.push(currentUser.userName);
            console.log(userNameArr);

            // Clear Input
            clearInput();

            // Save to local storage
            saveToStorage('CURRENT_USER', JSON.stringify(currentUser));
            saveToStorage('USER_ARRAY', JSON.stringify(userArr));
            saveToStorage('USER_NAME', JSON.stringify(userNameArr));
        }
    }    
});
