/**
 * Bigsite Shopping Cart API
 * Handles cart operations, wishlist, and checkout
 */

class CartAPI {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('bigsite_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('bigsite_wishlist')) || [];
        this.loadCart();
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('bigsite_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('bigsite_wishlist')) || [];
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        localStorage.setItem('bigsite_cart', JSON.stringify(this.cart));
    }

    /**
     * Save wishlist to localStorage
     */
    saveWishlist() {
        localStorage.setItem('bigsite_wishlist', JSON.stringify(this.wishlist));
    }

    /**
     * Get all items in cart
     */
    getCart() {
        return this.cart;
    }

    /**
     * Get cart item count
     */
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Get cart subtotal
     */
    getCartSubtotal() {
        return this.cart.reduce((total, item) => {
            const price = item.onSale ? item.salePrice : item.price;
            return total + (price * item.quantity);
        }, 0);
    }

    /**
     * Get cart total with tax and shipping
     */
    getCartTotal(taxRate = 0.08, shippingCost = 0) {
        const subtotal = this.getCartSubtotal();
        const tax = subtotal * taxRate;
        return subtotal + tax + shippingCost;
    }

    /**
     * Add item to cart
     */
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity
            });
        }
        
        this.saveCart();
        return this.cart;
    }

    /**
     * Remove item from cart
     */
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        return this.cart;
    }

    /**
     * Update item quantity in cart
     */
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
        
        return this.cart;
    }

    /**
     * Clear cart
     */
    clearCart() {
        this.cart = [];
        this.saveCart();
        return this.cart;
    }

    /**
     * Get all items in wishlist
     */
    getWishlist() {
        return this.wishlist;
    }

    /**
     * Add item to wishlist
     */
    addToWishlist(product) {
        const existingItem = this.wishlist.find(item => item.id === product.id);
        
        if (!existingItem) {
            this.wishlist.push(product);
            this.saveWishlist();
        }
        
        return this.wishlist;
    }

    /**
     * Remove item from wishlist
     */
    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        return this.wishlist;
    }

    /**
     * Check if item is in wishlist
     */
    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    /**
     * Move item from wishlist to cart
     */
    moveToCart(productId) {
        const item = this.wishlist.find(wishlistItem => wishlistItem.id === productId);
        
        if (item) {
            this.addToCart(item);
            this.removeFromWishlist(productId);
        }
        
        return {
            cart: this.cart,
            wishlist: this.wishlist
        };
    }

    /**
     * Checkout - process cart
     */
    async checkout(checkoutData) {
        try {
            const order = {
                items: this.cart,
                subtotal: this.getCartSubtotal(),
                tax: this.getCartSubtotal() * 0.08,
                shipping: checkoutData.shippingMethod === 'express' ? 12.99 : 5.99,
                total: this.getCartTotal(0.08, checkoutData.shippingMethod === 'express' ? 12.99 : 5.99),
                shippingAddress: checkoutData.shippingAddress,
                billingAddress: checkoutData.billingAddress,
                paymentMethod: checkoutData.paymentMethod,
                customerEmail: checkoutData.email,
                date: new Date().toISOString()
            };

            // Simulate API call
            const response = await fetch('https://api.bigsite.com/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error('Checkout failed');
            }

            const result = await response.json();
            this.clearCart();
            
            return result;
        } catch (error) {
            console.error('Error during checkout:', error);
            throw error;
        }
    }

    /**
     * Calculate shipping cost
     */
    calculateShipping(weight, destination, method = 'standard') {
        // Base rates
        const rates = {
            standard: {
                domestic: 5.99,
                international: 15.99
            },
            express: {
                domestic: 12.99,
                international: 25.99
            },
            overnight: {
                domestic: 24.99,
                international: null // Not available
            }
        };

        // Check if destination is international
        const isInternational = destination !== 'US' && destination !== 'USA';

        // Get rate based on method and destination
        const rateKey = isInternational ? 'international' : 'domestic';
        const shippingRate = rates[method][rateKey];

        if (shippingRate === null) {
            return null; // Not available
        }

        // Add weight-based surcharge
        let surcharge = 0;
        if (weight > 5) {
            surcharge = Math.ceil((weight - 5) / 2) * 2.50;
        }

        return shippingRate + surcharge;
    }

    /**
     * Calculate tax
     */
    calculateTax(subtotal, taxRate = 0.08) {
        return subtotal * taxRate;
    }

    /**
     * Apply coupon code
     */
    applyCoupon(code, subtotal) {
        const coupons = {
            'SAVE10': { discount: 0.10, minPurchase: 50 },
            'SAVE20': { discount: 0.20, minPurchase: 100 },
            'FREESHIP': { discount: 0, minPurchase: 0, freeShipping: true }
        };

        const coupon = coupons[code];
        
        if (!coupon) {
            return { valid: false, error: 'Invalid coupon code' };
        }

        if (subtotal < coupon.minPurchase) {
            return { valid: false, error: `Minimum purchase of $${coupon.minPurchase} required` };
        }

        const discount = subtotal * (coupon.discount || 0);
        
        return {
            valid: true,
            discount,
            freeShipping: coupon.freeShipping || false
        };
    }

    /**
     * Get cart summary
     */
    getCartSummary() {
        const subtotal = this.getCartSubtotal();
        const tax = this.calculateTax(subtotal);
        const shipping = 5.99; // Default standard shipping
        const total = subtotal + tax + shipping;

        return {
            count: this.getCartCount(),
            subtotal,
            tax,
            shipping,
            total
        };
    }

    /**
     * Get shipping methods
     */
    getShippingMethods(destination) {
        const isInternational = destination !== 'US' && destination !== 'USA';
        
        return [
            {
                id: 'standard',
                name: 'Standard Shipping',
                cost: isInternational ? 15.99 : 5.99,
                estimatedDelivery: isInternational ? '10-20 business days' : '5-7 business days',
                available: true
            },
            {
                id: 'express',
                name: 'Express Shipping',
                cost: isInternational ? 25.99 : 12.99,
                estimatedDelivery: isInternational ? '5-10 business days' : '2-3 business days',
                available: true
            },
            {
                id: 'overnight',
                name: 'Overnight Shipping',
                cost: 24.99,
                estimatedDelivery: '1 business day',
                available: !isInternational
            }
        ];
    }

    /**
     * Get payment methods
     */
    getPaymentMethods() {
        return [
            {
                id: 'credit_card',
                name: 'Credit Card',
                description: 'Visa, MasterCard, American Express, Discover',
                icon: 'fa-credit-card'
            },
            {
                id: 'paypal',
                name: 'PayPal',
                description: 'Pay with your PayPal account',
                icon: 'fa-paypal'
            },
            {
                id: 'apple_pay',
                name: 'Apple Pay',
                description: 'Pay with Apple Pay',
                icon: 'fa-apple'
            },
            {
                id: 'google_pay',
                name: 'Google Pay',
                description: 'Pay with Google Pay',
                icon: 'fa-google'
            }
        ];
    }
}

// Initialize the CartAPI
const cartAPI = new CartAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartAPI;
}
