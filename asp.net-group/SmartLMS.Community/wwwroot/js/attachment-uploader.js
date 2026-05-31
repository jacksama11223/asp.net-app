class AttachmentUploader {
    constructor(inputId, previewZoneId) {
        this.input = document.getElementById(inputId);
        this.previewZone = document.getElementById(previewZoneId);
        this.uploadedIds = [];
        
        if (this.input) {
            this.input.addEventListener('change', (e) => this.handleUpload(e.target.files));
        }
    }

    async handleUpload(files) {
        if (!files || files.length === 0) return;
        
        for (let file of files) {
            if (file.size > 15 * 1024 * 1024) {
                if (window.showToast) window.showToast('❌ File ' + file.name + ' vượt quá 15MB!');
                else alert('❌ File ' + file.name + ' vượt quá 15MB!');
                continue;
            }
            
            // 1. Tạo thẻ UI Loading
            const fileCard = document.createElement('div');
            fileCard.className = 'relative flex items-center p-3 mt-2 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden';
            fileCard.innerHTML = `
                <i data-lucide="file" class="w-5 h-5 text-slate-400 mr-3 z-10"></i>
                <div class="flex-1 z-10">
                    <p class="text-xs font-bold text-slate-700 truncate">${file.name}</p>
                    <p class="text-[10px] text-slate-400 upload-status">Đang tải... 0%</p>
                </div>
                <!-- Thanh tiến trình chạy ngầm bên dưới -->
                <div class="absolute left-0 top-0 bottom-0 bg-cyan-100/50 transition-all duration-200 ease-out progress-bar" style="width: 0%"></div>
            `;
            this.previewZone.appendChild(fileCard);
            if(window.lucide) lucide.createIcons({root: fileCard});
            
            // 2. Gọi API với XMLHttpRequest để lấy được số % Upload
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('file', file);
            
            const progressBar = fileCard.querySelector('.progress-bar');
            const statusText = fileCard.querySelector('.upload-status');
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    progressBar.style.width = percent + '%';
                    statusText.textContent = `Đang tải... ${percent}%`;
                }
            });
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.uploadedIds.push(res.id); // Updated to res.id according to the API
                    
                    progressBar.classList.replace('bg-cyan-100/50', 'bg-emerald-100/50');
                    statusText.innerHTML = '<span class="text-emerald-600">✅ Hoàn tất</span>';
                } else {
                    progressBar.classList.replace('bg-cyan-100/50', 'bg-red-100/50');
                    statusText.innerHTML = '<span class="text-red-600">❌ Lỗi tải lên</span>';
                }
            };
            
            xhr.onerror = () => {
                progressBar.classList.replace('bg-cyan-100/50', 'bg-red-100/50');
                statusText.innerHTML = '<span class="text-red-600">❌ Mất mạng</span>';
            };
            
            xhr.open('POST', '/api/AttachmentApi/upload', true);
            xhr.withCredentials = true;
            xhr.send(formData);
        }
        
        // Clear input so same file can be selected again
        this.input.value = '';
    }
    
    getAttachmentIds() {
        return this.uploadedIds.join(',');
    }

    clear() {
        this.uploadedIds = [];
        if (this.previewZone) {
            this.previewZone.innerHTML = '';
        }
    }
}
