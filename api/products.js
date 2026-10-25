/**
 * Bigsite Products API
 * Handles all product-related operations
 */

class ProductAPI {
    constructor() {
        this.baseUrl = 'https://api.bigsite.com/v1';
        this.products = [];
        this.categories = [];
        this.loadProducts();
    }

    /**
     * Load products from localStorage or default data
     */
    async loadProducts() {
        try {
            const cachedProducts = localStorage.getItem('bigsite_products');
            if (cachedProducts) {
                this.products = JSON.parse(cachedProducts);
            } else {
                await this.fetchProducts();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            await this.fetchProducts();
        }
    }

    /**
     * Fetch products from the server
     */
    async fetchProducts() {
        try {
            // Simulate API call
            const response = await fetch(`${this.baseUrl}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            this.products = await response.json();
            localStorage.setItem('bigsite_products', JSON.stringify(this.products));
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to local data
            this.products = this.getDefaultProducts();
        }
    }

    /**
     * Get default products (fallback data)
     */
    getDefaultProducts() {
        return [
            {
                id: 1,
                name: 'Premium Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation',
                price: 199.99,
                category: 'Electronics',
                stock: 50,
                rating: 4.8,
                image: '/images/products/headphones.jpg',
                featured: true,
                new: false,
                onSale: false,
                salePrice: null
            },
            {
                id: 2,
                name: 'Smart Watch Pro',
                description: 'Smart watch with fitness tracking and heart rate monitor',
                price: 249.99,
                category: 'Electronics',
                stock: 30,
                rating: 4.5,
                image: '/images/products/smartwatch.jpg',
                featured: true,
                new: true,
                onSale: false,
                salePrice: null
            },
            {
                id: 3,
                name: 'Bluetooth Speaker',
                description: 'Portable Bluetooth speaker with 20-hour battery life',
                price: 89.99,
                category: 'Electronics',
                stock: 100,
                rating: 4.7,
                image: '/images/products/speaker.jpg',
                featured: false,
                new: false,
                onSale: true,
                salePrice: 74.99
            },
            {
                id: 4,
                name: 'Wireless Charger',
                description: 'Fast wireless charger compatible with all devices',
                price: 29.99,
                category: 'Accessories',
                stock: 200,
                rating: 4.3,
                image: '/images/products/charger.jpg',
                featured: false,
                new: false,
                onSale: false,
                salePrice: null
            },
            {
                id: 5,
                name: 'Laptop Backpack',
                description: 'Water-resistant laptop backpack with USB charging port',
                price: 49.99,
                category: 'Accessories',
                stock: 75,
                rating: 4.6,
                image: '/images/products/backpack.jpg',
                featured: true,
                new: false,
                onSale: false,
                salePrice: null
            },
            {
                id: 6,
                name: 'Mechanical Keyboard',
                description: 'RGB mechanical keyboard with customizable keys',
                price: 129.99,
                category: 'Electronics',
                stock: 45,
                rating: 4.9,
                image: '/images/products/keyboard.jpg',
                featured: false,
                new: true,
                onSale: false,
                salePrice: null
            },
            {
                id: 7,
                name: '4K Webcam',
                description: 'High-definition 4K webcam with built-in microphone',
                price: 149.99,
                category: 'Electronics',
                stock: 25,
                rating: 4.4,
                image: '/images/products/webcam.jpg',
                featured: false,
                new: false,
                onSale: true,
                salePrice: 129.99
            },
            {
                id: 8,
                name: 'Gaming Mouse',
                description: 'Professional gaming mouse with 16,000 DPI sensor',
                price: 59.99,
                category: 'Accessories',
                stock: 150,
                rating: 4.7,
                image: '/images/products/mouse.jpg',
                featured: true,
                new: false,
                onSale: false,
                salePrice: null
            }
        ];
    }

    /**
     * Get all products
     */
    getAllProducts() {
        return this.products;
    }

    /**
     * Get featured products
     */
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    /**
     * Get new products
     */
    getNewProducts() {
        return this.products.filter(product => product.new);
    }

    /**
     * Get products on sale
     */
    getSaleProducts() {
        return this.products.filter(product => product.onSale);
    }

    /**
     * Get products by category
     */
    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    /**
     * Get product by ID
     */
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    /**
     * Search products
     */
    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Filter products by price range
     */
    filterByPrice(minPrice, maxPrice) {
        return this.products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }

    /**
     * Sort products
     */
    sortProducts(products, sortBy, sortOrder = 'asc') {
        const sortedProducts = [...products];
        
        sortedProducts.sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'rating':
                    comparison = a.rating - b.rating;
                    break;
                case 'new':
                    comparison = b.new - a.new;
                    break;
                case 'sale':
                    comparison = b.onSale - a.onSale;
                    break;
                default:
                    comparison = 0;
            }
            
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        
        return sortedProducts;
    }

    /**
     * Get categories
     */
    getCategories() {
        const uniqueCategories = [...new Set(this.products.map(product => product.category))];
        return uniqueCategories.map(category => ({
            name: category,
            count: this.products.filter(product => product.category === category).length
        }));
    }

    /**
     * Add a new product
     */
    async addProduct(product) {
        try {
            const response = await fetch(`${this.baseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(product)
            });
            
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            
            const newProduct = await response.json();
            this.products.push(newProduct);
            localStorage.setItem('bigsite_products', JSON.stringify(this.products));
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    /**
     * Update a product
     */
    async updateProduct(id, updates) {
        try {
            const response = await fetch(`${this.baseUrl}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updates)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            
            const updatedProduct = await response.json();
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                this.products[index] = updatedProduct;
                localStorage.setItem('bigsite_products', JSON.stringify(this.products));
            }
            return updatedProduct;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    /**
     * Delete a product
     */
    async deleteProduct(id) {
        try {
            const response = await fetch(`${this.baseUrl}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            
            this.products = this.products.filter(product => product.id !== id);
            localStorage.setItem('bigsite_products', JSON.stringify(this.products));
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    /**
     * Update product stock
     */
    async updateStock(id, quantity) {
        try {
            const product = this.getProductById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            
            const updates = { stock: product.stock + quantity };
            return await this.updateProduct(id, updates);
        } catch (error) {
            console.error('Error updating stock:', error);
            throw error;
        }
    }
}

// Initialize the ProductAPI
const productAPI = new ProductAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductAPI;
}
