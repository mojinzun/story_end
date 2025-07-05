// 故事管理页面模块
class StoriesManager {
    constructor() {
        // 初始化故事数据
        this.storiesData = [
            { id: 1, title: '小蚂蚁的环保之旅', author: '童话作家', category: 'science', status: 'published', content: '这是一个关于小蚂蚁阿力教导小朋友们环保知识的暖心故事', publishTime: '2025-06-11', coverImage: 'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/f68128c2-2886-417a-90ff-37399a12e96c_1749644102901534645_origin~tplv-a9rns2rl98-web-preview-watermark.jpeg?rk3s=6823e3d0&x-expires=1781180103&x-signature=wexoyfRg6XszAW2xsg3%2BUsbrVfo%3D' },
            { id: 2, title: '长城守护者', author: '历史讲述者', category: 'mystery', status: 'draft', content: '讲述了一个古代小将守护长城的感人故事', publishTime: '2025-06-11', coverImage: 'https://gips2.baidu.com/it/u=2618111920,882145171&fm=3074&app=3074&f=JPEG?w=896&h=1122&type=normal&func=' },
            { id: 3, title: '小小发明家', author: '童话作家', category: 'fantasy', status: 'review', content: '一个充满创造力的孩子，通过自己的智慧解决生活中的问题', publishTime: '2025-06-11', coverImage: 'https://img1.baidu.com/it/u=3089139848,627951808&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=707' },
            { id: 4, title: '中华美食历险记', author: '童话作家', category: 'romance', status: 'published', content: '跟随小厨师小明了解中国传统美食文化', publishTime: '2025-06-11', coverImage: 'https://b0.bdstatic.com/0036f6f0338f609b156a476d57d0c4e1.jpg' },
            { id: 5, title: '勇敢的消防员', author: '童话作家', category: 'science', status: 'published', content: '讲述小小消防员成长为真正英雄的故事', publishTime: '2025-06-11', coverImage: 'https://pics1.baidu.com/feed/a8773912b31bb051882fd4000c4ed4bb4aede056.jpeg@f_auto?token=ecc2c7686d65a6054249ad925d1c2c8a' },
            { id: 6, title: '神奇植物园', author: '历史讲述者', category: 'mystery', status: 'draft', content: '一个充满科学知识的植物园探险故事', publishTime: '2025-06-11', coverImage: 'https://img0.baidu.com/it/u=593044816,1742133277&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666' },
            { id: 7, title: '古老钟表匠', author: '历史讲述者', category: 'fantasy', status: 'review', content: '一个传承传统工艺的感人故事', publishTime: '2025-06-11', coverImage: 'https://img1.baidu.com/it/u=2790411802,130755230&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422' },
            { id: 8, title: '小小环保卫士', author: '童话作家', category: 'romance', status: 'published', content: '孩子们守护地球家园的故事', publishTime: '2025-06-11', coverImage: 'https://img1.baidu.com/it/u=981073520,2775363591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750' },
            { id: 9, title: '传统节日探秘', author: '历史讲述者', category: 'science', status: 'draft', content: '了解中国传统节日习俗的有趣故事', publishTime: '2025-06-11', coverImage: 'https://img0.baidu.com/it/u=938146720,2442166460&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521' },
            { id: 10, title: '小小建筑师', author: '童话作家', category: 'mystery', status: 'review', content: '一个梦想成为建筑师的孩子的成长故事', publishTime: '2025-06-11', coverImage: 'https://img0.baidu.com/it/u=3182311694,3855408065&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800' }
        ];
        this.currentPage = 1;
        this.pageSize = 5;
        this.filteredStories = [...this.storiesData];
        this.editingStoryId = null;
        this.storyToDelete = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.filteredStories = [...this.storiesData];
        this.currentPage = 1;
        this.renderStoriesTable();
        this.renderPagination();
        this.updatePaginationInfo();
    }

    bindEvents() {
        // 侧边栏切换
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });

        // 用户菜单
        const userMenuButton = document.getElementById('user-menu-button');
        const userMenu = document.getElementById('user-menu');

        userMenuButton.addEventListener('click', () => {
            userMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });

        // 添加故事按钮
        document.querySelector('.page-header .btn-primary').addEventListener('click', () => this.showAddStoryModal());

        // 搜索和筛选
        document.querySelector('.search-actions .btn-primary').addEventListener('click', () => this.performSearch());
        document.querySelector('.search-actions .btn-secondary').addEventListener('click', () => this.resetFilters());

        // 移动端分页按钮
        document.getElementById('prev-page-mobile').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderStoriesTable();
                this.renderPagination();
                this.updatePaginationInfo();
            }
        });

        document.getElementById('next-page-mobile').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredStories.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderStoriesTable();
                this.renderPagination();
                this.updatePaginationInfo();
            }
        });

        // 模态框事件
        this.bindModalEvents();
    }

    bindModalEvents() {
        // 故事模态框
        const storyModal = document.getElementById('story-modal');
        const closeModal = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const saveBtn = document.getElementById('save-btn');

        [closeModal, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => this.closeStoryModal());
        });

        storyModal.addEventListener('click', (e) => {
            if (e.target === storyModal) this.closeStoryModal();
        });

        saveBtn.addEventListener('click', () => this.saveStory());

        // 删除模态框
        const deleteModal = document.getElementById('delete-modal');
        const closeDeleteModal = document.getElementById('close-delete-modal');
        const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

        [closeDeleteModal, cancelDeleteBtn].forEach(btn => {
            btn.addEventListener('click', () => this.closeDeleteModal());
        });

        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) this.closeDeleteModal();
        });

        confirmDeleteBtn.addEventListener('click', () => this.confirmDeleteStory());
    }

    renderStoriesTable() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const currentStories = this.filteredStories.slice(startIndex, endIndex);
        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;

        tbody.innerHTML = currentStories.map(story => `
            <tr>
                <td class="checkbox-cell">
                    <input type="checkbox" class="form-checkbox" value="${story.id}">
                </td>
                <td>
                    <div class="user-info">
                        <img class="user-avatar-small" src="${story.coverImage}" alt="${story.title}">
                        <div class="user-details">
                            <h4>${story.title}</h4>
                            <p>${story.content.substring(0, 30)}${story.content.length > 30 ? '...' : ''}</p>
                        </div>
                    </div>
                </td>
                <td>${story.author}</td>
                <td>${this.getCategoryText(story.category)}</td>
                <td>
                    <span class="status-badge ${story.status}">${this.getStatusText(story.status)}</span>
                </td>
                <td>${story.publishTime}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="storyManager.editStory(${story.id})" class="action-btn">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                        <button onclick="storyManager.deleteStory(${story.id})" class="action-btn delete">
                            <i class="fa fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getCategoryText(category) {
        const categories = {
            'fantasy': '童话故事',
            'romance': '历史故事',
            'mystery': '励志故事',
            'science': '科普故事'
        };
        return categories[category] || '未知';
    }

    getStatusText(status) {
        const statuses = {
            'published': '已发布',
            'draft': '草稿',
            'review': '审核中'
        };
        return statuses[status] || '未知';
    }

    showAddStoryModal() {
        this.editingStoryId = null;
        document.getElementById('modal-title').textContent = '添加故事';
        document.getElementById('story-form').reset();
        document.getElementById('story-modal').classList.remove('hidden');
    }

    editStory(storyId) {
        const story = this.storiesData.find(s => s.id === storyId);
        if (!story) return;

        this.editingStoryId = storyId;
        document.getElementById('modal-title').textContent = '编辑故事';
        document.getElementById('story-id').value = story.id;
        document.getElementById('title').value = story.title;
        document.getElementById('author').value = story.author;
        document.getElementById('category').value = story.category;
        document.getElementById('status').value = story.status;
        document.getElementById('content').value = story.content;
        document.getElementById('story-modal').classList.remove('hidden');
    }

    closeStoryModal() {
        document.getElementById('story-modal').classList.add('hidden');
        document.getElementById('story-form').reset();
        this.editingStoryId = null;
    }

    saveStory() {
        const formData = new FormData(document.getElementById('story-form'));
        const storyData = {
            title: formData.get('title'),
            author: formData.get('author'),
            category: formData.get('category'),
            status: formData.get('status'),
            content: formData.get('content')
        };

        if (!this.validateStoryData(storyData)) return;

        if (this.editingStoryId) {
            this.updateStory(this.editingStoryId, storyData);
        } else {
            this.addStory(storyData);
        }
    }

    validateStoryData(data) {
        if (!data.title.trim()) {
            alert('请输入故事标题');
            return false;
        }

        if (!data.author.trim()) {
            alert('请输入作者名称');
            return false;
        }

        if (!data.content.trim()) {
            alert('请输入故事内容');
            return false;
        }

        return true;
    }

    addStory(data) {
        const newStory = {
            id: this.storiesData.length > 0 ? Math.max(...this.storiesData.map(s => s.id)) + 1 : 1,
            ...data,
            publishTime: new Date().toISOString().split('T')[0],
            coverImage: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/200/200`
        };

        this.storiesData.push(newStory);
        this.filteredStories = [...this.storiesData];
        this.renderStoriesTable();
        this.closeStoryModal();
        alert('故事添加成功！');
    }

    updateStory(id, data) {
        const index = this.storiesData.findIndex(s => s.id === id);
        if (index === -1) return;

        this.storiesData[index] = {
            ...this.storiesData[index],
            ...data,
            publishTime: this.storiesData[index].status !== 'published' && data.status === 'published' ?
                new Date().toISOString().split('T')[0] : this.storiesData[index].publishTime
        };

        this.filteredStories = [...this.storiesData];
        this.renderStoriesTable();
        this.closeStoryModal();
        alert('故事更新成功！');
    }

    deleteStory(id) {
        const story = this.storiesData.find(s => s.id === id);
        if (!story) return;

        this.storyToDelete = id;
        document.getElementById('delete-story-name').textContent = story.title;
        document.getElementById('delete-modal').classList.remove('hidden');
    }

    closeDeleteModal() {
        document.getElementById('delete-modal').classList.add('hidden');
        this.storyToDelete = null;
    }

    confirmDeleteStory() {
        if (this.storyToDelete === null) return;

        this.storiesData = this.storiesData.filter(s => s.id !== this.storyToDelete);
        this.filteredStories = this.filteredStories.filter(s => s.id !== this.storyToDelete);
        this.renderStoriesTable();
        this.closeDeleteModal();
        alert('故事删除成功！');
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;

        this.filteredStories = this.storiesData.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(searchTerm) || story.author.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || story.status === statusFilter;
            const matchesCategory = !categoryFilter || story.category === categoryFilter;
            return matchesSearch && matchesStatus && matchesCategory;
        });

        this.currentPage = 1;
        this.renderStoriesTable();
        this.renderPagination();
        this.updatePaginationInfo();
    }

    resetFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('category-filter').value = '';
        this.performSearch();
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredStories.length / this.pageSize);
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        this.addPaginationButton(paginationContainer, 1, '首页', this.currentPage === 1);
        this.addPaginationButton(paginationContainer, this.currentPage - 1, '上一页', this.currentPage === 1);

        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            this.addPaginationButton(paginationContainer, i, i.toString(), this.currentPage === i);
        }

        this.addPaginationButton(paginationContainer, this.currentPage + 1, '下一页', this.currentPage === totalPages);
        this.addPaginationButton(paginationContainer, totalPages, '末页', this.currentPage === totalPages);
    }

    addPaginationButton(container, pageNum, text, isDisabled) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${isDisabled ? 'disabled' : ''}`;
        button.textContent = text;
        button.disabled = isDisabled;

        button.addEventListener('click', () => {
            this.currentPage = pageNum;
            this.renderStoriesTable();
            this.renderPagination();
            this.updatePaginationInfo();
        });

        container.appendChild(button);
    }

    updatePaginationInfo() {
        const startItem = (this.currentPage - 1) * this.pageSize + 1;
        const endItem = Math.min(this.currentPage * this.pageSize, this.filteredStories.length);

        document.getElementById('start-item').textContent = startItem;
        document.getElementById('end-item').textContent = endItem;
        document.getElementById('total-items').textContent = this.filteredStories.length;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredStories.length / this.pageSize);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderStoriesTable();
            this.renderPagination();
            this.updatePaginationInfo();
        }
    }

    resetFilters() {
        document.querySelector('.search-input').value = '';
        document.querySelector('.search-grid .search-item:nth-child(2) select').value = '';
        document.querySelector('.search-grid .search-item:nth-child(3) select').value = '';
        this.filteredStories = [...this.storiesData];
        this.currentPage = 1;
        this.renderStoriesTable();
    }
}

// 全局变量
let storyManager;

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    storyManager = new StoriesManager();
});