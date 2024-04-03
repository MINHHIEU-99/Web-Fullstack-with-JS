'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getContryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(Object.values(data.languages)[0]);
//     console.log(data);

//     const html = `
//         <article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//         <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
//         </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getContryData('vietnam');
// getContryData('portugal');
// getContryData('usa');

const renderCountry = function (data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
        }</p>
        </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

// const getContryAndNeighbor = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country 1
//         renderCountry(data);

//         // Get neighbor country
//         const [neighbour] = data.borders;
//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open(
//             'GET',
//             `https://restcountries.com/v3.1/alpha/${neighbour}`
//         );
//         request2.send();

//         request2.addEventListener('load', function () {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         });
//     });
// };

// getContryAndNeighbor('usa');

// const request = fetch('https://restcountries.com/v3.1/name/vietnam');
// console.log(request);

const getContryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if (!response.ok)
                throw new Error(`Country not found ${response.status})`);
            return response.json();
        })
        .then(data => {
            console.log(data);
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return;

            // fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.log(`${err} ??????`);
            renderError(`Somthing went wrong ${err.message}. Try again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

const apiKey = '255832383208431444281x75873';

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = function () {
    getPosition()
        .then(pos => {
            console.log(pos.coords);
            const { latitude: lat, longitude: lng } = pos.coords;
            return fetch(
                `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${apiKey}`
            );
        })
        .then(res => {
            if (!res.ok) throw new Error('Problem with Geolocation');
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then(res => {
            if (!res.ok) throw new Error(`Country not found (${res.status})`);
            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message}`));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

btn.addEventListener('click', whereAmI);

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lotter draw is happening');
//     setTimeout(function () {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN');
//         } else {
//             reject(new Error('You lost your money'));
//         }
//     }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};
// wait(2)
//     .then(() => {
//         console.log('I waited for 2 seconds');
//         return wait(1);
//     })
//     .then(() => console.log('I waited for 1 seconds'));

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });
    });
};
let currentImg;
createImage('img/img-1.jpg')
    .then(img => {
        currentImg = img;
        console.log('Image 1 loaded');
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(img => {
        currentImg = img;
        console.log('Image 2 loaded');
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
    })
    .catch(err => console.error(err));

