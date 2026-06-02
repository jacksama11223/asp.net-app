const url = 'http://141.253.114.218:3080/hub/resources';
fetch(url).then(res => res.text()).then(html => {
    const hasModal = html.includes('viewingPdf = true');
    const hasLink = html.includes('href="/hub/resources/');
    console.log('✅ Có chứa link ID mới (href="/hub/resources/ID"):', hasLink);
    console.log('✅ Đã xóa logic popup cũ (viewingPdf):', !hasModal);
    if(hasLink && !hasModal) {
        console.log('KẾT LUẬN: Giao diện ĐÃ ĐƯỢC CẬP NHẬT thành công! Không còn popup modal, toàn bộ là thẻ <a> chuyển hướng.');
    } else {
        console.log('LỖI: Giao diện chưa cập nhật!');
    }
}).catch(console.error);
