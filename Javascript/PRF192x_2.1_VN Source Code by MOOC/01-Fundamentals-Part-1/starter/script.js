console.log(14+38)


let firstName = "Hieu";
console.log(firstName)

let country = 'Viet Nam',
    continent = 'Asian',
    population = '100 millions';

console.log(country)
console.log(continent)
console.log(population)

console.log(typeof population)


let year;
console.log(year)


// Data types
let isIsland = true,
    language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);


// let, const, var
language = 'Vietnamese';

const birthYear = 1999;

// Lab 2.6.1 - Coding Challenge #1
const heightJohn = 1.75, massJohn = 92,
      heightMark = 1.69, massMark = 78;
    
const BMIMark = massMark / heightMark**2;
const BMIJohn = massJohn / heightJohn**2;
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI)

    
// Lab 2.6.2 - Coding Challenge #2

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark.toFixed(1)}) is higher than John's! (${BMIJohn.toFixed(1)})`);
} else {
    console.log(`John's BMI (${BMIJohn.toFixed(1)}) is higher than Mark's! (${BMIMark.toFixed(1)})`);
}


// Coding Challenge #3
const scoreDolphins = (96+108+89)/3 ;
const scoreKoalas = (88+91+110)/3 ;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
    console.log('Dolphins win the trophy 🏆')
} else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
    console.log('Koalas win the trophy 🏆')
} else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100) {
    console.log('Both win the trophy!')
} else {
    console.log('No team wins the trophy')
}

// Coding Challenge #4

const bill = 310;

const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill+tip}`)

