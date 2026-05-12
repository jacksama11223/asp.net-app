const axios = require('axios');

const LB_URL = 'http://141.253.114.218/api/public/courses';

async function verify() {
    console.log(`\n🔍 ĐANG KIỂM CHỨNG LOAD BALANCING TRÊN 5 CỔNG...`);
    console.log(`📡 Gửi 20 yêu cầu liên tục tới: ${LB_URL}\n`);

    const nodes = new Set();
    const stats = {};

    for (let i = 0; i < 20; i++) {
        try {
            // Thêm t=${Date.now()} để phá băng cache, buộc server trả về ID thật
            const res = await axios.get(`${LB_URL}?t=${Date.now()}_${i}`, { timeout: 10000 });
            const nodeName = res.data.serverNode || 'Unknown';
            nodes.add(nodeName);
            stats[nodeName] = (stats[nodeName] || 0) + 1;
            process.stdout.write(`.`);
        } catch (e) {
            process.stdout.write(`x`);
        }
    }

    console.log(`\n\n======================================================`);
    console.log(`🏁 KẾT QUẢ KIỂM CHỨNG:`);
    console.log(`✅ Tìm thấy tổng cộng: ${nodes.size} bản sao đang hoạt động.`);
    
    console.log(`\n📊 Chi tiết phân bổ yêu cầu:`);
    Object.keys(stats).forEach(node => {
        console.log(`   - Container [${node}]: xử lý ${stats[node]} yêu cầu`);
    });

    if (nodes.size >= 5) {
        console.log(`\n🎉 TUYỆT VỜI! Load Balancer đã nhận diện đủ 5 bản sao.`);
    } else {
        console.log(`\n⚠️ LƯU Ý: Mới thấy ${nodes.size}/5 bản sao. Có thể do thuật toán 'least_conn' đang ưu tiên các máy rảnh hơn.`);
    }
    console.log(`======================================================\n`);
}

verify();
