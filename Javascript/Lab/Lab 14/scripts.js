const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');
const form =document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');

const apiKey = '24ec782e9b1346338b854701240104';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputVal = input.value;
    
    /* Your code: check list arrays */

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    // const url = `http://api.weatherapi.com/v1/current.json?key=<${apiKey}>&q=<${inputVal}>`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;

            /* Your code: process element */
            console.log(name);
        })
        .catch((err) => {
            msg.textContent = 'Please search for a valid city';
            console.log(err.message);
        });

    msg.textContent = '';
    form.reset();
    input.focus();
});
