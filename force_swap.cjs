// Script này sẽ ép hệ thống dùng Swap bằng cách chiếm dụng RAM
console.log("🚀 ĐANG BẮT ĐẦU CHIẾN DỊCH ÉP XUNG SWAP...");

let storage = [];
const MB_PER_STEP = 100; // Mỗi bước chiếm 100MB RAM

function eatRam() {
    try {
        // Tạo một mảng lớn để chiếm RAM
        const chunk = new Array(MB_PER_STEP * 1024 * 1024 / 8).fill(Math.random());
        storage.push(chunk);
        console.log(`✅ Đã chiếm thêm ${storage.length * MB_PER_STEP}MB. Hãy kiểm tra 'free -h' trên VPS!`);
        
        // Cứ mỗi 1 giây lại ăn thêm 100MB cho đến khi hệ thống dùng hết RAM thật và tràn sang Swap
        if (storage.length < 50) { // Giới hạn ăn 5GB
            setTimeout(eatRam, 1000);
        }
    } catch (e) {
        console.log("⚠️ Đã đạt giới hạn RAM vật lý. Hệ thống đang ép dữ liệu sang SWAP!");
    }
}

eatRam();
