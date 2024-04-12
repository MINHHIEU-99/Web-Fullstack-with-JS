'use strict';

const logOutBtn = document.getElementById('btn-logout');
const welcomeMessage = document.getElementById('welcome-message');

let currentUser = getFromStorage('CURRENT_USER');

console.log(currentUser);

if (currentUser == undefined)
    document.getElementById('main-content').style.display = 'none';
else {
    currentUser = JSON.parse(currentUser);
    document.getElementById('login-modal').style.display = 'none';
    welcomeMessage.textContent = `Welcome ${currentUser.userName} !!!`;
}

logOutBtn.addEventListener('click', function () {
    localStorage.removeItem('CURRENT_USER');
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block';

    window.location.href = './pages/login.html';
});
