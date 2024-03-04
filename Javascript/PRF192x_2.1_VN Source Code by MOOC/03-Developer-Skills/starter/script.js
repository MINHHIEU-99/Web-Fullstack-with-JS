// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Lab 6
function printForecast(arr) {
    let str = '';
    // console.log(typeof str);

    for (let i = 0; i < arr.length; i++) {
        if (i >= 1) str += `${arr[i]}ºC in ${i + 1} days ... `;
        else str += `${arr[i]}ºC in ${i + 1} day ... `;
    }
    return str;
}
const str = printForecast([12, 5, -5, 0, 5]);
console.log(str);
