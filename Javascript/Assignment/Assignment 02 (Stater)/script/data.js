'use strict';

const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const readFile = document.getElementById('input-file');

let petArr = JSON.parse(getFromStorage("petArr", '[]'));
let petArrId = JSON.parse(getFromStorage("petArrId", '[]'));
let petAddArr = [];

exportBtn.addEventListener('click', function saveStaticDataToFile() {
    var blob = new Blob([JSON.stringify(petArr, null, "\t")],
                { type: "text/plain;charset=utf-8" });
    
    saveAs(blob, "pets.json");
});


async function readText(event) {
    const file = event.target.files.item(0)
    const text = await file.text();
    petAddArr = JSON.parse(text);
    // return petAddArr;
};

readFile.addEventListener('change', function (e) {
    readText(e);
});

importBtn.addEventListener('click', function () {
    function updatePet(item) {
        if (petArrId.includes(item.id.toString())) {
            
            petArr.splice(petArrId.findIndex((j) => j == item.id), 1); 
            petArrId.splice(petArrId.findIndex((j) => j == item.id), 1);
            
            petArr.unshift(item);
            petArrId.unshift(item.id);
        }
        else {
            
            petArr.unshift(item);
            petArrId.unshift(item.id);
        }
    };
    petAddArr.forEach(updatePet);
    saveToStorage('petArr', JSON.stringify(petArr));
    saveToStorage('petArrId', JSON.stringify(petArrId));
});

console.log(petArr);