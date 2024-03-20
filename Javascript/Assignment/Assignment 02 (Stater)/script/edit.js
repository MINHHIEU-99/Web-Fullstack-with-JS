'use strict';

const sideBar = document.getElementById('sidebar');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
let vaccinatedInput = document.getElementById('input-vaccinated');
let dewormedInput = document.getElementById('input-dewormed');
let sterilizedInput = document.getElementById('input-sterilized');

const submitBtn = document.getElementById('submit-btn');
let petArr = JSON.parse(getFromStorage("petArr", '[]'));
let petArrId = JSON.parse(getFromStorage("petArrId", '[]'));
let breedArr = JSON.parse(getFromStorage('breedArr', '[]'));


/* Add sidebar animation */
sideBar.addEventListener('click', function(e) {
    sideBar.classList.toggle('active');
});

/* Edit Function */
function renderTableData(petArr) {
    document.getElementById('tbody').innerHTML = '';

    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr');

        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
                        <td>${petArr[i].name}</td>
                        <td>${petArr[i].age}</td>
                        <td>${petArr[i].type}</td>
                        <td>${petArr[i].weightPet} kg</td>
                        <td>${petArr[i].lengthPet} cm</td>
                        <td>${petArr[i].breed}</td>
                        <td>
                            <i
                                class="bi bi-square-fill"
                                style="color: ${petArr[0].color}"
                            ></i>
                        </td>
                        <td><i class="bi bi-${
                            petArr[i].vaccinated ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td><i class="bi bi-${
                            petArr[i].dewormed ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td><i class="bi bi-${
                            petArr[i].sterilized ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td>${petArr[i].date}</td>
                        <td>
                            <button
                                id='${petArr[i].id}'
                                type="button"
                                class="btn btn-warning"
                                onclick="startEditPet('${petArr[i].id}')"
                            >
                                Edit
                            </button>
                        </td>`;
        document.getElementById('tbody').appendChild(row);
    }
};
renderTableData(petArr);

/* Edit Button Handler */
function renderForm(pet, breedPet) {
    document.getElementById('container-form').classList.remove('hide');

    idInput.value = pet.id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value = pet.type;
    weightInput.value = pet.weightPet;
    lengthInput.value = pet.lengthPet;
    colorInput.value = pet.color; 
    renderBreed(breedPet);

    breedInput.value = pet.breed;
    vaccinatedInput.checked = pet.vaccinated;
    sterilizedInput.checked = pet.sterilized;
    dewormedInput.checked = pet.dewormed;
};

function startEditPet(petId) {
    let editPet = petArr.filter(pet => pet.id == petId);
    console.log(editPet);
    renderForm(editPet.at(0), breedArr);
    
};

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
    renderBreed(breedArr);
};

/* Submit Button Handler */
submitBtn.addEventListener('click', function () {
    const data = {
        id: idInput.value.toString(),
        name: nameInput.value,
        age: ageInput.value,
        type: typeInput.value,
        weightPet: weightInput.value,
        lengthPet: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    };
    console.log(data);
    /* Hàm validate dữ liệu đầu vào */
    function validateData(data) {
        if (data.name == '') {
            alert('Name must be filled out');
            return false;
        }
        if (data.age == '') {
            alert('Age must be filled out');
            return false;
        }
        if (data.age > 15 || data.age < 1) {
            alert('Age must be between 1 and 15!');
            return false;
        }
        if (data.type == 'Select Type') {
            alert('Please select Type!');
            return false;
        }
        if (data.weightPet == '') {
            alert('Weight must be filled out');
            return false;
        }
        if (data.weightPet > 15 || data.weightPet < 1) {
            alert('Weight must be between 1 and 15!');
            return false;
        }

        if (data.lengthPet == '') {
            alert('Length must be filled out');
            return false;
        }
        if (data.lengthPet > 100 || data.lengthPet < 1) {
            alert('Length must be between 1 and 100!');
            return false;
        }
        if (data.breed == 'Select Breed') {
            alert('Please select Breed!');
            return false;
        } else return 1;
    }

    /* Formatting Date - chuyển về định dạng tháng-ngày-năm */
    function formatDate(ti) {
        const dateDIc = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        };
        let x = ti.toString().split(' '); //tách chuỗi để lấy được các phần tử của chuỗi
        let y = [dateDIc[x[1]], x[2], x[3]];

        return y.join('/');
    }

    /* CLEAR INPUT FORM */
    function clearInput() {
        document.getElementById('container-form').classList.add('hide');
    }

    /* VALIDATE INPUT AND RENDER PET*/
    const validate = validateData(data);
    if (validate) {
        data.date = formatDate(data.date);
        updateData(data);
        clearInput();
    }
});

const updateData = newData => {
    petArr.splice(petArrId.findIndex((id) => id == newData.id), 1); // Hàm findIndex nhận đầu vào là 1 function, hàm splice thực hiện loại bỏ phần tử có id mong muốn
    petArrId.splice(petArrId.findIndex((id) => id == newData.id), 1);

    petArr.unshift(newData);
    petArrId.unshift(newData.id);

    saveToStorage('petArr', JSON.stringify(petArr));
    saveToStorage('petArrId', JSON.stringify(petArrId));

    renderTableData(petArr);
};