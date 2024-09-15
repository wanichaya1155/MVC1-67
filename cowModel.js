import { animalsData } from './database.js';

// อ่านข้อมูลสัตว์ทั้งหมด
function getAnimalsData() {
    return animalsData.animals;
}

// ค้นหาวัวจากรหัส
export function findCowByCode(code) {
    const data = getAnimalsData();
    return data.find(animal => animal.code === code && animal.type === 'cow');
}

// อัปเดตข้อมูลวัว
export function updateCow(code, updateData) {
    let data = getAnimalsData();
    const animalIndex = data.findIndex(animal => animal.code === code && animal.type === 'cow');
    if (animalIndex !== -1) {
        data[animalIndex] = { ...data[animalIndex], ...updateData };
    }
}


