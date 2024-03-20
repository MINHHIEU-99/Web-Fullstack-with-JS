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
function renderTableData(petArr) {
    document.getElementById('tbody').innerHTML = '';

    for (let i = 0, petsId = new Set(); i < petArr.length; i++) {
        if (petArr[i].length > 0) {
            const renderPets = (arr) => {
                if (!petsId.has(arr.id.toString())) {
                    const row = document.createElement('tr');
                    row.innerHTML = `<th scope="row">${arr.id}</th>
                                <td>${arr.name}</td>
                                <td>${arr.age}</td>
                                <td>${arr.type}</td>
                                <td>${arr.weightPet} kg</td>
                                <td>${arr.lengthPet} cm</td>
                                <td>${arr.breed}</td>
                                <td>
                                    <i
                                        class="bi bi-square-fill"
                                        style="color: ${arr.color}"
                                    ></i>
                                </td>
                                <td><i class="bi bi-${
                                    arr.vaccinated ? 'check' : 'x'
                                }-circle-fill"></i></td>
                                <td><i class="bi bi-${
                                    arr.dewormed ? 'check' : 'x'
                                }-circle-fill"></i></td>
                                <td><i class="bi bi-${
                                    arr.sterilized ? 'check' : 'x'
                                }-circle-fill"></i></td>
                                <td>${arr.date}</td>`;
                    document.getElementById('tbody').appendChild(row);
                    petsId.add(arr.id);
                };
            };
            petArr[i].forEach(renderPets);
            
        };
    };
};

function searchPet(arr, arr2) {  
    let pets = [];

    arr2.type == 'Select Type' ? arr2.type = '' : arr2.type;
    arr2.breed == 'Select Breed' ? arr2.breed = '' : arr2.breed;

    pets.push(arr.filter(pet => pet.id.includes(arr2.id) && pet.name.includes(arr2.name) && pet.type.includes(arr2.type) && pet.breed.includes(arr2.breed)
                         && (arr2.vaccinated ? (pet.vaccinated && arr2.vaccinated) : true)
                         && (arr2.sterilized ? (pet.sterilized && arr2.sterilized) : true)
                         && (arr2.dewormed ? (pet.dewormed && arr2.dewormed) : true)
    ));
    return pets;
};

findBtn.addEventListener('click', function() {
    let data = {
        id: idInput.value.toString(),
        name: nameInput.value,
        type: typeInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
    };
    // console.log(data);
    const result = searchPet(petArr, data);

    renderTableData(result);

});

/* Render Breed */
function renderBreed(breedArr) {
    document.getElementById('input-breed').innerHTML = '<option>Select Breed</option>'; 

    const breedType = breedArr.filter(el => el.type == typeInput.value);
    if (breedType.length == 0) return;

    for (let i = 0; i < breedType.length; i++) {
        const option = document.createElement('option');
        
        option.innerHTML = `<option>${breedType[i].name}</option>`;
        breedInput.appendChild(option);
    }
};

typeInput.onchange = function () {
    let breedArr = JSON.parse(getFromStorage('breedArr', '[]'));
    renderBreed(breedArr);
};