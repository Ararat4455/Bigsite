/**
 * Bigsite - Main JavaScript File
 * Handles core functionality and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();
    initFormValidations();
    initNewsletterForm();
    initPortfolioFilter();
    initServicesSlider();
    initTestimonialSlider();
    initTooltips();
    initLazyLoading();
    initKeyboardNavigation();
    initAccessibility();
});

/**
 * Loading Screen
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        });
    }
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add scrolled class on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');
    
    if (mobileMenuBtn && mobileMenu && closeBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Hide hero image on mobile
    if (window.innerWidth <= 1200) {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.display = 'none';
        }
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Active Navigation Link
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

/**
 * Form Validations
 */
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    
                    // Remove error on input
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector('[style*="border-color: rgb(220, 53, 69)"]');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    });
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            if (email && email.value) {
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                button.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    button.style.background = '#28a745';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        button.disabled = false;
                        email.value = '';
                    }, 2000);
                }, 1500);
            }
        });
    });
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Services Slider
 */
function initServicesSlider() {
    const slider = document.querySelector('.services-slider');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    
    if (slider && prevBtn && nextBtn) {
        const slides = slider.querySelectorAll('.service-slide');
        const slideWidth = slides[0]?.offsetWidth || 300;
        let currentIndex = 0;
        
        function updateSlider() {
            slider.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
        }
        
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(slides.length - 1, currentIndex + 1);
            updateSlider();
        });
    }
}

/**
 * Testimonial Slider
 */
let testimonialSliderInterval;

function initTestimonialSlider() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;
    
    const testimonials = testimonialsGrid.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 4) return;
    
    let currentIndex = 0;
    const visibleCount = window.innerWidth >= 1200 ? 4 : 
                        window.innerWidth >= 992 ? 3 : 
                        window.innerWidth >= 768 ? 2 : 1;
    
    function showTestimonials() {
        testimonials.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + visibleCount) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % (testimonials.length - visibleCount + 1);
        showTestimonials();
    }
    
    // Auto-rotate testimonials
    testimonialSliderInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    testimonialsGrid.addEventListener('mouseenter', () => {
        clearInterval(testimonialSliderInterval);
    });
    
    testimonialsGrid.addEventListener('mouseleave', () => {
        testimonialSliderInterval = setInterval(nextTestimonial, 5000);
    });
    
    showTestimonials();
}

/**
 * Tooltips
 */
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltip.forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'var(--gray-900)';
        tooltip.style.color = 'var(--white)';
        tooltip.style.padding = '0.5rem 0.75rem';
        tooltip.style.borderRadius = 'var(--radius-md)';
        tooltip.style.fontSize = '0.75rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transition = 'opacity 0.3s, visibility 0.3s';
        
        el.style.position = 'relative';
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

/**
 * Lazy Loading
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Keyboard Navigation
 */
function initKeyboardNavigation() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.background = 'var(--primary-color)';
    skipLink.style.color = 'var(--white)';
    skipLink.style.padding = '0.5rem 1rem';
    skipLink.style.zIndex = '1000';
    skipLink.style.transition = 'top 0.3s';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
}

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
    // Add ARIA attributes to interactive elements
    const buttons = document.querySelectorAll('button, .btn, .btn-login, .btn-register');
    buttons.forEach(btn => {
        if (!btn.hasAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim() || 'button');
        }
    });
    
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex="0"]');
    focusableElements.forEach(el => {
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'A' || this.tagName === 'BUTTON') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Ensure all images have alt text
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
            img.alt = 'Decorative image';
        }
    });
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get CSS variable value
function getCSSVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Set CSS variable value
function setCSSVariable(name, value) {
    document.documentElement.style.setProperty(name, value);
}

/**
 * Export functions for other modules
 */
window.Bigsite = {
    initLoadingScreen,
    initNavigation,
    initMobileMenu,
    initScrollEffects,
    initBackToTop,
    initScrollAnimations,
    initSmoothScroll,
    initActiveNavLink,
    initFormValidations,
    initNewsletterForm,
    initPortfolioFilter,
    initServicesSlider,
    initTestimonialSlider,
    initTooltips,
    initLazyLoading,
    initKeyboardNavigation,
    initAccessibility,
    debounce,
    throttle,
    isInViewport,
    getCSSVariable,
    setCSSVariable
};
