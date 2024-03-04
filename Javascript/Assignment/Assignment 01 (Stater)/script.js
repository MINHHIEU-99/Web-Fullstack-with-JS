'use strict';

const submitBtn = document.getElementById('submit-btn');
const healthyBtn = document.getElementById('healthy-btn');
const deleteBtn = document.getElementById('delete-btn');
const bmiBtn = document.getElementById('bmi-btn');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

let petArr = [];
let petArrId = [];
let healthyCheck = false;
let bmiValue = [];

/* ADD PET AND RENDER THEM */
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
                        <td><i class="bi">${bmiValue[i]}</i></td>
                        <td>${petArr[i].date}</td>
                        <td>
                            <button
                                id='${petArr[i].id}'
                                type="button"
                                class="btn btn-danger"
                                onclick="deletePet('${petArr[i].id}')"
                            >
                                Delete
                            </button>
                        </td>`;
        document.getElementById('tbody').appendChild(row);
    }
}

/* Bắt sự kiện với nút Submit */
submitBtn.addEventListener('click', function () {

    const data = {
        id: idInput.value,
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

    /* Hàm validate dữ liệu đầu vào */
    function validateData(data) {
        if (data.id == '') {
            alert('ID must be filled out');
            return false;
        }
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
        document.getElementById('myForm').reset();
        colorInput.value = '#000000';
    }

    /* VALIDATE INPUT AND RENDER PET*/
    const validate = validateData(data);
    if (validate) {
        data.date = formatDate(data.date);
        petArr.push(data);
        petArrId.push(data.id);
        bmiValue.push('?');
        clearInput();
        renderTableData(petArr);
    }
});

/* DELETE PET */
const deletePet = petId => {
    function checkId() {
        return id == petId;
    }
    if (confirm('Are you sure?')) {
        petArr.splice(petArrId.findIndex(checkId), 1); // Hàm findIndex nhận đầu vào là 1 function, hàm splice thực hiện loại bỏ phần tử có id mong muốn
        petArrId.splice(petArrId.findIndex(checkId), 1);
        renderTableData(petArr); // Hiển thị lại danh sách thú cưng khi đã xóa thú cưng cần thiết
    }
};

/* SHOW HEALTHY PET */
healthyBtn.addEventListener('click', function () {
    let healthyPetArr = petArr.filter(
        pet =>
            pet.vaccinated == true &&
            pet.dewormed == true &&
            pet.sterilized == true
    );

    healthyCheck = !healthyCheck; // Khi nhấn Show Healthy Pet, cờ healthy check sẽ đổi trạng thái từ false thành true và thực hiện show, khi ta nhấn lại lần nữa cờ sẽ quay về    trạng thái false và tắt chế độ show healthy pet

    document.getElementById('healthy-btn').textContent =
        healthyCheck == true ? 'Show All Pet' : 'Show Healthy Pet';
    healthyPetArr = healthyPetArr.filter(healthyPet => healthyCheck == true);
    renderTableData(healthyCheck == true ? healthyPetArr : petArr);
});

/* CALCULATE BMI VALUE */
bmiBtn.addEventListener('click', function () {
    function calBMI(petArr) {
        let bmi;
        if (petArr.type == 'dog') {
            bmi = (
                (parseInt(petArr.weightPet) * 703) /
                parseInt(petArr.lengthPet) ** 2
            ).toFixed(2);
        } else bmi = ((parseInt(petArr.weightPet) * 886) / parseInt(petArr.lengthPet) ** 2).toFixed(2);
        return bmi;
    }

    for (let i = 0; i < petArr.length; i++) {
        bmiValue[i] = calBMI(petArr[i]);
    }
    renderTableData(petArr);
});
