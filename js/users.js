// 用户管理模块
class UserManager {
    constructor() {
        this.usersData = [
            { id: 1, username: '华为用户_sjhgek3h', email: 'zhangsan@example.com', phone: '13800138001', avatar: 'https://picsum.photos/id/1001/200/200', status: 'active', type: 'normal', registerTime: '2024-01-15 10:30:00', lastLogin: '2024-03-20 14:25:00' },
            { id: 2, username: '华为用户_5jgsugye', email: 'lisi@example.com', phone: '13800138002', avatar: 'https://picsum.photos/id/1002/200/200', status: 'active', type: 'vip', registerTime: '2024-01-20 09:15:00', lastLogin: '2024-03-19 16:40:00' },
            { id: 3, username: '华为用户_76jsjien', email: 'wangwu@example.com', phone: '13800138003', avatar: 'https://picsum.photos/id/1003/200/200', status: 'inactive', type: 'normal', registerTime: '2024-02-01 11:20:00', lastLogin: '2024-03-15 08:30:00' },
            { id: 4, username: '华为用户_9jhygsbx', email: 'zhaoliu@example.com', phone: '13800138004', avatar: 'https://picsum.photos/id/1004/200/200', status: 'pending', type: 'normal', registerTime: '2024-07-1 15:45:00', lastLogin: '2024-03-10 15:45:00' },
            { id: 5, username: '华为用户_b7cakgnk', email: 'huawei@example.com', phone: '13800138006', avatar: 'https://picsum.photos/id/1006/200/200', status: 'active', type: 'normal', registerTime: '2025-06-20 15:45:00', lastLogin: '2024-07-01 15:45:00' },
            { id: 6, username: '管理员', email: 'admin@example.com', phone: '13800138005', avatar: 'https://picsum.photos/id/1005/200/200', status: 'active', type: 'admin', registerTime: '2025-07-01 00:00:00', lastLogin: '2025-07-05 18:00:00' },
            { id: 7, username: '小白不白', email: '', phone: '13800138003', avatar: 'https://picsum.photos/id/1007/200/200', status: 'active', type: 'normal', registerTime: '2025-06-16 14:40:05', lastLogin: '2025-06-23 11:32:04' },
            { id: 8, username: '华为用户', email: '', phone: '13840072353', avatar: 'https://picsum.photos/id/1008/200/200', status: 'active', type: 'vip', registerTime: '2025-06-20 20:45:37', lastLogin: '' },
            { id: 9, username: '华为用户_3d77c36d', email: '', phone: '13834691812', avatar: 'https://picsum.photos/id/1009/200/200', status: 'active', type: 'normal', registerTime: '2025-06-20 21:00:39', lastLogin: '' },
            { id: 10, username: '华为用户_7f5773a1', email: '', phone: '13826000253', avatar: 'https://picsum.photos/id/1010/200/200', status: 'active', type: 'normal', registerTime: '2025-06-20 21:10:21', lastLogin: '' }
        ];
        
        this.currentPage = 1;
        this.pageSize = 5; // 将每页显示数量从10改为5
        this.filteredUsers = [...this.usersData];
        this.editingUserId = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderUsersTable();
    }
    
    bindEvents() {
        // 侧边栏切换
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
            } else {
                sidebar.classList.add('collapsed');
            }
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
        
        // 搜索功能
        document.getElementById('search-btn').addEventListener('click', () => this.performSearch());
        
        // 添加实时搜索功能（带防抖）
        let searchTimeout;
        document.getElementById('search-input').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch();
            }, 300);
        });

        // 添加状态筛选和类型筛选的change事件监听
        document.getElementById('status-filter').addEventListener('change', () => this.performSearch());
        document.getElementById('type-filter').addEventListener('change', () => this.performSearch());

        // 重置功能
        document.getElementById('reset-btn').addEventListener('click', () => this.resetFilters());
        
        // 移动端分页按钮
        document.getElementById('prev-page-mobile').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderUsersTable();
            }
        });
        
        document.getElementById('next-page-mobile').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderUsersTable();
            }
        });

        // 添加用户
        document.getElementById('add-user-btn').addEventListener('click', () => this.showAddUserModal());
        
        // 全选功能
        document.getElementById('select-all').addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        });
        
        // 模态框事件
        this.bindModalEvents();
    }
    
    bindModalEvents() {
        // 用户模态框
        const userModal = document.getElementById('user-modal');
        const closeModal = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const userForm = document.getElementById('user-form');
        
        // 关闭模态框
        [closeModal, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => this.closeUserModal());
        });
        
        // 点击模态框外部关闭
        userModal.addEventListener('click', (e) => {
            if (e.target === userModal) {
                this.closeUserModal();
            }
        });
        
        // 表单提交
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveUser();
        });
        
        // 删除模态框
        const deleteModal = document.getElementById('delete-modal');
        const cancelDelete = document.getElementById('cancel-delete');
        const confirmDelete = document.getElementById('confirm-delete');
        
        cancelDelete.addEventListener('click', () => this.closeDeleteModal());
        confirmDelete.addEventListener('click', () => this.confirmDeleteUser());
        
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                this.closeDeleteModal();
            }
        });
    }
    
    performSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        
        this.filteredUsers = this.usersData.filter(user => {
            const matchesSearch = !searchTerm || 
                user.username.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.phone.includes(searchTerm) ||
                user.type.toLowerCase().includes(searchTerm);
            
            const matchesStatus = !statusFilter || user.status === statusFilter;
            const matchesType = !typeFilter || user.type === typeFilter;
            
            return matchesSearch && matchesStatus && matchesType;
        });
        
        this.currentPage = 1;
        this.renderUsersTable();
    }
    
    resetFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('type-filter').value = '';
        this.filteredUsers = [...this.usersData];
        this.currentPage = 1;
        this.renderUsersTable();
    }
    
    renderUsersTable() {
        const tbody = document.getElementById('users-table-body');
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
        
        tbody.innerHTML = paginatedUsers.map(user => `
            <tr>
                <td class="checkbox-cell">
                    <input type="checkbox" class="form-checkbox" value="${user.id}">
                </td>
                <td>
                    <div class="user-info">
                        <img class="user-avatar-small" src="${user.avatar}" alt="${user.username}">
                        <div class="user-details">
                            <h4>${user.username}</h4>
                            <p>ID: ${user.id}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <h4>${user.email}</h4>
                        <p>${user.phone}</p>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${user.status}">${this.getStatusText(user.status)}</span>
                    <div class="user-type">${this.getTypeText(user.type)}</div>
                </td>
                <td>${this.formatDate(user.registerTime)}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="userManager.editUser(${user.id})" class="action-btn">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                        <button onclick="userManager.deleteUser(${user.id})" class="action-btn delete">
                            <i class="fa fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        this.renderPagination();
        this.updatePaginationInfo();
    }
    
    getStatusClass(status) {
        switch (status) {
            case 'active': return 'active';
            case 'inactive': return 'inactive';
            case 'pending': return 'pending';
            default: return 'inactive';
        }
    }
    
    getStatusText(status) {
        switch (status) {
            case 'active': return '正常';
            case 'inactive': return '禁用';
            case 'pending': return '待审核';
            default: return '未知';
        }
    }
    
    getTypeText(type) {
        switch (type) {
            case 'normal': return '普通用户';
            case 'vip': return 'VIP用户';
            case 'admin': return '管理员';
            default: return '未知';
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'});
    }
    
    renderPagination() {
        const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';
        
        // 添加首页和上一页按钮
        this.addPaginationButton(paginationContainer, 1, '首页', this.currentPage === 1);
        this.addPaginationButton(paginationContainer, this.currentPage - 1, '上一页', this.currentPage === 1);
        
        // 添加页码按钮
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            this.addPaginationButton(paginationContainer, i, i.toString(), this.currentPage === i);
        }
        
        // 添加下一页和末页按钮
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
            this.renderUsersTable();
        });
        
        container.appendChild(button);
    }
    
    updatePaginationInfo() {
        const startItem = (this.currentPage - 1) * this.pageSize + 1;
        const endItem = Math.min(this.currentPage * this.pageSize, this.filteredUsers.length);
        const totalItems = this.filteredUsers.length;
        
        document.getElementById('start-item').textContent = startItem;
        document.getElementById('end-item').textContent = endItem;
        document.getElementById('total-items').textContent = this.filteredUsers.length;
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderUsersTable();
        }
    }
    
    showAddUserModal() {
        this.editingUserId = null;
        document.getElementById('modal-title').textContent = '添加用户';
        document.getElementById('user-form').reset();
        document.getElementById('user-modal').classList.remove('hidden');
    }
    
    editUser(userId) {
        const user = this.usersData.find(u => u.id === userId);
        if (user) {
            this.editingUserId = userId;
            document.getElementById('modal-title').textContent = '编辑用户';
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
            document.getElementById('user-type').value = user.type;
            document.getElementById('user-status').value = user.status;
            document.getElementById('user-modal').classList.remove('hidden');
        }
    }
    
    closeUserModal() {
        document.getElementById('user-modal').classList.add('hidden');
        document.getElementById('user-form').reset();
        this.editingUserId = null;
    }
    
    saveUser() {
        const formData = new FormData(document.getElementById('user-form'));
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            type: formData.get('type'),
            status: formData.get('status')
        };
        
        // 验证数据
        if (!this.validateUserData(userData)) {
            return;
        }
        
        if (this.editingUserId) {
            // 编辑用户
            this.updateUser(this.editingUserId, userData);
        } else {
            // 添加用户
            this.addUser(userData);
        }
    }
    
    validateUserData(userData) {
        if (!userData.username.trim()) {
            alert('请输入用户名');
            return false;
        }
        
        if (!userData.email.trim()) {
            alert('请输入邮箱');
            return false;
        }
        
        if (!userData.phone.trim()) {
            alert('请输入手机号');
            return false;
        }
        
        // 检查邮箱是否已存在
        const existingUser = this.usersData.find(u => 
            u.email === userData.email && u.id !== this.editingUserId
        );
        if (existingUser) {
            alert('该邮箱已被使用');
            return false;
        }
        
        // 检查手机号是否已存在
        const existingPhone = this.usersData.find(u => 
            u.phone === userData.phone && u.id !== this.editingUserId
        );
        if (existingPhone) {
            alert('该手机号已被使用');
            return false;
        }
        
        return true;
    }
    
    addUser(userData) {
        const newUser = {
            id: this.usersData.length > 0 ? Math.max(...this.usersData.map(u => u.id)) + 1 : 1,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`,
            status: userData.status,
            type: userData.type,
            registerTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
            lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        
        this.usersData.push(newUser);
        this.filteredUsers = [...this.usersData];
        this.renderUsersTable();
        alert('用户添加成功！');
        this.closeUserModal();
    }
    
    updateUser(userId, userData) {
        const userIndex = this.usersData.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.usersData[userIndex] = {
                ...this.usersData[userIndex],
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
                type: userData.type,
                status: userData.status
            };
            
            this.filteredUsers = [...this.usersData];
            this.renderUsersTable();
            alert('用户更新成功！');
            this.closeUserModal();
        }
    }
    
    deleteUser(userId) {
        const user = this.usersData.find(u => u.id === userId);
        if (user) {
            document.getElementById('delete-user-name').textContent = user.username;
            document.getElementById('delete-modal').classList.remove('hidden');
            this.userToDelete = userId;
        }
    }
    
    closeDeleteModal() {
        document.getElementById('delete-modal').classList.add('hidden');
        this.userToDelete = null;
    }
    
    confirmDeleteUser() {
        if (this.userToDelete) {
            this.usersData = this.usersData.filter(u => u.id !== this.userToDelete);
            this.filteredUsers = this.filteredUsers.filter(u => u.id !== this.userToDelete);
            this.renderUsersTable();
            this.closeDeleteModal();
            alert('用户删除成功！');
        }
    }
}

// 全局变量
let userManager;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    userManager = new UserManager();
});