'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (fullName, birthYear) {
    // Instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;

    // Never to this!
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(jonas instanceof Person);

Person.hey = function () {
    console.log('Hey there 👋');
    //   console.log(this);
};
Person.hey();

/**************************** PROTOTYPES ****************************/
Person.prototype.calcAge = function () {
    console.log(2024 - this.birthYear);
};
jonas.calcAge();
// console.log(jonas.__proto__);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(Person));

// . prototypesOfLinkedObjects
Person.prototype.species = 'Homo Sapiens';

// console.log(jonas.hasOwnProperty('firstName'));

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCL {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(2024 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.firstName}`);
    }

    get age() {
        return 2024 - this.birthYear;
    }

    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log('Hey there');
    }
}

const jessica = new PersonCL('Jessica Davis', 1996);
jessica.calcAge();
jessica.greet();
console.log(jessica);

class StudentCL extends PersonCL {
    constructor(fullName, birthYear, course) {
        // Always needs to happen first !
        super(fullName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`Hi I'm ${this.fullName}`);
    }

    calcAge() {
        console.log(
            `I'm ${
                2024 - this.birthYear
            } years old but as a student I feel like I'm ${
                2034 - this.birthYear
            } years old.`
        );
    }
}

const martha = new StudentCL('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

//////////////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonPhoto = {
    calcAge() {
        console.log(2024 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonPhoto);

const StudentPhoto = Object.create(PersonPhoto);
StudentPhoto.init = function (firstName, birthYear, course) {
    PersonPhoto.init.call(this, firstName, birthYear);
    this.course = course;
};
StudentPhoto.introduce = function () {
    console.log(`Hi I'm ${this.fullName}`);
};

const jay = Object.create(StudentPhoto);
jay.init('Jay', 2010, 'IT');
jay.calcAge();

////////////////////////////////
class Account {
    // Public field (instances)
    locale = navigator.language;

    // Private field (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // Protected Property
        this.#pin = pin;
    }

    // Public methods
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdrawal(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan Approved`);
        }
        return this;
    }

    // Private methods
    _approveLoan(val) {
        return true;
    }

    // Static method
    static helper() {
        console.log('Help');
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdrawal(140);
acc1.requestLoan(1000);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));
acc1.deposit(200).deposit(300).withdrawal(100).requestLoan(2000);
console.log(acc1.getMovements());
