import { animalsData } from './database.js';

// อ่านข้อมูลสัตว์ทั้งหมด
function getAnimalsData() {
    return animalsData.animals;
}

// ค้นหาแพะจากรหัส
export function findGoatByCode(code) {
    const data = getAnimalsData();
    return data.find(animal => animal.code === code && animal.type === 'goat');
}
