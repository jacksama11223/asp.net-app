class DocumentViewer {
    constructor() {
        this.createModal();
    }

    createModal() {
        if (document.getElementById('smartlms-document-viewer-modal')) return;

        const modalHtml = `
            <div id="smartlms-document-viewer-modal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300">
                <div class="relative w-[95%] h-[95%] max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden scale-95 transition-transform duration-300" id="smartlms-document-viewer-container">
                    
                    <!-- Header -->
                    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                        <div class="flex items-center gap-3">
                            <div id="viewer-icon-wrapper" class="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                <i data-lucide="file" id="viewer-icon" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 id="viewer-title" class="font-bold text-slate-800 text-lg leading-tight truncate max-w-lg">Loading...</h3>
                                <p id="viewer-subtitle" class="text-xs text-slate-500 font-medium"></p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <a id="viewer-download-btn" href="#" target="_blank" class="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-colors" title="Tải xuống">
                                <i data-lucide="download" class="w-5 h-5"></i>
                            </a>
                            <button id="viewer-close-btn" class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors" title="Đóng">
                                <i data-lucide="x" class="w-6 h-6"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Content Area -->
                    <div id="viewer-content-area" class="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                        <div id="viewer-loading" class="absolute inset-0 flex items-center justify-center bg-white z-10">
                            <i data-lucide="loader-2" class="w-8 h-8 text-cyan-600 animate-spin"></i>
                        </div>
                        <div id="viewer-render-zone" class="w-full h-full flex items-center justify-center">
                            <!-- Rendered content goes here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        if (window.lucide) lucide.createIcons();

        this.modal = document.getElementById('smartlms-document-viewer-modal');
        this.container = document.getElementById('smartlms-document-viewer-container');
        this.closeBtn = document.getElementById('viewer-close-btn');
        this.downloadBtn = document.getElementById('viewer-download-btn');
        this.title = document.getElementById('viewer-title');
        this.subtitle = document.getElementById('viewer-subtitle');
        this.renderZone = document.getElementById('viewer-render-zone');
        this.loading = document.getElementById('viewer-loading');

        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    async open(attachmentId) {
        // Mở Modal lên ngay
        this.modal.classList.remove('opacity-0', 'pointer-events-none');
        this.container.classList.remove('scale-95');
        this.container.classList.add('scale-100');
        this.loading.classList.remove('hidden');
        this.renderZone.innerHTML = '';
        this.title.textContent = 'Đang tải thông tin...';
        this.subtitle.textContent = '';
        this.downloadBtn.href = '#';

        try {
            // Lấy metadata
            const metaRes = await fetch(`/api/AttachmentApi/metadata/${attachmentId}`);
            if (!metaRes.ok) throw new Error('Không tìm thấy tài liệu');
            const meta = await metaRes.json();

            this.title.textContent = meta.fileName;
            this.subtitle.textContent = `${(meta.fileSize / 1024 / 1024).toFixed(2)} MB • ${new Date(meta.uploadedAt).toLocaleString('vi-VN')}`;
            this.downloadBtn.href = `/api/AttachmentApi/view/${attachmentId}`; // Hoặc link download thực tế
            
            this.renderContent(attachmentId, meta.fileType);
        } catch (error) {
            this.title.textContent = 'Lỗi truy cập';
            this.subtitle.textContent = error.message;
            this.loading.classList.add('hidden');
        }
    }

    renderContent(id, fileType) {
        const url = `/api/AttachmentApi/view/${id}`;
        let html = '';

        fileType = fileType.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)) {
            html = `<img src="${url}" class="max-w-full max-h-full object-contain shadow-lg" alt="Image Viewer" />`;
        } else if (fileType === 'pdf') {
            html = `<iframe src="${url}" class="w-full h-full border-none"></iframe>`;
        } else if (['txt', 'json', 'cs', 'js', 'html', 'css'].includes(fileType)) {
            // Render text
            html = `<iframe src="${url}" class="w-full h-full border-none bg-white"></iframe>`;
        } else {
            // Unhandled types
            html = `
                <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <i data-lucide="file-warning" class="w-16 h-16 text-amber-500 mx-auto mb-4"></i>
                    <h4 class="text-lg font-bold text-slate-800">Không hỗ trợ xem trực tiếp</h4>
                    <p class="text-sm text-slate-500 mt-2 mb-6">Định dạng file này không thể mở trên trình duyệt. Vui lòng tải xuống để xem.</p>
                    <a href="${url}" class="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-cyan-700 transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i> Tải Xuống Ngay
                    </a>
                </div>
            `;
        }

        this.renderZone.innerHTML = html;
        if (window.lucide) lucide.createIcons({ root: this.renderZone });
        
        // Ẩn loading
        setTimeout(() => this.loading.classList.add('hidden'), 500);
    }

    close() {
        this.modal.classList.add('opacity-0', 'pointer-events-none');
        this.container.classList.remove('scale-100');
        this.container.classList.add('scale-95');
        // Xóa content để dừng phát video/audio nếu có
        setTimeout(() => {
            this.renderZone.innerHTML = '';
        }, 300);
    }
}

// Khởi tạo global
document.addEventListener('DOMContentLoaded', () => {
    window.documentViewer = new DocumentViewer();
    
    // Thêm event delegation cho tất cả các nút có class .attachment-viewer-btn
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.attachment-viewer-btn');
        if (btn) {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            if (id) {
                window.documentViewer.open(id);
            }
        }
    });
});
