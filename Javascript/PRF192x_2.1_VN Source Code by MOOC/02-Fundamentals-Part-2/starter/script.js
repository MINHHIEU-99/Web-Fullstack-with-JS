'use strict'

let hasDrivesLicense = false;
const passTest = true;

if (passTest) hasDrivesLicense = true;
if (hasDrivesLicense) console.log('I can drive')

function calcSum(a, b) {
    const sumOfTwoNum = a + b;
    return sumOfTwoNum;
}

const s = calcSum(3, 5);
console.log(s)

// Function Declarations
function calcAge1(birthYear) {
    return 2023 - birthYear;
}
const age1 = calcAge1(1996);
console.log(age1);

// Function Expressions
const calcAge2 = function(birthYear) {
    return 2023 - birthYear;
}
const age2 = calcAge2(1996);
console.log(age2)

// Arrow Function
const calcAge3 = birthYear => 2023 - birthYear;
const age3 = calcAge3(1996);
console.log(age3);

const yearUntilRetirement = birthYear => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    return retirement;
}

const re = yearUntilRetirement(1996);
console.log(re)

const friends = ['Jonas', 'Steve', 'Peter', 'Jane'];
const newLength = friends.shift();
console.log(newLength);
console.log(friends)

console.log(friends.indexOf('Henry'))
console.log(friends.includes('Jane'))

// Lab 4.1
function describeCountry(country, population, capitalCity) {
    return console.log(`${country} has ${population} million people and its capital city is ${capitalCity}.`)
}

const vietNam = describeCountry('Viet Nam', '90', 'Ha Noi')

// Lab 4.2
function percentageOfWorld1(population) {
    const percentage = (population*100/7.9).toFixed(1);
    console.log(`Trung Quốc có ${population} tỷ người, chiếm ${percentage}% dân số thế giới.`)
    return percentage;
}
const percentageOfChina1 = percentageOfWorld1(1.441)

const percentageOfWorld2 = function(population) {
    const percentage = (population*100/7.9).toFixed(1);
    console.log(`Trung Quốc có ${population} tỷ người, chiếm ${percentage}% dân số thế giới.`)
    return percentage;
}

const percentageOfChina2 = percentageOfWorld2(1.441);

// Lab 4.3
const percentageOfWorld3 = population => {
    const percentage = (population*100/7.9).toFixed(1);
    console.log(`Trung Quốc có ${population} tỷ người, chiếm ${percentage}% dân số thế giới.`)
    return percentage;
}

const percentageOfChina3 = percentageOfWorld3(1.441)

// Lab 4.4
function describePopulation(country, population) {
    const percentage = percentageOfWorld1(population);
    return console.log(`${country} has ${population*1000} million people, which is about ${percentage}% of the world.`)
}

const describePopulationOfChina = describePopulation('China', 1.441);

//  Lab 4.5
const populations = new Array(1.441, 0.9, 0.5, 1.2);
console.log(populations)

if (populations.length == 4) console.log(true)

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])]

console.log(percentages) 

// Lab 4.6
const neighbours = ['Thai', 'Laos', 'Campuchia'];
neighbours.push('Utopia');
console.log(neighbours)
neighbours.pop();
console.log(neighbours);

if (neighbours.includes('Germany')) {
    
} else console.log('Probably not a central European country :D')

neighbours[neighbours.indexOf('Thai')] = 'ThaiLand';
console.log(neighbours);

// Lab 4.7.1
function calcAverage(num1, num2, num3) {
    return (num1 + num2 + num3)/3 ;
}

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (2*avgKoalas)) {
        return console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= (2*avgDolphins)) {
        console.log(avgDolphins);
        return console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    }
} 

const averageOfDolphins = calcAverage(85, 54, 41);
const averageOfKoalas = calcAverage(23, 34, 27);

checkWinner(averageOfDolphins, averageOfKoalas);

// Lab 4.7.2
const calcTip = function(bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2; 
}
let bills = [125, 555, 44];
let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
let total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, total);

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDrivesLicense: true,

    calcAge: function () {
        this.age = 2023 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old teacher, and he has ${this.hasDrivesLicense ? 'a' : 'no'} driver's license`
    }
}

console.log(jonas.getSummary());

for(let rep = 1; rep <= 10; rep++) {
     console.log(rep);
}

// Lab 5.1
const myCountry = {
    country: 'Viet Nam',
    capital: 'Ha Noi',
    language: 'vietnamese',
    population: 91,
    neighbours: ['Laos', 'ThaiLand', 'Campuchia'],

    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, 3 neighbouring countries and a capital called ${this.capital}.`)
    },

    checkIsland: function () {
        this.isIsland = this.neighbours.length === 0 ? true : false;
    }
}
console.log(myCountry)

// Lab 5.2
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, 3 neighbours countries and a capital called ${myCountry.capital}.`);

myCountry.population += 2;
myCountry['population'] -= 2;

// Lab 5.3
myCountry.describe();
myCountry.checkIsland();

// Lab 5.4
for(let i = 1; i <= 50; i++) {
    console.log(`Voter number ${i} is currently voting.`)
}

// Lab 5.5
const percentage2 = [];
for(let j = 0; j < populations.length; j++) {
    percentage2[j] = percentageOfWorld1(populations[j]);
}
console.log(percentage2);


// Lab 5.6
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
for(let i = 0; i < listOfNeighbours.length; i++) {
    if (listOfNeighbours[i].length >= 2) {
        for(let j = 1; j < listOfNeighbours[i].length; j++) {
            console.log(listOfNeighbours[i][j]);
        }
    }
}

// Lab 5.7
const percentage3 = [];
let i = 0;
while (i < populations.length) {
    percentage3[i] = percentageOfWorld1(populations[i]);
    i++;
}
console.log(percentage3)

// Lab 5.8.1
const markMiller = {
    fullname: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        return (this.mass/(this.height ** 2)).toFixed(1);
    }
}
const johnSmith = {
    fullname: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        return (this.mass/(this.height ** 2)).toFixed(1);
    }
}

johnSmith.calcBMI() > markMiller.calcBMI() ? console.log(`John's BMI (${johnSmith.calcBMI()}) is higher than Marks's (${markMiller.calcBMI()})`) :      console.log(`Mark's BMI (${markMiller.calcBMI()}) is higher than John's (${johnSmith.calcBMI()})`);


// Lab 5.8.2
const billss = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipss = [];
const totals = [];

for(let i = 0; i < 10; i++) {
    tipss.push(calcTip(billss[i]));
    totals.push(billss[i] + calcTip(billss[i]));
}
console.log(tipss)

function calcAverage(arr) {
    let s = 0;
    for(let i = 0; i < arr.length; i++){
        s += arr[i];
    }
    return s/arr.length ;
}

console.log(calcAverage(totals))