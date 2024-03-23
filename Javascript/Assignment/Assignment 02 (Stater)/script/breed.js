'use strict';

const sideBar = document.getElementById('sidebar');
const submitBtn = document.getElementById('submit-btn');
const nameBreedInput = document.getElementById('input-breed');
const typeBreedInput = document.getElementById('input-type');

let breedArr = JSON.parse(getFromStorage("breedArr", '[]'));

renderBreedTable(breedArr);


function renderBreedTable(breedArr) {
    document.getElementById('tbody').innerHTML = '';

    for (let i = 0; i < breedArr.length; i++) {
        const row = document.createElement('tr');

        row.innerHTML = `<th scope="row">${i + 1}</th>
                        <td>${breedArr[i].name}</td>
                        <td>${breedArr[i].type}</td>
                        <td>
                            <button
                                id='${i}'
                                type="button"
                                class="btn btn-danger"
                                onclick="deleteBreed('${i}')"
                            >
                                Delete
                            </button>
                        </td>`;
        document.getElementById('tbody').appendChild(row);
    }
};
// DELETE BREED //
const deleteBreed = breedId => {
    if (confirm('Are you sure?')) {
        breedArr.splice(breedId, 1);  
        // console.log(breedArr);
        saveToStorage('breedArr', JSON.stringify(breedArr));
        renderBreedTable(breedArr); // Hiển thị lại danh sách thú cưng khi đã xóa thú cưng cần thiết
    }
};


/* Add sidebar animation */
sideBar.addEventListener('click', function(e) {
    sideBar.classList.toggle('active');
});


/* Submit Button Handler */
submitBtn.addEventListener('click', function () {
    const dataBreed = {
        name: nameBreedInput.value,
        type: typeBreedInput.value,
    };

    function validateData(data) {
        if (data.name == '') {
            alert('Name must be filled out');
            return false;
        }
        if (data.type == 'Select Type') {
            alert('Please select Type!');
            return false;
        } 
        else return 1;
    }

    /* CLEAR INPUT FORM */
    function clearInput() {
        document.getElementById('breedForm').reset();
    }

    /* VALIDATE INPUT AND RENDER BREED */
    const validate = validateData(dataBreed);
    if (validate) {
        breedArr.push(dataBreed);
        // saveToStorage('breedArr', JSON.stringify(breedArr));
        clearInput();
        renderBreedTable(breedArr);
    }
});