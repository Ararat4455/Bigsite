/**
 * Bigsite Authentication API
 * Handles user authentication, registration, and session management
 */

class AuthAPI {
    constructor() {
        this.baseUrl = 'https://api.bigsite.com/v1/auth';
        this.currentUser = null;
        this.token = localStorage.getItem('token') || null;
        this.loadUser();
    }

    /**
     * Load user from localStorage if token exists
     */
    async loadUser() {
        if (this.token) {
            try {
                this.currentUser = await this.getCurrentUser();
            } catch (error) {
                console.error('Error loading user:', error);
                this.logout();
            }
        }
    }

    /**
     * Register a new user
     */
    async register(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            
            const data = await response.json();
            this.token = data.token;
            this.currentUser = data.user;
            
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            
            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    /**
     * Login user
     */
    async login(credentials) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            
            const data = await response.json();
            this.token = data.token;
            this.currentUser = data.user;
            
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            
            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.token = null;
        this.currentUser = null;
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        return true;
    }

    /**
     * Get current user
     */
    async getCurrentUser() {
        if (!this.token) {
            throw new Error('No authentication token');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to get current user');
            }
            
            const user = await response.json();
            this.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
            
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    /**
     * Verify email
     */
    async verifyEmail(token) {
        try {
            const response = await fetch(`${this.baseUrl}/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            
            if (!response.ok) {
                throw new Error('Email verification failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }

    /**
     * Forgot password - request reset link
     */
    async forgotPassword(email) {
        try {
            const response = await fetch(`${this.baseUrl}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send password reset link');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error requesting password reset:', error);
            throw error;
        }
    }

    /**
     * Reset password
     */
    async resetPassword(token, newPassword) {
        try {
            const response = await fetch(`${this.baseUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });
            
            if (!response.ok) {
                throw new Error('Password reset failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }

    /**
     * Change password (for authenticated users)
     */
    async changePassword(currentPassword, newPassword) {
        if (!this.token) {
            throw new Error('Not authenticated');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            
            if (!response.ok) {
                throw new Error('Password change failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(updates) {
        if (!this.token) {
            throw new Error('Not authenticated');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(updates)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            
            const user = await response.json();
            this.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
            
            return user;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.token && !!this.currentUser;
    }

    /**
     * Check if user has a specific role
     */
    hasRole(role) {
        if (!this.currentUser) {
            return false;
        }
        return this.currentUser.roles && this.currentUser.roles.includes(role);
    }

    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.hasRole('admin');
    }

    /**
     * Refresh token
     */
    async refreshToken() {
        if (!this.token) {
            throw new Error('No token to refresh');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/refresh`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Token refresh failed');
            }
            
            const data = await response.json();
            this.token = data.token;
            localStorage.setItem('token', this.token);
            
            return data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    /**
     * Validate password strength
     */
    validatePassword(password) {
        const errors = [];
        
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Generate password strength meter
     */
    getPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        if (strength <= 2) return 'Weak';
        if (strength <= 4) return 'Medium';
        if (strength <= 6) return 'Strong';
        return 'Very Strong';
    }
}

// Initialize the AuthAPI
const authAPI = new AuthAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthAPI;
}
