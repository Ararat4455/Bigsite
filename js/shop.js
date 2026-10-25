/**
 * Bigsite - Shop JavaScript
 * Handles all e-commerce functionality including product filtering, cart, quick view, etc.
 */

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    initializeProductGrid();
    initializeFilters();
    initializeQuickView();
    initializeSorting();
    initializePagination();
    initializeViewToggle();
    initializeWishlist();
    initializeNewsletter();
    initializeThemeToggle();
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
// Cart
// ============================================

let cart = [];

function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Initialize cart sidebar
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartToggle = document.querySelectorAll('.cart-toggle');
    const cartClose = document.querySelector('.cart-close');
    const cartCheckoutBtn = document.querySelector('.cart-checkout-btn');

    // Toggle cart sidebar
    cartToggle.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCartSidebar();
        });
    });

    // Close cart sidebar
    if (cartClose) {
        cartClose.addEventListener('click', closeCartSidebar);
    }

    // Close cart when clicking outside
    if (cartSidebar) {
        cartSidebar.addEventListener('click', function(e) {
            if (e.target === cartSidebar) {
                closeCartSidebar();
            }
        });
    }

    // Checkout button
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }

    // Update cart UI
    updateCartUI();
    updateCartCount();
}

function toggleCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
    }
}

function openCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

function addToCart(button, productId = null, productData = null) {
    let product;

    if (productData) {
        product = productData;
    } else {
        // Extract product data from DOM
        const productCard = button.closest('.product-card');
        product = extractProductFromCard(productCard);
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update UI
    updateCartUI();
    updateCartCount();

    // Show feedback
    showNotification('Product added to cart!', 'success');

    // Change button state
    if (button) {
        button.classList.add('added');
        button.innerHTML = '<i class="fas fa-check"></i> Added';

        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> <span>Add to Cart</span>';
        }, 2000);
    }

    // Open cart sidebar briefly
    openCartSidebar();
}

function removeFromCart(productId, element = null) {
    cart = cart.filter(item => item.id !== productId);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update UI
    updateCartUI();
    updateCartCount();

    // Show feedback
    showNotification('Product removed from cart!', 'error');

    // If element provided, remove its parent
    if (element) {
        const cartItem = element.closest('.cart-item');
        if (cartItem) {
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                cartItem.remove();
            }, 300);
        }
    }
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        if (totalItems > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

function updateCartUI() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartSubtotal = document.querySelector('.cart-subtotal span:last-child');

    if (!cartItemsContainer) return;

    // Clear container
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // Show empty state
        if (cartEmpty) {
            cartEmpty.style.display = 'block';
        }
        if (cartSubtotal) {
            cartSubtotal.textContent = '$0.00';
        }
        return;
    }

    // Hide empty state
    if (cartEmpty) {
        cartEmpty.style.display = 'none';
    }

    // Add cart items
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });

    // Update subtotal
    if (cartSubtotal) {
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);
        cartSubtotal.textContent = formatCurrency(subtotal);
    }
}

function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.dataset.productId = item.id;

    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.category || ''}</p>
            <div class="cart-item-price">${item.price}</div>
            <div class="cart-item-qty">
                <button onclick="updateQuantity('${item.id}', -1, this)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value - ${item.quantity}, this)">
                <button onclick="updateQuantity('${item.id}', 1, this)">+</button>
            </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}', this)">
            <i class="fas fa-trash"></i>
        </button>
    `;

    return div;
}

function updateQuantity(productId, change, element = null) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    // Ensure quantity is at least 1
    if (cart[itemIndex].quantity < 1) {
        cart[itemIndex].quantity = 1;
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update UI
    updateCartUI();
    updateCartCount();

    // Update input value if element provided
    if (element) {
        const input = element.closest('.cart-item-qty').querySelector('input');
        if (input) {
            input.value = cart[itemIndex].quantity;
        }
    }
}

function extractProductFromCard(card) {
    if (!card) return null;

    const image = card.querySelector('.product-image img')?.src || '';
    const name = card.querySelector('h3')?.textContent || '';
    const category = card.querySelector('.product-category')?.textContent || '';
    const price = card.querySelector('.current-price')?.textContent || '';
    const originalPrice = card.querySelector('.original-price')?.textContent || '';
    const id = card.dataset.productId || generateProductId(name);

    return {
        id,
        name,
        category,
        price,
        originalPrice,
        image,
        rating: card.querySelector('.product-rating span')?.textContent || '0'
    };
}

function generateProductId(name) {
    return name.toLowerCase().replace(/\s+/g, '-').substring(0, 20);
}

// ============================================
// Product Grid
// ============================================

function initializeProductGrid() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Add click handler for add to cart
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(this);
            });
        }

        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        // Animate on load
        animateProductCard(this);
    });
}

function animateProductCard(card, delay = 0) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, delay);
}

// ============================================
// Filters
// ============================================

function initializeFilters() {
    const filterToggles = document.querySelectorAll('.filter-section h4');
    const priceRangeInputs = document.querySelectorAll('.filter-price-range input');
    const filterButtons = document.querySelectorAll('.filter-option input');
    const applyFilterBtn = document.querySelector('.filter-actions .btn-primary');
    const clearFilterBtn = document.querySelector('.filter-actions .btn-outline');

    // Toggle filter sections
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const section = this.closest('.filter-section');
            const options = section.querySelector('.filter-options');
            const icon = this.querySelector('i');

            if (options) {
                const isExpanded = options.style.display !== 'none';
                options.style.display = isExpanded ? 'none' : 'flex';
                
                if (icon) {
                    icon.className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                }
            }
        });
    });

    // Price range filter
    priceRangeInputs.forEach(input => {
        input.addEventListener('input', function() {
            const minInput = document.getElementById('price-min');
            const maxInput = document.getElementById('price-max');
            
            if (minInput && maxInput) {
                const min = parseFloat(minInput.value) || 0;
                const max = parseFloat(maxInput.value) || 1000;
                
                if (min > max) {
                    if (this === minInput) {
                        maxInput.value = min;
                    } else {
                        minInput.value = max;
                    }
                }
            }
        });
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('change', function() {
            applyFilters();
        });
    });

    // Apply filters button
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }

    // Clear filters button
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearFilters);
    }

    // Search in filters
    const filterSearchInputs = document.querySelectorAll('.filter-search input');
    filterSearchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const section = this.closest('.filter-section');
            const options = section.querySelectorAll('.filter-option');

            options.forEach(option => {
                const label = option.querySelector('label')?.textContent.toLowerCase();
                if (label.includes(searchTerm)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    });
}

function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    const categoryFilters = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    const priceMin = parseFloat(document.getElementById('price-min')?.value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max')?.value) || 10000;
    const ratingFilter = document.querySelector('.filter-option input[type="radio"]:checked')?.value || 'all';

    products.forEach(product => {
        const productCategory = product.dataset.category || '';
        const productPrice = parseFloat(product.querySelector('.current-price')?.textContent.replace(/[^\d.]/g, '')) || 0;
        const productRating = parseFloat(product.querySelector('.product-rating span')?.textContent) || 0;

        let show = true;

        // Category filter
        if (categoryFilters.length > 0 && !categoryFilters.includes(productCategory)) {
            show = false;
        }

        // Price filter
        if (productPrice < priceMin || productPrice > priceMax) {
            show = false;
        }

        // Rating filter
        if (ratingFilter !== 'all') {
            const minRating = parseFloat(ratingFilter);
            if (productRating < minRating) {
                show = false;
            }
        }

        product.style.display = show ? '' : 'none';
    });

    // Update product count
    const visibleProducts = Array.from(products).filter(p => p.style.display !== 'none').length;
    const productCountElement = document.querySelector('.product-count');
    if (productCountElement) {
        productCountElement.textContent = `${visibleProducts} products found`;
    }
}

function clearFilters() {
    // Clear all checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Clear radio buttons
    document.querySelectorAll('.filter-option input[type="radio"]').forEach(rb => {
        rb.checked = false;
    });

    // Clear price inputs
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin) priceMin.value = '';
    if (priceMax) priceMax.value = '';

    // Clear search inputs
    document.querySelectorAll('.filter-search input').forEach(input => {
        input.value = '';
    });

    // Show all products
    document.querySelectorAll('.product-card').forEach(product => {
        product.style.display = '';
    });

    // Update product count
    const productCountElement = document.querySelector('.product-count');
    if (productCountElement) {
        const totalProducts = document.querySelectorAll('.product-card').length;
        productCountElement.textContent = `${totalProducts} products found`;
    }

    // Show notification
    showNotification('Filters cleared!', 'info');
}

// ============================================
// Quick View Modal
// ============================================

function initializeQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modal = document.querySelector('.quick-view-modal');
    const modalClose = document.querySelector('.quick-view-close');
    const modalOverlay = document.querySelector('.quick-view-modal');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            openQuickView(productCard);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeQuickView);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeQuickView();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickView();
        }
    });

    // Thumbnail navigation
    const thumbnails = document.querySelectorAll('.quick-view-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImage = this.closest('.quick-view-gallery').querySelector('.quick-view-main-image img');
            const newSrc = this.querySelector('img').src;
            
            if (mainImage && newSrc) {
                mainImage.src = newSrc;
            }

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add to cart from quick view
    const quickViewAddToCart = document.querySelector('.quick-view-actions .btn-primary');
    if (quickViewAddToCart) {
        quickViewAddToCart.addEventListener('click', function() {
            const productData = getCurrentQuickViewProduct();
            if (productData) {
                addToCart(null, null, productData);
                closeQuickView();
            }
        });
    }

    // Quantity input in quick view
    const quickViewQtyInput = document.querySelector('.quick-view-quantity input');
    if (quickViewQtyInput) {
        quickViewQtyInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                value = 1;
            }
            this.value = value;
        });
    }
}

function openQuickView(productCard) {
    const modal = document.querySelector('.quick-view-modal');
    if (!modal) return;

    const product = extractProductFromCard(productCard);
    if (!product) return;

    // Set product data
    setQuickViewProduct(product);

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function setQuickViewProduct(product) {
    const modal = document.querySelector('.quick-view-modal');
    if (!modal) return;

    const content = modal.querySelector('.quick-view-content');
    
    // Update gallery
    const mainImage = content.querySelector('.quick-view-main-image img');
    const thumbnailsContainer = content.querySelector('.quick-view-thumbnails');
    
    if (mainImage) {
        mainImage.src = product.image;
    }

    // Update thumbnails (simple implementation - just duplicate main image)
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const thumb = document.createElement('div');
            thumb.className = 'quick-view-thumbnail';
            if (i === 0) thumb.classList.add('active');
            thumb.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
            thumbnailsContainer.appendChild(thumb);
        }
    }

    // Update details
    const category = content.querySelector('.quick-view-category');
    const title = content.querySelector('.quick-view-details h3');
    const price = content.querySelector('.quick-view-price .current-price');
    const originalPrice = content.querySelector('.quick-view-price .original-price');
    const rating = content.querySelector('.quick-view-rating');
    const description = content.querySelector('.quick-view-description');
    const meta = content.querySelector('.quick-view-meta');

    if (category) category.textContent = product.category || 'Category';
    if (title) title.textContent = product.name;
    if (price) price.textContent = product.price;
    if (originalPrice) {
        originalPrice.textContent = product.originalPrice || '';
        if (!product.originalPrice) {
            originalPrice.style.display = 'none';
        } else {
            originalPrice.style.display = 'inline';
        }
    }

    if (rating) {
        const stars = rating.querySelector('.stars');
        const ratingText = rating.querySelector('span');
        if (stars) {
            const ratingValue = parseFloat(product.rating) || 0;
            const fullStars = Math.floor(ratingValue);
            const hasHalfStar = ratingValue % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

            stars.innerHTML = '';
            for (let i = 0; i < fullStars; i++) {
                stars.innerHTML += '<i class="fas fa-star"></i>';
            }
            if (hasHalfStar) {
                stars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            for (let i = 0; i < emptyStars; i++) {
                stars.innerHTML += '<i class="far fa-star"></i>';
            }
        }
        if (ratingText) {
            ratingText.textContent = `(${product.rating || '0'})`;
        }
    }

    if (description) {
        description.textContent = product.description || 'No description available.';
    }

    // Update meta information
    if (meta) {
        const metaItems = meta.querySelectorAll('.quick-view-meta-item');
        if (metaItems.length >= 2) {
            metaItems[0].querySelector('span:last-child').textContent = product.category || 'N/A';
            metaItems[1].querySelector('span:last-child').textContent = product.id || 'N/A';
        }
    }

    // Store product data for add to cart
    content.dataset.productId = product.id;
    content.dataset.productPrice = product.price;
    content.dataset.productName = product.name;
    content.dataset.productImage = product.image;
}

function getCurrentQuickViewProduct() {
    const content = document.querySelector('.quick-view-content');
    if (!content) return null;

    return {
        id: content.dataset.productId || generateProductId('quick-view-product'),
        name: content.dataset.productName || 'Product',
        price: content.dataset.productPrice || '$0.00',
        image: content.dataset.productImage || '',
        category: content.querySelector('.quick-view-category')?.textContent || '',
        rating: content.querySelector('.quick-view-rating span')?.textContent || '0'
    };
}

// ============================================
// Sorting
// ============================================

function initializeSorting() {
    const sortSelect = document.querySelector('.shop-nav-sort select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function sortProducts(sortBy) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;

    const products = Array.from(productsContainer.querySelectorAll('.product-card'));
    
    // Detach all products
    products.forEach(p => productsContainer.removeChild(p));

    // Sort products
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.current-price')?.textContent.replace(/[^\d.]/g, '')) || 0;
        const priceB = parseFloat(b.querySelector('.current-price')?.textContent.replace(/[^\d.]/g, '')) || 0;
        const ratingA = parseFloat(a.querySelector('.product-rating span')?.textContent) || 0;
        const ratingB = parseFloat(b.querySelector('.product-rating span')?.textContent) || 0;
        const nameA = a.querySelector('h3')?.textContent.toLowerCase() || '';
        const nameB = b.querySelector('h3')?.textContent.toLowerCase() || '';

        switch (sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'rating':
                return ratingB - ratingA;
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });

    // Re-append sorted products
    products.forEach(p => productsContainer.appendChild(p));

    // Re-animate
    products.forEach((p, i) => {
        animateProductCard(p, i * 50);
    });
}

// ============================================
// Pagination
// ============================================

function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled') || this.classList.contains('active')) return;

            // Remove active class from all buttons
            paginationBtns.forEach(b => {
                if (b.classList.contains('active')) {
                    b.classList.remove('active');
                }
            });

            // Add active class to clicked button
            if (!this.classList.contains('disabled')) {
                this.classList.add('active');
            }

            // Load page (simplified)
            const page = this.textContent;
            if (page === '«') {
                // Previous page
                const currentActive = document.querySelector('.pagination-btn.active');
                if (currentActive && currentActive.previousElementSibling) {
                    currentActive.previousElementSibling.click();
                }
            } else if (page === '»') {
                // Next page
                const currentActive = document.querySelector('.pagination-btn.active');
                if (currentActive && currentActive.nextElementSibling) {
                    currentActive.nextElementSibling.click();
                }
            }
        });
    });
}

// ============================================
// View Toggle
// ============================================

function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.shop-nav-view-btn');
    const productsGrid = document.querySelector('.products-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Toggle grid/list view
            if (this.classList.contains('grid-view')) {
                productsGrid.classList.remove('list-view');
            } else if (this.classList.contains('list-view')) {
                productsGrid.classList.add('list-view');
            }

            // Re-animate products
            const products = productsGrid.querySelectorAll('.product-card');
            products.forEach((p, i) => {
                animateProductCard(p, i * 50);
            });
        });
    });
}

// ============================================
// Wishlist
// ============================================

let wishlist = [];

function initializeWishlist() {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }

    // Update wishlist buttons
    updateWishlistButtons();

    // Add click handlers to wishlist buttons
    const wishlistBtns = document.querySelectorAll('.wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleWishlist(this);
        });
    });
}

function toggleWishlist(button) {
    const productCard = button.closest('.product-card');
    const product = extractProductFromCard(productCard);

    if (!product) return;

    const existingIndex = wishlist.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        button.classList.remove('active');
        showNotification('Removed from wishlist!', 'error');
    } else {
        // Add to wishlist
        wishlist.push(product);
        button.classList.add('active');
        showNotification('Added to wishlist!', 'success');
    }

    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update all wishlist buttons
    updateWishlistButtons();
}

function updateWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist');
    
    wishlistBtns.forEach(btn => {
        const productCard = btn.closest('.product-card');
        const product = extractProductFromCard(productCard);

        if (!product) return;

        const isInWishlist = wishlist.some(item => item.id === product.id);
        btn.classList.toggle('active', isInWishlist);
    });
}

// ============================================
// Newsletter
// ============================================

function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value;

            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
// Notifications
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

// ============================================
// Utility Functions
// ============================================

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
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        sortProducts,
        applyFilters,
        clearFilters,
        formatCurrency,
        getNotificationIcon,
        getNotificationColor
    };
}
