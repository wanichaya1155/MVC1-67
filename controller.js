import { findCowByCode} from './cowModel.js';
import { checkCowUdder, milkCow} from './cowMiking.js';
import { findGoatByCode } from './goatModel.js';

// ตรวจสอบประเภทสัตว์
export function checkAnimal(code) {
     // ตรวจสอบว่ารหัสเป็นตัวเลข 8 ไหม
    if (!/^[1-9]\d{7}$/.test(code)) {
        return { status: 'error', message: 'รหัสสัตว์ต้องมี 8 หลักที่เริ่มต้นด้วยเลข 1-9' };
    }

    const cow = findCowByCode(code);
    const goat = findGoatByCode(code);

    if (cow) {
        return { status: 'cow', cow };
    }

    if (goat) {
        return { status: 'goat', message: 'นี่คือแพะ! เตรียมส่งกลับภูเขา' };
    }

    return { status: 'error', message: 'ไม่พบข้อมูลสัตว์นี้ในฐานข้อมูล' };
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const code = document.getElementById('animalCode').value;
    const resultDiv = document.getElementById('result');
    // ตรวจสอบประเภทสัตว์
    const animalResult = checkAnimal(code);
    
    if (animalResult.status === 'error') {
        resultDiv.innerHTML = `<p style="color: red;">${animalResult.message}</p>`;
    } else if (animalResult.status === 'goat') {
        window.location.href = `goatPage.html?message=${encodeURIComponent(animalResult.message)}`;
        
    } else if (animalResult.status === 'cow') {
        const cow = animalResult.cow;
        
        if (cow.udders === 4) {
            // ถามผู้ใช้เกี่ยวกับการรีดนมวัว
            if (confirm('ต้องการรีดนมวัวหรือไม่?')) {
                const milkResult = milkCow(code);
                window.location.href = `cowPage.html?message=${encodeURIComponent(milkResult.message)}`;
                
                // ตรวจสอบการเปลี่ยนแปลงเต้า
                checkCowUdder(code);
            }
            
        } else {
            window.location.href = `cowPage.html?message=${encodeURIComponent('วัวตัวนี้ไม่สามารถรีดนมได้เนื่องจากมีเต้านมไม่ครบ 4 เต้า')}`
        }
        chaseGoatBtn.style.display = 'none'; // ซ่อนปุ่มไล่แพะ
    }
});
// ฟังก์ชันสำหรับแสดงข้อความในหน้าแพะ
export function showGoatMessage(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: blue;">${message}</p>`;
}

export function setupGoatButton() {
    document.getElementById('chaseGoatBtn').addEventListener('click', function() {
        showGoatMessage('ไล่แพะเรียบร้อย');
    });
}

function resetForm() {
    document.getElementById('animalCode').value = '';
    document.getElementById('result').innerHTML = '';
}