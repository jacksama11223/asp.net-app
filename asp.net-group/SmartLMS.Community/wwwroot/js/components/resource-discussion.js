function resourceDiscussion() {
    return {
        resourceId: null,
        comments: [],
        newComment: '',
        replyContent: '',
        activeReplyId: null,
        isLoading: false,
        reportReason: '',
        showReportModal: false,
        reportingCommentId: null,

        async init() {
            // Chờ gọi openResource(id) từ x-init thay vì khởi tạo ngay
        },

        async openResource(id) {
            if (this.resourceId === id) return; // Tránh gọi lại nhiều lần
            this.resourceId = id;
            await this.loadComments();
            this.setupSignalR();
        },

        setupSignalR() {
            // Kiểm tra xem connection đã có chưa (tái sử dụng từ layout nếu có)
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl("/hubs/community")
                .withAutomaticReconnect()
                .build();

            this.hubConnection.on("ReceiveResourceComment", (comment) => {
                // Thêm comment mới nhận được qua WebSockets vào UI
                if (!comment.parentCommentId) {
                    this.comments.unshift(comment); // Comment gốc
                } else {
                    // Cập nhật reply
                    this.loadComments(); // Cách lười: load lại cả cây cho chắc
                }
            });

            this.hubConnection.start().then(() => {
                console.log("Connected to SignalR for Resource", this.resourceId);
                this.hubConnection.invoke("JoinGroup", `Resource_${this.resourceId}`);
            }).catch(err => console.error(err));
        },

        async loadComments() {
            this.isLoading = true;
            try {
                const res = await fetch(`/CommunityApi/ResourceDiscussion/${this.resourceId}/comments`);
                if (res.ok) {
                    this.comments = await res.json();
                }
            } catch (e) {
                console.error("Lỗi tải bình luận:", e);
            } finally {
                this.isLoading = false;
            }
        },

        async postComment(parentId = null) {
            const content = parentId ? this.replyContent : this.newComment;
            if (!content || !content.trim()) return;

            try {
                const res = await fetch(`/CommunityApi/ResourceDiscussion/${this.resourceId}/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: content, parentCommentId: parentId })
                });

                if (res.ok) {
                    if (parentId) {
                        this.replyContent = '';
                        this.activeReplyId = null;
                    } else {
                        this.newComment = '';
                    }
                    await this.loadComments();
                    window.showToast && window.showToast('✅ Đã gửi bình luận');
                } else if (res.status === 401) {
                    window.location.href = '/Auth/Login';
                }
            } catch (e) {
                console.error("Lỗi đăng bình luận:", e);
            }
        },

        async upvote(commentId) {
            try {
                const res = await fetch(`/CommunityApi/ResourceDiscussion/comments/${commentId}/upvote`, { method: 'POST' });
                if (res.ok) {
                    await this.loadComments();
                } else if (res.status === 401) {
                    window.location.href = '/Auth/Login';
                }
            } catch (e) {
                console.error(e);
            }
        },

        async deleteComment(commentId) {
            if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
            try {
                const res = await fetch(`/CommunityApi/ResourceDiscussion/comments/${commentId}`, { method: 'DELETE' });
                if (res.ok) {
                    await this.loadComments();
                    window.showToast && window.showToast('✅ Đã xóa bình luận');
                } else {
                    window.showToast && window.showToast('❌ Không có quyền xóa');
                }
            } catch (e) {
                console.error(e);
            }
        },

        openReport(commentId = null) {
            this.reportingCommentId = commentId; // null implies reporting the resource itself
            this.showReportModal = true;
            this.reportReason = '';
        },

        async submitReport() {
            if (!this.reportReason) return;
            // API hiện tại chỉ nhận resourceId cho resource, cần sửa backend nếu muốn report specific comment
            // Hiện tại ta có API /CommunityApi/ResourceDiscussion/{resourceId}/report. Ta sẽ dùng nó cho cả hai.
            try {
                const res = await fetch(`/CommunityApi/ResourceDiscussion/${this.resourceId}/report`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reason: this.reportReason + (this.reportingCommentId ? ` (Comment ID: ${this.reportingCommentId})` : '') })
                });

                if (res.ok) {
                    this.showReportModal = false;
                    window.showToast && window.showToast('✅ Đã gửi báo cáo vi phạm');
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}
