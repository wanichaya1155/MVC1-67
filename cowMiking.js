import { findCowByCode, updateCow } from './cowModel.js';

// ตรวจสอบการเปลี่ยนแปลงเต้า
export function checkCowUdder(code) {
    const cow = findCowByCode(code);

    if (cow && cow.udders === 3 && Math.random() < 0.20) {
        cow.udders = 4;
        updateCow(code, cow);
    }
}

// กระบวนการรีดนมวัว
export function milkCow(code) {
    const cow = findCowByCode(code);

    if (!cow || cow.udders !== 4) {
        return { status: 'error', message: 'วัวตัวนี้ไม่สามารถรีดนมได้เนื่องจากไม่สมบูรณ์' };
    }

    // คำนวณน้ำนมจากอายุ
    const milkAmount = cow.age_years + (cow.age_months);

    // โอกาสที่เต้าจะลดลง 5%
    if (Math.random() < 0.05) {
        cow.udders -= 1;
        updateCow(code, cow);
    }

    return { status: 'success', milk: milkAmount, message: `รีดนมสำเร็จ ได้รับน้ำนม ${milkAmount.toFixed(2)} ลิตร` };
}