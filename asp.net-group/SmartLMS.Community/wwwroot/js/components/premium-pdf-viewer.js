function premiumPdfViewer() {
    // pdfDoc is intentionally left out of the returned object to avoid Alpine proxying which breaks PDF.js private fields
    let _pdfDoc = null;

            return {
                pdfUrl: '',
                pageNum: 1,
                pageRendering: false,
                pageNumPending: null,
                scale: 1.2,
                canvas: null,
                ctx: null,
                totalPages: 0,
                isDarkMode: false, // Default to light mode for standard document viewing
                isLoadingPdf: false,
                viewerMode: 'pdf', // 'pdf', 'word', 'image', 'unsupported'

                async initViewer(url) {
                    if (!url) return;
                    this.pdfUrl = url;
                    this.pageNum = 1;
                    this.totalPages = 0;
                    
                    const lowerUrl = url.toLowerCase();
                    if (lowerUrl.endsWith('.pdf') || lowerUrl.includes('.pdf?')) {
                        this.viewerMode = 'pdf';
                    } else if (lowerUrl.match(/\.(doc|docx|ppt|pptx|xls|xlsx)$/)) {
                        this.viewerMode = 'word';
                        return;
                    } else if (lowerUrl.match(/\.(jpeg|jpg|png|gif|webp)$/)) {
                        this.viewerMode = 'image';
                        return;
                    } else {
                        this.viewerMode = 'unsupported';
                        window.showToast && window.showToast('⚠️ Định dạng tài liệu không hỗ trợ xem trực tuyến. Vui lòng tải về.');
                        return;
                    }

                    this.isLoadingPdf = true;

                    // Chờ canvas render trên DOM
                    await this.$nextTick();
            this.canvas = this.$refs.pdfCanvas;
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');

            try {
                // Khởi tạo thư viện PDF.js
                const pdfjsLib = window.pdfjsLib || window['pdfjs-dist/build/pdf'];
                // Bắt buộc set workerSrc
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

                const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
                _pdfDoc = await loadingTask.promise;
                this.totalPages = _pdfDoc.numPages;
                this.renderPage(this.pageNum);
            } catch (error) {
                console.error('Lỗi tải PDF:', error);
                window.showToast && window.showToast('❌ Không thể tải tài liệu PDF này.');
            } finally {
                this.isLoadingPdf = false;
            }
        },

        renderPage(num) {
            if (!_pdfDoc) return;
            this.pageRendering = true;
            _pdfDoc.getPage(num).then((page) => {
                const viewport = page.getViewport({ scale: this.scale });
                this.canvas.height = viewport.height;
                this.canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: this.ctx,
                    viewport: viewport
                };

                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                    this.pageRendering = false;
                    if (this.pageNumPending !== null) {
                        this.renderPage(this.pageNumPending);
                        this.pageNumPending = null;
                    }
                });
            });
        },

        queueRenderPage(num) {
            if (this.pageRendering) {
                this.pageNumPending = num;
            } else {
                this.renderPage(num);
            }
        },

        prevPage() {
            if (this.pageNum <= 1) return;
            this.pageNum--;
            this.queueRenderPage(this.pageNum);
        },

        nextPage() {
            if (this.pageNum >= this.totalPages) return;
            this.pageNum++;
            this.queueRenderPage(this.pageNum);
        },

        zoomIn() {
            this.scale += 0.2;
            this.queueRenderPage(this.pageNum);
        },

        zoomOut() {
            if (this.scale <= 0.4) return;
            this.scale -= 0.2;
            this.queueRenderPage(this.pageNum);
        },

        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        },
        
        getGoogleDocsViewerUrl() {
            // Need absolute URL for Google Docs Viewer
            const absoluteUrl = this.pdfUrl.startsWith('http') ? this.pdfUrl : window.location.origin + this.pdfUrl;
            return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
        }
    }
}
