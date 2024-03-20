'use strict';

const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');

let petArr = JSON.parse(getFromStorage("petArr", '[]'));

exportBtn.addEventListener('click', function saveStaticDataToFile() {
    var blob = new Blob([JSON.stringify(petArr, null, "\t")],
                { type: "text/plain;charset=utf-8" });
    
    saveAs(blob, "pets.json");
});

console.log(JSON.stringify(petArr, null, "\t"));
