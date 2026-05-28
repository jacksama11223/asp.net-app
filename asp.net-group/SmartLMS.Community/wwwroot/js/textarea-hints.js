document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các textarea trên trang
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        // Tạo container bọc textarea để chứa hint
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.flex = '1';
        wrapper.style.width = '100%';
        wrapper.className = textarea.className;
        
        // Loại bỏ class khỏi textarea để wrapper kế thừa, 
        // nhưng giữ lại padding, font để hint khớp vị trí.
        textarea.className = 'w-full h-full bg-transparent border-none outline-none resize-none z-10 relative';
        
        // Hint element
        const hint = document.createElement('div');
        hint.style.position = 'absolute';
        hint.style.top = '0';
        hint.style.left = '0';
        hint.style.right = '0';
        hint.style.bottom = '0';
        hint.style.pointerEvents = 'none'; // Không cản trở click
        hint.style.color = '#94a3b8'; // text-slate-400
        hint.style.zIndex = '1';
        hint.style.overflow = 'hidden';
        hint.style.padding = window.getComputedStyle(textarea).padding;
        hint.style.fontFamily = window.getComputedStyle(textarea).fontFamily;
        hint.style.fontSize = window.getComputedStyle(textarea).fontSize;
        hint.style.lineHeight = window.getComputedStyle(textarea).lineHeight;
        hint.style.whiteSpace = 'pre-wrap';
        hint.style.wordBreak = 'break-word';

        textarea.parentNode.insertBefore(wrapper, textarea);
        wrapper.appendChild(hint);
        wrapper.appendChild(textarea);

        // Lắng nghe sự kiện gõ phím
        textarea.addEventListener('input', () => {
            const val = textarea.value;
            if (val.length === 0) {
                hint.innerHTML = '';
            } else if (val.endsWith('[')) {
                // Hiển thị gợi ý khi gõ [
                hint.innerHTML = val + '<span class="text-slate-300 bg-slate-100 rounded px-1">[ Nhập ID để liên kết: QA:1, Event:2, Group:3 ]</span>';
            } else {
                hint.innerHTML = '';
            }
        });
    });
});
