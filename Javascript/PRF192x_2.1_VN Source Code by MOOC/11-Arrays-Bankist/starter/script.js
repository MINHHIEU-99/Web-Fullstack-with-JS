'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const withdrawals = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
};

// Add username to accounts
const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name.at(0))
            .join('');
    });
};
createUserName(accounts);

// Update UI function
const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
};

// Login Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form from submitting
    const data = {
        name: inputLoginUsername.value,
        pin: inputLoginPin.value,
    };
    currentAccount = accounts.find(acc => acc.username === data.name);

    console.log(currentAccount);

    if (currentAccount?.pin === Number(data.pin)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear Input field
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);
    } else alert('Wrong');
    return false;
});

// Tại sao assignment 1 không cần dùng preventDefault mà vẫn hiển thị được ?????????

// Transfer Event Handler
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const transferAmount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        transferAmount > 0 &&
        currentAccount.balance >= transferAmount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing transfer
        receiverAcc.movements.push(transferAmount);
        currentAccount.movements.push(-transferAmount);

        // Update UI
        updateUI(currentAccount);
    }
});

// Close Account Event Handler
btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username == currentAccount.username
        );

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }
    inputLoginUsername.value = inputLoginPin.value = '';
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some(mov => mov >= 0.1 * amount)
    ) {
        // hàm some trả về giá trị true/false nếu có bất cứ phần tử nào của mảng thỏa mãn điều kiện
        // Add movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});
console.log(movements.every(mov => mov > 0)); // Hàm every trả về giá trị true/false nếu tất cả phần tử của mảng đều thỏa mãn đk

/* Chaining methods */
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

const overalBalance2 = accounts
    .flatMap(acc => acc.movements) // Hàm flatMap = gộp hàm map và flat
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

/* Sorting Arrays */

// String
const owners = ['Janas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// Number
// console.log(movements);
// console.log(movements.sort());

// Ascending
movements.sort((a, b) => {
    if (a > b) return 1; // return > 0: (A, B) => (B, A) switch order
    if (a < b) return -1; // return < 0: (A, B) => (A, B) keep order
});

movements.sort((a, b) => a - b);
// console.log(movements);

// Descending
movements.sort((a, b) => b - a);
// console.log(movements);

// Array.from
labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', ''))
    );
    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

// Calculate sum of deposit and withdrawal
const sums = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
        // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
        sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
        return sums;
    },
    { deposits: 0, withdrawals: 0 }
        
    );

    