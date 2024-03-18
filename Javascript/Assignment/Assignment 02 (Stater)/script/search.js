'use strict';

const sideBar = document.getElementById('sidebar');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const findBtn = document.getElementById('find-btn');


let petArr = JSON.parse(getFromStorage("petArr", '[]'));
let petArrId = JSON.parse(getFromStorage("petArrId", '[]'));


/* Add sidebar animation */
sideBar.addEventListener('click', function(e) {
    sideBar.classList.toggle('active');
});

/* Search Engine */
findBtn.addEventListener('click', function() {
    const data = {
        id: idInput.value.toString(),
        name: nameInput.value,
        type: typeInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
    };
    const result = searchPet(petArr, data);
    console.log(data.id);
    // console.log(result);
});

function searchPet(arr, arr2) {  
    let pet = [];
    if (arr2.id !== '') {
        console.log(1);
        pet.push(arr.filter(pet => pet.id.includes(arr2.id) == true));
        console.log(pet);
    };
    if (arr2.name !== '') {

    }
    
}