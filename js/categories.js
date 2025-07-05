// 分类管理页面模块
class CategoriesManager {
    constructor() {
        // 初始化分类数据
        this.categoriesData = [
            { id: 1, name: '童话故事', description: '经典童话和寓言故事', status: 'active', storyCount: 0, createTime: '2025-06-11' },
            { id: 2, name: '历史故事', description: '真实的历史人物和事件故事', status: 'active', storyCount: 0, createTime: '2025-06-11' },
            { id: 3, name: '励志故事', description: '激励人心的成长故事', status: 'active', storyCount: 0, createTime: '2025-06-11' },
            { id: 4, name: '科普故事', description: '有趣的科学知识故事', status: 'active', storyCount: 0, createTime: '2025-06-11' },
            { id: 5, name: '传统文化', description: '中国传统文化故事', status: 'active', storyCount: 0, createTime: '2025-06-11' }
        ];
        this.filteredCategories = [...this.categoriesData];
        this.editingCategoryId = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.bindEditButtons();
        this.renderCategoriesTable();
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
        
        // 点击其他地方关闭用户菜单
        document.addEventListener('click', (event) => {
            if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });

        // 搜索和重置按钮事件
        document.querySelector('.search-actions .btn-primary').addEventListener('click', () => this.performSearch());
        document.querySelector('.search-actions .btn-secondary').addEventListener('click', () => this.resetFilters());

        // 添加分类按钮
document.querySelector('.page-header .btn-primary').addEventListener('click', () => this.showAddCategoryModal());

// 编辑按钮事件
this.bindEditButtons();

// 模态框事件
        this.bindModalEvents();
    }

    bindEditButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn') && e.target.closest('.action-btn').innerHTML.includes('编辑')) {
            const tr = e.target.closest('tr');
            const categoryId = parseInt(tr.querySelector('.form-checkbox').value);
            this.showEditCategoryModal(categoryId);
        }
    });
}

bindModalEvents() {
        const modal = document.getElementById('category-modal');
        const closeModal = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const saveBtn = document.getElementById('save-btn');

        // 关闭模态框事件
        [closeModal, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => this.closeCategoryModal());
        });

        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeCategoryModal();
        });

        // 保存分类事件
        saveBtn.addEventListener('click', () => this.saveCategory());
    }

    showEditCategoryModal(categoryId) {
    this.editingCategoryId = categoryId;
    const category = this.categoriesData.find(c => c.id === categoryId);
    if (!category) return;

    document.getElementById('modal-title').textContent = '编辑分类';
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-description').value = category.description;
    document.getElementById('category-status').value = category.status;
    document.getElementById('category-modal').classList.remove('hidden');
}

showAddCategoryModal() {
        this.editingCategoryId = null;
        document.getElementById('modal-title').textContent = '添加分类';
        document.getElementById('category-form').reset();
        document.getElementById('category-modal').classList.remove('hidden');
    }

    closeCategoryModal() {
        document.getElementById('category-modal').classList.add('hidden');
        document.getElementById('category-form').reset();
        this.editingCategoryId = null;
    }

    saveCategory() {
    const nameInput = document.getElementById('category-name');
    const descriptionInput = document.getElementById('category-description');
    const statusInput = document.getElementById('category-status');

    // 表单验证
    if (!nameInput.value.trim()) {
        alert('请输入分类名称');
        nameInput.focus();
        return;
    }

    // 检查分类名称是否已存在（排除当前编辑项）
    const nameExists = this.categoriesData.some(
        category => category.id !== this.editingCategoryId && 
                   category.name.toLowerCase() === nameInput.value.trim().toLowerCase()
    );

    if (nameExists) {
        alert('该分类名称已存在，请使用其他名称');
        nameInput.focus();
        return;
    }

    if (this.editingCategoryId) {
        // 更新现有分类
        const index = this.categoriesData.findIndex(c => c.id === this.editingCategoryId);
        if (index !== -1) {
            this.categoriesData[index] = {
                ...this.categoriesData[index],
                name: nameInput.value.trim(),
                description: descriptionInput.value.trim(),
                status: statusInput.value
            };
            this.filteredCategories = [...this.categoriesData];
            this.renderCategoriesTable();
            this.closeCategoryModal();
            alert('分类更新成功！');
        }
    } else {
        // 创建新分类
        const newCategory = {
            id: this.categoriesData.length > 0 ? Math.max(...this.categoriesData.map(c => c.id)) + 1 : 1,
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            status: statusInput.value,
            storyCount: 0,
            createTime: new Date().toISOString().split('T')[0]
        };

        // 添加到数据中
        this.categoriesData.push(newCategory);
        this.filteredCategories = [...this.categoriesData];

        // 重新渲染表格
        this.renderCategoriesTable();

        // 关闭模态框
        this.closeCategoryModal();

        // 显示成功消息
        alert('分类添加成功！');
    }
}
    
    renderCategoriesTable() {
        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;

        tbody.innerHTML = this.filteredCategories.map(category => `
            <tr>
                <td class="checkbox-cell">
                    <input type="checkbox" class="form-checkbox" value="${category.id}">
                </td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar-small" style="background-color: ${this.getCategoryColor(category.name)}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            ${category.name.charAt(0)}
                        </div>
                        <div class="user-details">
                            <h4>${category.name}</h4>
                            <p>${category.description}</p>
                        </div>
                    </div>
                </td>
                <td>${category.storyCount}</td>
                <td>
                    <span class="status-badge ${category.status}">${category.status === 'active' ? '启用' : '禁用'}</span>
                </td>
                <td>${category.createTime}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                        <button class="action-btn delete">
                            <i class="fa fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getCategoryColor(name) {
        const colors = {
            '奇幻': '#3b82f6',
            '言情': '#ec4899',
            '悬疑': '#f59e0b',
            '科幻': '#10b981',
            '历史': '#6b7280'
        };
        return colors[name] || '#6b7280';
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;

        this.filteredCategories = this.categoriesData.filter(category => {
            const matchesSearch = category.name.toLowerCase().includes(searchTerm) || category.description.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || category.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        this.renderCategoriesTable();
    }

    resetFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('status-filter').value = '';
        this.filteredCategories = [...this.categoriesData];
        this.renderCategoriesTable();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    new CategoriesManager();
});