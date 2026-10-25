/**
 * Bigsite - Dashboard JavaScript
 * Handles all dashboard functionality including sidebar, charts, tables, and interactions
 */

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeUserMenu();
    initializeNotifications();
    initializeCharts();
    initializeDataTable();
    initializeProjects();
    initializeActivityFeed();
    initializeQuickActions();
    initializeThemeToggle();
    initializeModals();
    initializeSearch();
    initializeResponsive();
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

let sidebarOpen = false;

function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

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
    sidebarOverlay.addEventListener('click', () => {
        closeSidebar();
    });

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
}

function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.remove('collapsed');
    if (sidebar) sidebar.classList.add('open');
    if (mainContent) mainContent.classList.add('expanded');
    if (sidebarOverlay) sidebarOverlay.classList.add('show');
    sidebarOpen = true;
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.add('collapsed');
    if (sidebar) sidebar.classList.remove('open');
    if (mainContent) mainContent.classList.remove('expanded');
    if (sidebarOverlay) sidebarOverlay.classList.remove('show');
    sidebarOpen = false;
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

function initializeNotifications() {
    const notificationBtns = document.querySelectorAll('.header-btn.notification-btn');
    
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
            const badge = document.querySelector('.notification-badge');
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
    // Simple line chart simulation
    const lineChart = document.getElementById('lineChart');
    if (lineChart) {
        createLineChart(lineChart);
    }

    // Simple bar chart simulation
    const barChart = document.getElementById('barChart');
    if (barChart) {
        createBarChart(barChart);
    }

    // Simple pie chart simulation
    const pieChart = document.getElementById('pieChart');
    if (pieChart) {
        createPieChart(pieChart);
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
            updateChart(chartContainer, chartType);
        });
    });
}

function createLineChart(container) {
    // Simple SVG line chart
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 400 200');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    svg.appendChild(bg);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', (i * 50).toString());
        line.setAttribute('x2', '400');
        line.setAttribute('y2', (i * 50).toString());
        line.setAttribute('stroke', '#e9ecef');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    // Line path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 150 L 100 120 L 150 100 L 200 80 L 250 110 L 300 90 L 350 60');
    path.setAttribute('stroke', '#4a6bff');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    // Fill under line
    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fill.setAttribute('d', 'M 50 150 L 100 120 L 150 100 L 200 80 L 250 110 L 300 90 L 350 60 L 350 200 L 50 200 Z');
    fill.setAttribute('fill', 'rgba(74, 107, 255, 0.1)');
    svg.appendChild(fill);

    // Points
    const points = [
        { x: 50, y: 150 },
        { x: 100, y: 120 },
        { x: 150, y: 100 },
        { x: 200, y: 80 },
        { x: 250, y: 110 },
        { x: 300, y: 90 },
        { x: 350, y: 60 }
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

function createBarChart(container) {
    // Simple SVG bar chart
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 400 200');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', 'transparent');
    svg.appendChild(bg);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', (i * 50).toString());
        line.setAttribute('x2', '400');
        line.setAttribute('y2', (i * 50).toString());
        line.setAttribute('stroke', '#e9ecef');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    // Bars
    const bars = [
        { x: 50, height: 120, color: '#4a6bff' },
        { x: 120, height: 150, color: '#6a8bff' },
        { x: 190, height: 80, color: '#8aabff' },
        { x: 260, height: 180, color: '#4a6bff' },
        { x: 330, height: 100, color: '#6a8bff' }
    ];

    bars.forEach(bar => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (bar.x - 25).toString());
        rect.setAttribute('y', (200 - bar.height).toString());
        rect.setAttribute('width', '50');
        rect.setAttribute('height', bar.height.toString());
        rect.setAttribute('fill', bar.color);
        rect.setAttribute('rx', '4');
        rect.setAttribute('ry', '4');
        svg.appendChild(rect);
    });

    container.appendChild(svg);
}

function createPieChart(container) {
    // Simple SVG pie chart
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
        { value: 35, color: '#4a6bff' },
        { value: 25, color: '#6a8bff' },
        { value: 20, color: '#8aabff' },
        { value: 20, color: '#aacbff' }
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

    container.appendChild(svg);
}

function updateChart(container, chartType) {
    // Clear container
    container.innerHTML = '';

    // Create new chart based on type
    switch (chartType) {
        case 'line':
            createLineChart(container);
            break;
        case 'bar':
            createBarChart(container);
            break;
        case 'pie':
            createPieChart(container);
            break;
        default:
            createLineChart(container);
    }
}

// ============================================
// Data Table
// ============================================

function initializeDataTable() {
    const table = document.querySelector('.data-table');
    if (!table) return;

    // Row selection
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't select if clicking on action buttons
            if (e.target.closest('.action-btn')) return;

            // Remove selected class from all rows
            rows.forEach(r => r.classList.remove('selected'));
            
            // Add selected class to clicked row
            this.classList.add('selected');
        });
    });

    // Pagination
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    const pageBtns = document.querySelectorAll('.pagination-btn:not(:first-child):not(:last-child)');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const current = document.querySelector('.pagination-btn.active');
            if (current && current.previousElementSibling && !current.previousElementSibling.disabled) {
                current.classList.remove('active');
                current.previousElementSibling.classList.add('active');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const current = document.querySelector('.pagination-btn.active');
            if (current && current.nextElementSibling && !current.nextElementSibling.disabled) {
                current.classList.remove('active');
                current.nextElementSibling.classList.add('active');
            }
        });
    }

    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search
    const searchInput = document.querySelector('.table-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// ============================================
// Projects
// ============================================

function initializeProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Animate progress bars
        const progressBar = card.querySelector('.progress-bar-fill');
        if (progressBar) {
            const width = progressBar.style.width || '0%';
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }

        // Project menu toggle
        const projectMenu = card.querySelector('.project-menu');
        if (projectMenu) {
            projectMenu.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleProjectMenu(this);
            });
        }
    });

    // Close project menu when clicking outside
    document.addEventListener('click', function() {
        const menus = document.querySelectorAll('.project-menu-wrapper');
        menus.forEach(menu => {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    });
}

function toggleProjectMenu(button) {
    const menu = button.querySelector('.project-menu-wrapper');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// ============================================
// Activity Feed
// ============================================

function initializeActivityFeed() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    // Add animation on load
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============================================
// Quick Actions
// ============================================

function initializeQuickActions() {
    const quickActions = document.querySelectorAll('.quick-action');
    
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            handleQuickAction(actionType);
        });
    });
}

function handleQuickAction(actionType) {
    switch (actionType) {
        case 'new-project':
            openModal('new-project-modal');
            break;
        case 'new-user':
            openModal('new-user-modal');
            break;
        case 'analytics':
            window.location.href = 'analytics.html';
            break;
        case 'settings':
            window.location.href = 'settings.html';
            break;
        default:
            console.log('Action:', actionType);
    }
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
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// ============================================
// Search
// ============================================

function initializeSearch() {
    const searchInput = document.querySelector('.header-search input');
    if (!searchInput) return;

    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('active');
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('active');
    });

    // Global search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) return;

        // Search in sidebar
        const navItems = document.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.closest('.nav-item').style.display = '';
            } else {
                item.closest('.nav-item').style.display = 'none';
            }
        });
    });
}

// ============================================
// Responsive
// ============================================

function initializeResponsive() {
    // Check screen size and adjust layout
    checkScreenSize();
    
    window.addEventListener('resize', debounce(checkScreenSize, 100));
}

function checkScreenSize() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 1200) {
        if (sidebar) sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('expanded');
    } else {
        if (sidebar) sidebar.classList.remove('collapsed');
        if (sidebar) sidebar.classList.remove('open');
        if (mainContent) mainContent.classList.remove('expanded');
    }
}

// ============================================
// Utility Functions
// ============================================

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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ============================================
// Authentication
// ============================================

function logout() {
    // Clear session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    window.location.href = '../../pages/auth/login.html';
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../pages/auth/login.html';
        return false;
    }
    return true;
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
        formatNumber,
        formatDate,
        formatCurrency,
        logout,
        checkAuth
    };
}
