'use strict';

// const oneWord = function (str) {
//     return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//     const [first, ...others] = str.split(' ');
//     return [first.toUpperCase(), ...others].join(' ');
// };

// const transformer = function (str, fn) {
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);
//     console.log(`Transformed by: ${fn.name}`);
// }; 

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// const high5 = function() {
//     console.log('👌');
// }

// document.body.addEventListener('click', high5); 

// ['Jonas', 'Martha', 'Adam'].forEach(high5);


// const greet = greeting => name => console.log(`${greeting} ${name}`);

// greet('Hi')('Helen')

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};
    

lufthansa.book(123, 'Minh Hy');
lufthansa.book(235, 'Minh Hiu');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],

}

const book = lufthansa.book;

// Does not work
// book(23, 'Sarah Williams');


// Call method
book.call(eurowings, 23, 'Sarah Williams');
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
}

// Apply method
const flightData = [383, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // ... nghĩa là trải rộng các phần tử của mảng flightData ra 

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// With event listener
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);
    this.planes++;

    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//  Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.25);
// = const addVAT = value => value + value * 0.25;

console.log(addVAT(100));

const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.25);
console.log(addVAT2(100));


