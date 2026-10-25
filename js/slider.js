/**
 * Bigsite - Slider JavaScript File
 * Handles all slider functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initServicesSlider();
    initTestimonialSlider();
    initPortfolioSlider();
    initBlogSlider();
    initClientSlider();
    initTeamSlider();
    initFeatureSlider();
    initHeroSlider();
});

/**
 * Services Slider
 */
function initServicesSlider() {
    const slider = document.querySelector('.services-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.service-slide');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 24; // Including gap
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalSlides - 1;
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Auto-slide functionality
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - next
                currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            } else {
                // Swipe right - previous
                currentIndex = Math.max(0, currentIndex - 1);
            }
            updateSlider();
        }
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slider.offsetWidth;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalSlides - 1;
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 6000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 6000);
    });
}

/**
 * Portfolio Slider
 */
function initPortfolioSlider() {
    const slider = document.querySelector('.portfolio-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.portfolio-controls .prev');
    const nextBtn = document.querySelector('.portfolio-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 24;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            } else {
                currentIndex = Math.max(0, currentIndex - 1);
            }
            updateSlider();
        }
    }, { passive: true });
}

/**
 * Blog Slider
 */
function initBlogSlider() {
    const slider = document.querySelector('.blog-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.blog-slide');
    const prevBtn = document.querySelector('.blog-controls .prev');
    const nextBtn = document.querySelector('.blog-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slider.offsetWidth;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - 1;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 7000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 7000);
    });
}

/**
 * Client Slider
 */
function initClientSlider() {
    const slider = document.querySelector('.clients-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.client-slide');
    const prevBtn = document.querySelector('.clients-controls .prev');
    const nextBtn = document.querySelector('.clients-controls .next');
    
    if (slides.length <= 5) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 24;
    const totalSlides = slides.length;
    const visibleSlides = Math.min(5, totalSlides);
    
    function updateSlider() {
        slider.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - visibleSlides;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - visibleSlides, currentIndex + 1);
            updateSlider();
        });
    }
}

/**
 * Team Slider
 */
function initTeamSlider() {
    const slider = document.querySelector('.team-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.team-slide');
    const prevBtn = document.querySelector('.team-controls .prev');
    const nextBtn = document.querySelector('.team-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slider.offsetWidth;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - 1;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
}

/**
 * Feature Slider
 */
function initFeatureSlider() {
    const slider = document.querySelector('.features-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.feature-slide');
    const prevBtn = document.querySelector('.features-controls .prev');
    const nextBtn = document.querySelector('.features-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 24;
    const totalSlides = slides.length;
    
    function updateSlider() {
        slider.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 4000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 4000);
    });
}

/**
 * Hero Slider
 */
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-controls .prev');
    const nextBtn = document.querySelector('.hero-controls .next');
    
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateSlider() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });
        
        // Show current slide
        slides[currentIndex].classList.add('active');
        slides[currentIndex].style.opacity = '1';
        slides[currentIndex].style.visibility = 'visible';
        
        // Update dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - 1;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
    }
    
    // Dot navigation
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
    }
    
    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 8000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 8000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            } else {
                currentIndex = Math.max(0, currentIndex - 1);
            }
            updateSlider();
        }
    }, { passive: true });
    
    // Initialize
    updateSlider();
}

/**
 * Generic Slider Creator
 */
class Slider {
    constructor(container, options = {}) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.prevBtn = container.querySelector('.prev') || options.prevBtn;
        this.nextBtn = container.querySelector('.next') || options.nextBtn;
        this.dotsContainer = container.querySelector('.dots') || options.dotsContainer;
        this.dots = [];
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoSlide = options.autoSlide || false;
        this.autoSlideInterval = options.autoSlideInterval || 5000;
        this.slideTransition = options.slideTransition || 'slide';
        this.slideDuration = options.slideDuration || 0.5;
        
        this.init();
    }
    
    init() {
        if (this.totalSlides <= 1) {
            if (this.prevBtn) this.prevBtn.style.display = 'none';
            if (this.nextBtn) this.nextBtn.style.display = 'none';
            return;
        }
        
        // Create dots if container exists
        if (this.dotsContainer) {
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                this.dotsContainer.appendChild(dot);
                this.dots.push(dot);
            }
        }
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Dot navigation
        if (this.dots.length > 0) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });
        }
        
        // Auto-slide
        if (this.autoSlide) {
            this.startAutoSlide();
            
            this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.container.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        // Touch support
        this.addTouchSupport();
        
        // Initialize
        this.update();
    }
    
    prev() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.update();
    }
    
    next() {
        this.currentIndex = Math.min(this.totalSlides - 1, this.currentIndex + 1);
        this.update();
    }
    
    goTo(index) {
        this.currentIndex = Math.max(0, Math.min(this.totalSlides - 1, index));
        this.update();
    }
    
    update() {
        // Update slides
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
                slide.style.display = '';
                if (this.slideTransition === 'fade') {
                    slide.style.opacity = '1';
                } else if (this.slideTransition === 'slide') {
                    slide.style.transform = 'translateX(0)';
                }
            } else {
                slide.classList.remove('active');
                if (this.slideTransition === 'fade') {
                    slide.style.opacity = '0';
                } else if (this.slideTransition === 'slide') {
                    slide.style.transform = 'translateX(100%)';
                }
            }
        });
        
        // Update dots
        if (this.dots.length > 0) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= this.totalSlides - 1;
        }
    }
    
    startAutoSlide() {
        this.autoSlideIntervalId = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.update();
        }, this.autoSlideInterval);
    }
    
    stopAutoSlide() {
        clearInterval(this.autoSlideIntervalId);
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });
    }
}

/**
 * Export functions
 */
window.BigsiteSlider = {
    Slider,
    initServicesSlider,
    initTestimonialSlider,
    initPortfolioSlider,
    initBlogSlider,
    initClientSlider,
    initTeamSlider,
    initFeatureSlider,
    initHeroSlider
};
