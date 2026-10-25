/**
 * Bigsite - Contact JavaScript File
 * Handles contact form functionality and validation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
    initPhoneMask();
    initFormAutoComplete();
    initFormSubmit();
    initFormSuccess();
    initFormError();
    initContactMap();
    initContactCards();
    initSocialLinks();
    initCopyToClipboard();
    initFormReset();
});

/**
 * Contact Form Initialization
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add form reset functionality
        contactForm.addEventListener('reset', function() {
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Clear previous errors
            clearFormErrors(form);
            
            // Validate required fields
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                }
            });
            
            // Validate email format
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                if (!validateEmail(emailField.value)) {
                    isValid = false;
                    showFieldError(emailField, 'Please enter a valid email address');
                }
            }
            
            // Validate phone format
            const phoneField = form.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value) {
                if (!validatePhone(phoneField.value)) {
                    isValid = false;
                    showFieldError(phoneField, 'Please enter a valid phone number');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector('.error-message');
                if (firstError) {
                    const field = firstError.previousElementSibling;
                    if (field) {
                        field.focus();
                    }
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'This field is required');
                } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
                    showFieldError(this, 'Please enter a valid email address');
                } else if (this.type === 'tel' && this.value && !validatePhone(this.value)) {
                    showFieldError(this, 'Please enter a valid phone number');
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    clearFieldError(this);
                } else if (this.type === 'email' && validateEmail(this.value)) {
                    clearFieldError(this);
                } else if (this.type === 'tel' && validatePhone(this.value)) {
                    clearFieldError(this);
                }
            });
        });
    });
}

/**
 * Field Validation Functions
 */
function validateField(field) {
    if (field.type === 'checkbox' || field.type === 'radio') {
        const name = field.name;
        const checked = field.form.querySelector(`[name="${name}"]:checked`);
        return checked !== null;
    }
    return field.value.trim() !== '';
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Simple phone validation - at least 7 digits
    const re = /^[\d\s\-\+\(\)]{7,}$/;
    return re.test(phone);
}

/**
 * Error Handling
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#dc3545';
    error.style.fontSize = '0.75rem';
    error.style.marginTop = '0.25rem';
    
    field.parentNode.insertBefore(error, field.nextSibling);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const error = field.nextElementSibling;
    if (error && error.className === 'error-message') {
        error.remove();
    }
}

function clearFormErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

/**
 * Phone Mask
 */
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formatted = '';
            
            if (value.length > 0) {
                formatted = '(' + value.substring(0, 3);
            }
            if (value.length > 3) {
                formatted += ') ' + value.substring(3, 6);
            }
            if (value.length > 6) {
                formatted += '-' + value.substring(6, 10);
            }
            
            e.target.value = formatted;
        });
    });
}

/**
 * Form Auto-complete
 */
function initFormAutoComplete() {
    const nameInput = document.querySelector('input[name="firstName"]');
    const emailInput = document.querySelector('input[type="email"]');
    
    if (nameInput) {
        nameInput.autocomplete = 'given-name';
    }
    
    const lastNameInput = document.querySelector('input[name="lastName"]');
    if (lastNameInput) {
        lastNameInput.autocomplete = 'family-name';
    }
    
    if (emailInput) {
        emailInput.autocomplete = 'email';
    }
    
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.autocomplete = 'tel';
    }
}

/**
 * Form Submission
 */
function initFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const formMessage = document.getElementById('formMessage');
            
            // Validate form
            if (!validateContactForm(this)) {
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                if (formMessage) {
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    formMessage.className = 'form-message success';
                }
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#28a745';
                
                // Restore button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    if (formMessage) {
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }
                }, 3000);
                
                // In a real implementation, you would send the data to your server
                console.log('Form submitted:', data);
                // sendContactForm(data);
            }, 1500);
        });
    }
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            showFieldError(field, 'This field is required');
        }
    });
    
    return isValid;
}

/**
 * Form Success Handling
 */
function initFormSuccess() {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        // Add styles for success message
        const style = document.createElement('style');
        style.textContent = `
            .form-message.success {
                background: #28a745;
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            .form-message.error {
                background: #dc3545;
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Form Error Handling
 */
function initFormError() {
    // This would handle server-side validation errors
    // In a real implementation, you would receive errors from the server
    // and display them to the user
}

/**
 * Contact Map
 */
function initContactMap() {
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        // Add error handling for map loading
        const iframe = mapContainer.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('error', function() {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'map-error';
                errorMsg.textContent = 'Map could not be loaded. Please try again later.';
                errorMsg.style.padding = '2rem';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.background = '#f8f9fa';
                errorMsg.style.color = '#6c757d';
                
                this.parentNode.appendChild(errorMsg);
                this.style.display = 'none';
            });
        }
    }
}

/**
 * Contact Cards
 */
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    if (contactCards.length > 0) {
        contactCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
            
            // Add click to copy functionality
            const copyBtn = this.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const textToCopy = this.querySelector('.card-value').textContent;
                    copyToClipboard(textToCopy);
                });
            }
        });
    }
}

/**
 * Social Links
 */
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            // Add target="_blank" if external
            if (link.href.includes('facebook') || 
                link.href.includes('twitter') || 
                link.href.includes('linkedin') || 
                link.href.includes('instagram') ||
                link.href.includes('youtube')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Add hover effects
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
}

/**
 * Copy to Clipboard
 */
function initCopyToClipboard() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    if (copyBtns.length > 0) {
        copyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-copy') || 
                                   this.previousElementSibling?.textContent || 
                                   this.parentNode.querySelector('.card-value')?.textContent;
                
                if (textToCopy) {
                    copyToClipboard(textToCopy);
                }
            });
        });
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Copied to clipboard!';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = 'var(--primary-color)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        toast.style.animation = 'slideIn 0.3s ease';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
        
        // Add CSS for toast
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

/**
 * Form Reset
 */
function initFormReset() {
    const resetBtns = document.querySelectorAll('button[type="reset"]');
    
    resetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Clear all error messages
            const errors = this.closest('form').querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
            
            // Reset field borders
            const fields = this.closest('form').querySelectorAll('input, textarea, select');
            fields.forEach(field => {
                field.style.borderColor = '';
            });
        });
    });
}

/**
 * Contact Info Click to Call/Email
 */
function initContactClickActions() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone click
            console.log('Phone clicked:', this.href);
        });
    });
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click
            console.log('Email clicked:', this.href);
        });
    });
}

/**
 * Form Character Counter
 */
function initCharacterCounter() {
    const textareas = document.querySelectorAll('textarea[data-max-length]');
    
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-max-length')) || 1000;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength}`;
        counter.style.fontSize = '0.75rem';
        counter.style.color = '#6c757d';
        counter.style.marginTop = '0.25rem';
        
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength) {
                counter.style.color = '#dc3545';
                this.value = this.value.substring(0, maxLength);
            } else {
                counter.style.color = '#6c757d';
            }
        });
    });
}

/**
 * Form Field Focus Effects
 */
function initFormFocusEffects() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(74, 107, 255, 0.25)';
            this.style.borderColor = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

/**
 * Form Auto-Save (for long forms)
 */
function initFormAutoSave() {
    const forms = document.querySelectorAll('form[data-auto-save]');
    
    forms.forEach(form => {
        const fields = form.querySelectorAll('input, textarea, select');
        let saveTimeout;
        
        fields.forEach(field => {
            field.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    saveFormData(form);
                }, 2000);
            });
        });
        
        // Load saved data
        loadFormData(form);
    });
}

function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    localStorage.setItem(`form-${form.id || 'auto-save'}`, JSON.stringify(data));
}

function loadFormData(form) {
    const savedData = localStorage.getItem(`form-${form.id || 'auto-save'}`);
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            for (const [key, value] of Object.entries(data)) {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        field.checked = field.value === value;
                    } else {
                        field.value = value;
                    }
                }
            }
        } catch (e) {
            console.error('Error loading form data:', e);
        }
    }
}

/**
 * Form Field Suggestions
 */
function initFormSuggestions() {
    const suggestFields = document.querySelectorAll('[data-suggestions]');
    
    suggestFields.forEach(field => {
        const suggestions = JSON.parse(field.getAttribute('data-suggestions') || '[]');
        const dropdown = document.createElement('div');
        dropdown.className = 'suggestions-dropdown';
        dropdown.style.display = 'none';
        dropdown.style.position = 'absolute';
        dropdown.style.background = 'white';
        dropdown.style.border = '1px solid #ddd';
        dropdown.style.borderRadius = '5px';
        dropdown.style.zIndex = '1000';
        dropdown.style.maxHeight = '200px';
        dropdown.style.overflowY = 'auto';
        
        field.parentNode.appendChild(dropdown);
        
        field.addEventListener('input', function() {
            dropdown.innerHTML = '';
            
            const value = this.value.toLowerCase();
            const matches = suggestions.filter(s => 
                s.toLowerCase().includes(value) && value !== s.toLowerCase()
            );
            
            if (matches.length > 0) {
                matches.forEach(match => {
                    const item = document.createElement('div');
                    item.textContent = match;
                    item.style.padding = '8px 12px';
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', () => {
                        this.value = match;
                        dropdown.style.display = 'none';
                        this.focus();
                    });
                    item.addEventListener('mouseenter', () => {
                        item.style.background = '#f8f9fa';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.background = '';
                    });
                    dropdown.appendChild(item);
                });
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        });
        
        field.addEventListener('blur', () => {
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);
        });
        
        field.addEventListener('focus', () => {
            if (field.value && suggestions.some(s => 
                s.toLowerCase().includes(field.value.toLowerCase()))
            ) {
                const value = field.value.toLowerCase();
                const matches = suggestions.filter(s => 
                    s.toLowerCase().includes(value) && value !== s.toLowerCase()
                );
                
                if (matches.length > 0) {
                    dropdown.innerHTML = '';
                    matches.forEach(match => {
                        const item = document.createElement('div');
                        item.textContent = match;
                        item.style.padding = '8px 12px';
                        item.style.cursor = 'pointer';
                        item.addEventListener('click', () => {
                            field.value = match;
                            dropdown.style.display = 'none';
                            field.focus();
                        });
                        dropdown.appendChild(item);
                    });
                    dropdown.style.display = 'block';
                }
            }
        });
    });
}

/**
 * Send Contact Form to Server (Example)
 */
async function sendContactForm(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Form submission failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

/**
 * Export functions
 */
window.BigsiteContact = {
    initContactForm,
    initFormValidation,
    initPhoneMask,
    initFormAutoComplete,
    initFormSubmit,
    initFormSuccess,
    initFormError,
    initContactMap,
    initContactCards,
    initSocialLinks,
    initCopyToClipboard,
    initFormReset,
    initContactClickActions,
    initCharacterCounter,
    initFormFocusEffects,
    initFormAutoSave,
    initFormSuggestions,
    sendContactForm,
    validateEmail,
    validatePhone,
    copyToClipboard
};
