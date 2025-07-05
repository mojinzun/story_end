// 收藏管理页面的JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    const addFavoriteBtn = document.getElementById('add-favorite-btn');
    const favoriteModal = document.getElementById('favorite-modal');
    const closeFavoriteModalBtn = document.getElementById('close-favorite-modal');
    const cancelFavoriteBtn = document.getElementById('cancel-favorite-btn');
    const saveFavoriteBtn = document.getElementById('save-favorite-btn');
    const favoriteForm = document.getElementById('favorite-form');

    // 打开模态框
    addFavoriteBtn.addEventListener('click', function() {
        favoriteModal.classList.remove('hidden');
    });

    // 关闭模态框
    closeFavoriteModalBtn.addEventListener('click', function() {
        favoriteModal.classList.add('hidden');
    });

    cancelFavoriteBtn.addEventListener('click', function() {
        favoriteModal.classList.add('hidden');
    });

    // 保存新增收藏
    favoriteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为

        const favoriteName = document.getElementById('favorite-name').value;
        const favoriteType = document.getElementById('favorite-type').value;
        const favoriteStatus = document.getElementById('favorite-status').value;

        // 模拟保存数据
        console.log('保存收藏:', {
            name: favoriteName,
            type: favoriteType,
            status: favoriteStatus
        });

        // 清空表单并关闭模态框
        favoriteForm.reset();
        favoriteModal.classList.add('hidden');
    });
});

let currentPage = 1;
const pageSize = 5;
let favoritesData = [];
let filteredFavorites = [];

function renderFavoritesTable() {
    const tbody = document.getElementById('users-table-body');
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFavorites = filteredFavorites.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedFavorites.map(favorite => `
        <tr>
            <td class="checkbox-cell">
                <input type="checkbox" class="form-checkbox" value="${favorite.id}">
            </td>
            <td>${favorite.name}</td>
            <td>${favorite.type}</td>
            <td>${favorite.status}</td>
            <td>${favorite.date}</td>
            <td>
                <button class="action-btn">编辑</button>
                <button class="action-btn delete">删除</button>
            </td>
        </tr>
    `).join('');

    updatePaginationInfo();
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredFavorites.length / pageSize);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    addPaginationButton(paginationContainer, 1, '首页', currentPage === 1);
    addPaginationButton(paginationContainer, currentPage - 1, '上一页', currentPage === 1);
    
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        addPaginationButton(paginationContainer, i, i.toString(), currentPage === i);
    }
    
    addPaginationButton(paginationContainer, currentPage + 1, '下一页', currentPage === totalPages);
    addPaginationButton(paginationContainer, totalPages, '末页', currentPage === totalPages);
}

function addPaginationButton(container, pageNum, text, isDisabled) {
    const button = document.createElement('button');
    button.className = `pagination-btn ${isDisabled ? 'disabled' : ''}`;
    button.textContent = text;
    button.disabled = isDisabled;
    
    button.addEventListener('click', () => {
        currentPage = pageNum;
        renderFavoritesTable();
    });
    
    container.appendChild(button);
}

function updatePaginationInfo() {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, filteredFavorites.length);
    const totalItems = filteredFavorites.length;
    
    document.getElementById('start-item').textContent = startItem;
    document.getElementById('end-item').textContent = endItem;
    document.getElementById('total-items').textContent = totalItems;
} 