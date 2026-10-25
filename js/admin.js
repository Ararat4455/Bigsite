/**
 * Bigsite - Admin JavaScript
 * Handles all admin panel functionality including users, products, orders, and analytics
 */

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminSidebar();
    initializeAdminNotifications();
    initializeCharts();
    initializeDataTables();
    initializeQuickActions();
    initializeThemeToggle();
    initializeModals();
    initializeDate();
    hideLoadingScreen();
});

// ============================================
// Loading Screen
// ============================================

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// ============================================
// Sidebar
// ============================================

function initializeAdminSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Toggle sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const menuToggle = document.querySelector('.menu-toggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on window resize (if larger than 1200px)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1200) {
            openSidebar();
        }
    });

    // Initialize based on screen size
    if (window.innerWidth <= 1200) {
        closeSidebar();
    }

    // Initialize submenu toggles
    initializeSubmenus();
}

function initializeSubmenus() {
    const hasSubmenuItems = document.querySelectorAll('.nav-item.has-submenu');
    
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    toggleSubmenu(this);
                }
            });
        }
    });
}

function toggleSubmenu(link) {
    const item = link.closest('.nav-item.has-submenu');
    const submenu = item.querySelector('.submenu');
    
    if (submenu) {
        const isExpanded = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';
        
        if (isExpanded) {
            submenu.style.maxHeight = '0px';
            item.classList.remove('active');
        } else {
            // Close all other submenus
            document.querySelectorAll('.submenu').forEach(sm => {
                sm.style.maxHeight = '0px';
            });
            document.querySelectorAll('.nav-item.has-submenu').forEach(ni => {
                ni.classList.remove('active');
            });

            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            item.classList.add('active');
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
        sidebar.classList.add('open');
        sidebar.classList.remove('collapsed');
    }
    if (mainContent) {
        mainContent.classList.add('expanded');
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.add('show');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.classList.add('collapsed');
    }
    if (mainContent) {
        mainContent.classList.remove('expanded');
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('show');
    }

    // Close all submenus
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.maxHeight = '0px';
    });
    document.querySelectorAll('.nav-item.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
}

// ============================================
// User Menu
// ============================================

function initializeUserMenu() {
    const userDropdown = document.querySelector('.user-dropdown');
    const userMenu = document.getElementById('userMenu');

    if (userDropdown && userMenu) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleUserMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function() {
            if (userMenu.classList.contains('show')) {
                userMenu.classList.remove('show');
            }
        });

        // Prevent menu from closing when clicking inside
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('show');
    }
}

// ============================================
// Notifications
// ============================================

function initializeAdminNotifications() {
    const notificationBtns = document.querySelectorAll('.notification-btn');
    
    notificationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.notification-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.notification-dropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    });

    // Mark notification as read
    const notificationItems = document.querySelectorAll('.notification-item.unread');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            const badge = this.closest('.notification-btn').querySelector('.notification-badge');
            if (badge) {
                const count = parseInt(badge.textContent);
                if (count > 1) {
                    badge.textContent = count - 1;
                } else {
                    badge.remove();
                }
            }
        });
    });
}

// ============================================
// Charts
// ============================================

function initializeCharts() {
    // Revenue chart
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart) {
        createRevenueChart(revenueChart);
    }

    // Order status chart
    const orderStatusChart = document.getElementById('orderStatusChart');
    if (orderStatusChart) {
        createOrderStatusChart(orderStatusChart);
    }

    // Chart tabs
    const chartTabs = document.querySelectorAll('.chart-tab');
    chartTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const parent = this.closest('.chart-tabs');
            const tabs = parent.querySelectorAll('.chart-tab');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on tab
            const chartType = this.dataset.chart;
            const chartContainer = this.closest('.chart-container').querySelector('.chart-wrapper');
            updateAdminChart(chartContainer, chartType);
        });
    });
}

function createRevenueChart(container) {
    // Simple SVG line chart for revenue
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 300');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    svg.appendChild(bg);

    // Grid lines
    for (let i = 0; i <= 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', (i * 60).toString());
        line.setAttribute('x2', '800');
        line.setAttribute('y2', (i * 60).toString());
        line.setAttribute('stroke', '#e9ecef');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    // Line path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 250 L 120 200 L 190 220 L 260 180 L 330 150 L 400 120 L 470 100 L 540 80 L 610 110 L 680 90 L 750 60');
    path.setAttribute('stroke', '#4a6bff');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    // Fill under line
    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fill.setAttribute('d', 'M 50 250 L 120 200 L 190 220 L 260 180 L 330 150 L 400 120 L 470 100 L 540 80 L 610 110 L 680 90 L 750 60 L 750 300 L 50 300 Z');
    fill.setAttribute('fill', 'rgba(74, 107, 255, 0.1)');
    svg.appendChild(fill);

    // Points
    const points = [
        { x: 50, y: 250 },
        { x: 120, y: 200 },
        { x: 190, y: 220 },
        { x: 260, y: 180 },
        { x: 330, y: 150 },
        { x: 400, y: 120 },
        { x: 470, y: 100 },
        { x: 540, y: 80 },
        { x: 610, y: 110 },
        { x: 680, y: 90 },
        { x: 750, y: 60 }
    ];

    points.forEach(point => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x.toString());
        circle.setAttribute('cy', point.y.toString());
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', '#4a6bff');
        svg.appendChild(circle);
    });

    container.appendChild(svg);
}

function createOrderStatusChart(container) {
    // Simple SVG pie chart for order status
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Center
    const cx = 100;
    const cy = 100;
    const radius = 80;

    // Data
    const data = [
        { value: 35, color: '#4a6bff', label: 'Completed' },
        { value: 25, color: '#ffc107', label: 'Processing' },
        { value: 20, color: '#28a745', label: 'Shipped' },
        { value: 15, color: '#dc3545', label: 'Cancelled' },
        { value: 5, color: '#6c757d', label: 'Refunded' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -90; // Start from top

    data.forEach(item => {
        const endAngle = startAngle + (item.value / total) * 360;
        
        const largeArcFlag = (endAngle - startAngle) <= 180 ? 0 : 1;
        
        const x1 = cx + radius * Math.cos(startAngle * Math.PI / 180);
        const y1 = cy + radius * Math.sin(startAngle * Math.PI / 180);
        const x2 = cx + radius * Math.cos(endAngle * Math.PI / 180);
        const y2 = cy + radius * Math.sin(endAngle * Math.PI / 180);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`);
        path.setAttribute('fill', item.color);
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '2');
        svg.appendChild(path);

        startAngle = endAngle;
    });

    // Center circle
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', cx.toString());
    centerCircle.setAttribute('cy', cy.toString());
    centerCircle.setAttribute('r', '40');
    centerCircle.setAttribute('fill', '#ffffff');
    svg.appendChild(centerCircle);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    legend.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem;';

    data.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;';
        
        const colorBox = document.createElement('div');
        colorBox.style.cssText = `width: 12px; height: 12px; background: ${item.color}; border-radius: 2px;`;
        
        const label = document.createElement('span');
        label.textContent = `${item.label} (${item.value}%)`;
        label.style.color = '#6c757d';
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);
        legend.appendChild(legendItem);
    });

    container.appendChild(svg);
    container.appendChild(legend);
}

function updateAdminChart(container, chartType) {
    // Clear container
    container.innerHTML = '';

    // Create new chart based on type
    switch (chartType) {
        case 'weekly':
            createWeeklyChart(container);
            break;
        case 'daily':
            createDailyChart(container);
            break;
        case 'monthly':
        default:
            createRevenueChart(container);
            break;
        case 'donut':
            createDonutChart(container);
            break;
        case 'pie':
            createOrderStatusChart(container);
            break;
    }
}

function createWeeklyChart(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 300');
    svg.setAttribute('preserveAspectRatio', 'none');

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    svg.appendChild(bg);

    for (let i = 0; i <= 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', (i * 60).toString());
        line.setAttribute('x2', '800');
        line.setAttribute('y2', (i * 60).toString());
        line.setAttribute('stroke', '#e9ecef');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 250 L 120 220 L 190 200 L 260 180 L 330 160 L 400 140 L 470 120 L 540 150 L 610 130 L 680 110 L 750 90');
    path.setAttribute('stroke', '#ff6b9d');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fill.setAttribute('d', 'M 50 250 L 120 220 L 190 200 L 260 180 L 330 160 L 400 140 L 470 120 L 540 150 L 610 130 L 680 110 L 750 90 L 750 300 L 50 300 Z');
    fill.setAttribute('fill', 'rgba(255, 107, 157, 0.1)');
    svg.appendChild(fill);

    container.appendChild(svg);
}

function createDailyChart(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 300');
    svg.setAttribute('preserveAspectRatio', 'none');

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    svg.appendChild(bg);

    for (let i = 0; i <= 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', (i * 60).toString());
        line.setAttribute('x2', '800');
        line.setAttribute('y2', (i * 60).toString());
        line.setAttribute('stroke', '#e9ecef');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 280 L 100 250 L 150 220 L 200 200 L 250 180 L 300 160 L 350 140 L 400 120 L 450 150 L 500 130 L 550 110 L 600 140 L 650 120 L 700 100 L 750 80');
    path.setAttribute('stroke', '#28a745');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fill.setAttribute('d', 'M 50 280 L 100 250 L 150 220 L 200 200 L 250 180 L 300 160 L 350 140 L 400 120 L 450 150 L 500 130 L 550 110 L 600 140 L 650 120 L 700 100 L 750 80 L 750 300 L 50 300 Z');
    fill.setAttribute('fill', 'rgba(40, 167, 69, 0.1)');
    svg.appendChild(fill);

    container.appendChild(svg);
}

function createDonutChart(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const cx = 100;
    const cy = 100;
    const outerRadius = 80;
    const innerRadius = 40;

    const data = [
        { value: 35, color: '#4a6bff' },
        { value: 25, color: '#ff6b9d' },
        { value: 20, color: '#6a8bff' },
        { value: 15, color: '#ff8aab' },
        { value: 5, color: '#8aabff' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -90;

    data.forEach(item => {
        const endAngle = startAngle + (item.value / total) * 360;
        
        const largeArcFlag = (endAngle - startAngle) <= 180 ? 0 : 1;
        
        const x1 = cx + outerRadius * Math.cos(startAngle * Math.PI / 180);
        const y1 = cy + outerRadius * Math.sin(startAngle * Math.PI / 180);
        const x2 = cx + outerRadius * Math.cos(endAngle * Math.PI / 180);
        const y2 = cy + outerRadius * Math.sin(endAngle * Math.PI / 180);

        const x3 = cx + innerRadius * Math.cos(endAngle * Math.PI / 180);
        const y3 = cy + innerRadius * Math.sin(endAngle * Math.PI / 180);
        const x4 = cx + innerRadius * Math.cos(startAngle * Math.PI / 180);
        const y4 = cy + innerRadius * Math.sin(startAngle * Math.PI / 180);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`);
        path.setAttribute('fill', item.color);
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '2');
        svg.appendChild(path);

        startAngle = endAngle;
    });

    container.appendChild(svg);
}

// ============================================
// Data Tables
// ============================================

function initializeDataTables() {
    // Recent orders table
    loadRecentOrders();

    // Top products table
    loadTopProducts();

    // Search functionality
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', function() {
            filterOrders();
        });
    }

    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            filterProducts();
        });
    }

    // Pagination
    initializePagination();
}

function loadRecentOrders() {
    const tableBody = document.getElementById('recentOrdersTable');
    if (!tableBody) return;

    // Sample orders
    const orders = [
        { id: '#12345', customer: 'John Doe', date: '2024-01-15', status: 'completed', amount: '$249.99' },
        { id: '#12344', customer: 'Jane Smith', date: '2024-01-14', status: 'processing', amount: '$199.99' },
        { id: '#12343', customer: 'Mike Johnson', date: '2024-01-13', status: 'shipped', amount: '$99.99' },
        { id: '#12342', customer: 'Sarah Williams', date: '2024-01-12', status: 'pending', amount: '$149.99' },
        { id: '#12341', customer: 'David Brown', date: '2024-01-11', status: 'cancelled', amount: '$79.99' }
    ];

    tableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="orders.html?id=${order.id}" class="order-link">${order.id}</a></td>
            <td>
                <div class="user-cell">
                    <img src="https://via.placeholder.com/35x35/4a6bff/ffffff?text=${order.customer.charAt(0)}" alt="${order.customer}">
                    <div class="user-cell-info">
                        <h4>${order.customer}</h4>
                    </div>
                </div>
            </td>
            <td>${order.date}</td>
            <td><span class="status-badge ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td>${order.amount}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn view" onclick="viewOrder('${order.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editOrder('${order.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteOrder('${order.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadTopProducts() {
    const tableBody = document.getElementById('topProductsTable');
    if (!tableBody) return;

    // Sample products
    const products = [
        { name: 'Premium Business Template', sales: 124, revenue: '$12,399.00', rating: 4.8, stock: 45 },
        { name: 'E-commerce Theme', sales: 89, revenue: '$8,899.00', rating: 4.7, stock: 32 },
        { name: 'Portfolio Template', sales: 67, revenue: '$6,699.00', rating: 4.9, stock: 18 },
        { name: 'Admin Dashboard', sales: 54, revenue: '$5,399.00', rating: 4.6, stock: 25 },
        { name: 'Landing Page', sales: 42, revenue: '$4,199.00', rating: 4.5, stock: 12 }
    ];

    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-cell">
                    <img src="https://via.placeholder.com/40x40/4a6bff/ffffff?text=P" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.sales}</td>
            <td>${product.revenue}</td>
            <td>
                <div class="rating-stars">
                    ${generateStars(product.rating)}
                </div>
            </td>
            <td>
                <span class="stock-badge ${product.stock > 20 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock'}">
                    ${product.stock} in stock
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function generateStars(rating) {
    const ratingValue = parseFloat(rating) || 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let html = '';
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    return html;
}

function filterOrders() {
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase();
    if (!searchTerm) {
        loadRecentOrders();
        return;
    }

    const tableBody = document.getElementById('recentOrdersTable');
    if (!tableBody) return;

    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase();
    if (!searchTerm) {
        loadTopProducts();
        return;
    }

    const tableBody = document.getElementById('topProductsTable');
    if (!tableBody) return;

    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled') || this.classList.contains('active')) return;

            const parent = this.closest('.pagination-controls');
            const buttons = parent.querySelectorAll('.pagination-btn');
            
            buttons.forEach(b => {
                if (b.classList.contains('active')) {
                    b.classList.remove('active');
                }
            });

            if (!this.classList.contains('disabled')) {
                this.classList.add('active');
            }

            // Load page
            const page = this.textContent;
            if (page === '«') {
                // Previous page
                const currentActive = parent.querySelector('.pagination-btn.active');
                if (currentActive && currentActive.previousElementSibling) {
                    currentActive.previousElementSibling.click();
                }
            } else if (page === '»') {
                // Next page
                const currentActive = parent.querySelector('.pagination-btn.active');
                if (currentActive && currentActive.nextElementSibling) {
                    currentActive.nextElementSibling.click();
                }
            }
        });
    });
}

// ============================================
// Quick Actions
// ============================================

function initializeQuickActions() {
    const quickActions = document.querySelectorAll('.admin-quick-actions .quick-action');
    
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action || this.querySelector('span').textContent.toLowerCase().replace(' ', '-');
            handleQuickAction(actionType);
        });
    });
}

function handleQuickAction(actionType) {
    switch (actionType) {
        case 'add-product':
            openModal('addProductModal');
            break;
        case 'add-user':
            openModal('addUserModal');
            break;
        case 'create-coupon':
            showNotification('Create Coupon functionality coming soon!', 'info');
            break;
        case 'send-newsletter':
            showNotification('Send Newsletter functionality coming soon!', 'info');
            break;
        case 'backup':
            createBackup();
            break;
        case 'clear-cache':
            clearCache();
            break;
        default:
            console.log('Action:', actionType);
            showNotification(`Action: ${actionType}`, 'info');
    }
}

function createBackup() {
    showNotification('Backup created successfully!', 'success');
}

function clearCache() {
    showNotification('Cache cleared successfully!', 'success');
}

// ============================================
// Modals
// ============================================

function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            openModal(modalId);
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (typeof modal === 'string') {
        modal = document.getElementById(modal);
    }
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function submitAddProduct() {
    const form = document.getElementById('addProductForm');
    if (!form) return;

    const name = form.querySelector('#productName')?.value;
    const description = form.querySelector('#productDescription')?.value;
    const price = form.querySelector('#productPrice')?.value;
    const category = form.querySelector('#productCategory')?.value;
    const featured = form.querySelector('#productFeatured')?.checked;
    const active = form.querySelector('#productActive')?.checked;

    if (!name || !price || !category) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Create product object
    const product = {
        id: 'product-' + Date.now(),
        name,
        description,
        price: '$' + parseFloat(price).toFixed(2),
        category,
        featured,
        active,
        date: new Date().toISOString()
    };

    console.log('Product added:', product);
    showNotification('Product added successfully!', 'success');
    closeModal('addProductModal');
    
    // Reset form
    form.reset();
}

function submitAddUser() {
    const form = document.getElementById('addUserForm');
    if (!form) return;

    const firstName = form.querySelector('#userFirstName')?.value;
    const lastName = form.querySelector('#userLastName')?.value;
    const email = form.querySelector('#userEmail')?.value;
    const password = form.querySelector('#userPassword')?.value;
    const role = form.querySelector('#userRole')?.value;
    const active = form.querySelector('#userActive')?.checked;

    if (!firstName || !lastName || !email || !password || !role) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Create user object
    const user = {
        id: 'user-' + Date.now(),
        firstName,
        lastName,
        email,
        password, // In a real app, this would be hashed
        role,
        active,
        date: new Date().toISOString()
    };

    console.log('User added:', user);
    showNotification('User added successfully!', 'success');
    closeModal('addUserModal');
    
    // Reset form
    form.reset();
}

// ============================================
// Theme Toggle
// ============================================

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const isDark = document.body.classList.toggle('dark-mode');

    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// ============================================
// Date
// ============================================

function initializeDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ============================================
// Actions
// ============================================

function viewOrder(orderId) {
    console.log('View order:', orderId);
    window.location.href = `orders.html?id=${orderId}`;
}

function editOrder(orderId) {
    console.log('Edit order:', orderId);
    showNotification(`Edit order ${orderId} functionality coming soon!`, 'info');
}

function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
        console.log('Delete order:', orderId);
        showNotification(`Order ${orderId} deleted successfully!`, 'success');
    }
}

function exportData() {
    showNotification('Data export functionality coming soon!', 'info');
}

// ============================================
// Authentication
// ============================================

function logout() {
    // Clear session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    window.location.href = '../auth/login.html';
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return false;
    }
    return true;
}

// ============================================
// Utility Functions
// ============================================

function showNotification(message, type = 'info') {
    // Check if notification element exists
    let notification = document.querySelector('.notification-toast');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.body.appendChild(notification);
    }

    // Set notification content
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${getNotificationIcon(type)}" style="color: ${getNotificationColor(type)}; font-size: 1.25rem;"></i>
            <span style="color: #212529; font-size: 0.95rem;">${message}</span>
        </div>
    `;

    // Remove previous animation
    notification.style.animation = 'none';
    
    // Force reflow
    void notification.offsetWidth;
    
    // Add animation
    notification.style.animation = 'slideIn 0.3s ease';

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        notification.style.animation += ', fadeOut 0.3s ease forwards';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        case 'info': return '#17a2b8';
        default: return '#17a2b8';
    }
}

function formatCurrency(amount) {
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(/[^\d.]/g, ''));
    }
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Export for use in other modules
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSidebar,
        openSidebar,
        closeSidebar,
        toggleTheme,
        openModal,
        closeModal,
        formatCurrency,
        getNotificationIcon,
        getNotificationColor,
        logout,
        checkAuth
    };
}
