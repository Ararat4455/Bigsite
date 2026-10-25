/**
 * Bigsite - Animations JavaScript File
 * Handles advanced animations and visual effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollTriggerAnimations();
    initParallaxEffects();
    initMouseMoveEffects();
    initCounterAnimations();
    initTypedText();
    initMagneticButtons();
    initTiltEffects();
    initRippleEffects();
    initGlitchEffects();
    initNeonEffects();
    initParticleEffects();
    initWaveEffects();
    initBubbleEffects();
    initSparkleEffects();
    initGlassEffects();
    initChromeEffects();
    initAuroraEffects();
    initHolographicEffects();
    initStaggerAnimations();
    initChainAnimations();
    initSequenceAnimations();
    initCascadeAnimations();
});

/**
 * Scroll Trigger Animations
 */
function initScrollTriggerAnimations() {
    // Animate elements on scroll using Intersection Observer
    const animateOnScroll = document.querySelectorAll(
        '.animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-zoom-in'
    );
    
    if (animateOnScroll.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animation-started');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateOnScroll.forEach(el => observer.observe(el));
    }
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
                const direction = el.getAttribute('data-direction') || 'up';
                
                if (direction === 'up') {
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                } else if (direction === 'down') {
                    el.style.transform = `translateY(${-scrolled * speed}px)`;
                } else if (direction === 'left') {
                    el.style.transform = `translateX(${-scrolled * speed}px)`;
                } else if (direction === 'right') {
                    el.style.transform = `translateX(${scrolled * speed}px)`;
                }
            });
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
    }
}

/**
 * Mouse Move Effects
 */
function initMouseMoveEffects() {
    const mouseMoveElements = document.querySelectorAll('.mouse-move');
    
    if (mouseMoveElements.length > 0) {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            mouseMoveElements.forEach(el => {
                const intensity = parseFloat(el.getAttribute('data-intensity')) || 10;
                const xMovement = (x - 0.5) * intensity;
                const yMovement = (y - 0.5) * intensity;
                
                el.style.transform = `translate(${xMovement}px, ${yMovement}px)`;
            });
        };
        
        document.addEventListener('mousemove', throttle(handleMouseMove, 16));
    }
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.textContent) || 0;
                    const duration = parseInt(target.getAttribute('data-duration')) || 2000;
                    const startTime = Date.now();
                    
                    const updateCounter = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function (ease-out-cubic)
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(endValue * easeOutCubic);
                        
                        target.textContent = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

/**
 * Typed Text Animation
 */
function initTypedText() {
    const typedElements = document.querySelectorAll('.typewriter, .typed-text');
    
    if (typedElements.length > 0) {
        typedElements.forEach(el => {
            const text = el.textContent;
            const speed = parseInt(el.getAttribute('data-speed')) || 50;
            const pause = parseInt(el.getAttribute('data-pause')) || 2000;
            const loop = el.getAttribute('data-loop') !== 'false';
            
            el.textContent = '';
            el.style.borderRight = '2px solid var(--primary-color)';
            
            let i = 0;
            let isDeleting = false;
            
            function type() {
                if (isDeleting) {
                    el.textContent = text.substring(0, i - 1);
                    i--;
                } else {
                    el.textContent = text.substring(0, i + 1);
                    i++;
                }
                
                let typeSpeed = speed;
                
                if (isDeleting && i <= 0) {
                    isDeleting = false;
                    typeSpeed = pause;
                } else if (!isDeleting && i >= text.length) {
                    isDeleting = true;
                    typeSpeed = pause;
                }
                
                if (!loop && isDeleting && i <= 0) {
                    el.style.borderRight = 'none';
                    return;
                }
                
                setTimeout(type, typeSpeed);
            }
            
            setTimeout(type, 500);
        });
    }
}

/**
 * Magnetic Buttons
 */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    if (magneticButtons.length > 0) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

/**
 * Tilt Effects
 */
function initTiltEffects() {
    const tiltElements = document.querySelectorAll('.tilt');
    
    if (tiltElements.length > 0 && window.DeviceOrientationEvent) {
        tiltElements.forEach(el => {
            const perspective = parseInt(el.getAttribute('data-perspective')) || 1000;
            const maxRotation = parseInt(el.getAttribute('data-max-rotation')) || 15;
            
            el.style.transformStyle = 'preserve-3d';
            el.style.perspective = `${perspective}px`;
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * maxRotation;
                const rotateY = ((centerX - x) / centerX) * maxRotation;
                
                el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }
}

/**
 * Ripple Effects
 */
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple, .btn-ripple');
    
    if (rippleButtons.length > 0) {
        rippleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 200%;
                height: 200%;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

/**
 * Glitch Effects
 */
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    if (glitchElements.length > 0) {
        glitchElements.forEach(el => {
            const text = el.textContent;
            el.setAttribute('data-text', text);
            
            // Random glitch effect on hover
            el.addEventListener('mouseenter', () => {
                el.classList.add('glitch-active');
                
                // Randomly trigger glitch
                const glitchInterval = setInterval(() => {
                    if (Math.random() > 0.7) {
                        el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                        setTimeout(() => {
                            el.style.transform = '';
                        }, 50);
                    }
                }, 100);
                
                el.addEventListener('mouseleave', () => {
                    clearInterval(glitchInterval);
                    el.classList.remove('glitch-active');
                }, { once: true });
            });
        });
    }
}

/**
 * Neon Effects
 */
function initNeonEffects() {
    const neonElements = document.querySelectorAll('.neon');
    
    if (neonElements.length > 0) {
        neonElements.forEach(el => {
            const color = el.getAttribute('data-color') || getCSSVariable('--primary-color');
            
            el.style.position = 'relative';
            
            // Create glow effect
            const glow = document.createElement('div');
            glow.style.position = 'absolute';
            glow.style.top = '-2px';
            glow.style.left = '-2px';
            glow.style.right = '-2px';
            glow.style.bottom = '-2px';
            glow.style.background = color;
            glow.style.borderRadius = 'inherit';
            glow.style.zIndex = '-1';
            glow.style.opacity = '0.5';
            glow.style.filter = 'blur(5px)';
            glow.className = 'neon-glow';
            
            el.appendChild(glow);
            
            // Create second glow layer
            const glow2 = glow.cloneNode(true);
            glow2.style.opacity = '0.3';
            glow2.style.filter = 'blur(10px)';
            glow2.style.zIndex = '-2';
            el.appendChild(glow2);
            
            // Pulsing animation
            el.style.animation = 'neon-pulse 2s ease-in-out infinite';
        });
    }
    
    // Add CSS for neon effects
    const neonStyle = document.createElement('style');
    neonStyle.textContent = `
        @keyframes neon-pulse {
            0%, 100% {
                box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
            }
            50% {
                box-shadow: 0 0 20px var(--primary-color), 0 0 40px var(--primary-color);
            }
        }
    `;
    document.head.appendChild(neonStyle);
}

/**
 * Particle Effects
 */
function initParticleEffects() {
    const particleContainers = document.querySelectorAll('.particles, .particle-container');
    
    if (particleContainers.length > 0) {
        particleContainers.forEach(container => {
            const count = parseInt(container.getAttribute('data-count')) || 20;
            const color = container.getAttribute('data-color') || getCSSVariable('--primary-color');
            const size = parseInt(container.getAttribute('data-size')) || 10;
            
            for (let i = 0; i < count; i++) {
                createParticle(container, color, size);
            }
        });
    }
}

function createParticle(container, color, size) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const randomSize = size * (0.5 + Math.random());
    particle.style.width = `${randomSize}px`;
    particle.style.height = `${randomSize}px`;
    
    // Random animation duration
    const duration = 5 + Math.random() * 10;
    
    // Random animation delay
    const delay = Math.random() * 5;
    
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.animation = `particle-float ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(particle);
}

/**
 * Wave Effects
 */
function initWaveEffects() {
    const waveElements = document.querySelectorAll('.wave, .wave-effect');
    
    if (waveElements.length > 0) {
        waveElements.forEach(el => {
            const color = el.getAttribute('data-color') || getCSSVariable('--primary-color');
            const opacity = parseFloat(el.getAttribute('data-opacity')) || 0.1;
            
            // Create wave overlay
            const wave = document.createElement('div');
            wave.className = 'wave-overlay';
            wave.style.position = 'absolute';
            wave.style.top = '0';
            wave.style.left = '0';
            wave.style.width = '100%';
            wave.style.height = '100%';
            wave.style.background = `linear-gradient(
                45deg,
                transparent 45%,
                ${color} 50%,
                transparent 55%
            )`;
            wave.style.backgroundSize = '200% 200%';
            wave.style.opacity = opacity;
            wave.style.pointerEvents = 'none';
            wave.style.animation = 'wave 3s linear infinite';
            
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            el.appendChild(wave);
            
            // Create second wave for more effect
            const wave2 = wave.cloneNode(true);
            wave2.style.animation = 'wave 3s linear infinite -1.5s';
            el.appendChild(wave2);
        });
    }
}

/**
 * Bubble Effects
 */
function initBubbleEffects() {
    const bubbleContainers = document.querySelectorAll('.bubbles');
    
    if (bubbleContainers.length > 0) {
        bubbleContainers.forEach(container => {
            const count = parseInt(container.getAttribute('data-count')) || 10;
            const color = container.getAttribute('data-color') || 'rgba(255, 255, 255, 0.1)';
            
            for (let i = 0; i < count; i++) {
                createBubble(container, color, i);
            }
        });
    }
}

function createBubble(container, color, index) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random horizontal position
    const left = Math.random() * 100;
    bubble.style.left = `${left}%`;
    
    // Random size
    const size = 10 + Math.random() * 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random animation duration
    const duration = 4 + Math.random() * 6;
    
    // Random animation delay
    const delay = Math.random() * 4;
    
    bubble.style.background = color;
    bubble.style.borderRadius = '50%';
    bubble.style.position = 'absolute';
    bubble.style.bottom = '-10px';
    bubble.style.animation = `bubble-rise ${duration}s ease-in ${delay}s infinite`;
    
    container.appendChild(bubble);
}

/**
 * Sparkle Effects
 */
function initSparkleEffects() {
    const sparkleElements = document.querySelectorAll('.sparkle');
    
    if (sparkleElements.length > 0) {
        sparkleElements.forEach(el => {
            const count = parseInt(el.getAttribute('data-count')) || 5;
            const color = el.getAttribute('data-color') || 'white';
            const size = parseInt(el.getAttribute('data-size')) || 4;
            
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            
            for (let i = 0; i < count; i++) {
                createSparkle(el, color, size);
            }
        });
    }
}

function createSparkle(container, color, size) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    
    // Random position
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const randomSize = size * (0.5 + Math.random());
    sparkle.style.width = `${randomSize}px`;
    sparkle.style.height = `${randomSize}px`;
    
    sparkle.style.background = color;
    sparkle.style.borderRadius = '50%';
    sparkle.style.position = 'absolute';
    sparkle.style.animation = `sparkle-twinkle ${2 + Math.random() * 2}s ease-in-out infinite`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(sparkle);
}

/**
 * Glass Effects
 */
function initGlassEffects() {
    const glassElements = document.querySelectorAll('.glass');
    
    if (glassElements.length > 0) {
        glassElements.forEach(el => {
            const bgColor = el.getAttribute('data-bg-color') || 'rgba(255, 255, 255, 0.1)';
            const borderColor = el.getAttribute('data-border-color') || 'rgba(255, 255, 255, 0.2)';
            const blur = parseInt(el.getAttribute('data-blur')) || 10;
            
            el.style.background = bgColor;
            el.style.backdropFilter = `blur(${blur}px)`;
            el.style.webkitBackdropFilter = `blur(${blur}px)`;
            el.style.border = `1px solid ${borderColor}`;
        });
    }
}

/**
 * Chrome Effects
 */
function initChromeEffects() {
    const chromeElements = document.querySelectorAll('.chrome');
    
    if (chromeElements.length > 0) {
        chromeElements.forEach(el => {
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            
            // Create shine overlay
            const shine = document.createElement('div');
            shine.className = 'chrome-shine';
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '-100%';
            shine.style.width = '200%';
            shine.style.height = '100%';
            shine.style.background = 'linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.3) 50%,
                transparent 100%
            )';
            shine.style.animation = 'chrome-shine 2s linear infinite';
            
            el.appendChild(shine);
        });
    }
}

/**
 * Aurora Effects
 */
function initAuroraEffects() {
    const auroraElements = document.querySelectorAll('.aurora');
    
    if (auroraElements.length > 0) {
        auroraElements.forEach(el => {
            const colors = el.getAttribute('data-colors') || 
                'var(--primary-color), var(--primary-light), var(--secondary-color)';
            
            el.style.background = `linear-gradient(
                135deg,
                ${colors}
            )`;
            el.style.backgroundSize = '400% 400%';
            el.style.animation = 'aurora-shift 5s ease infinite';
        });
    }
}

/**
 * Holographic Effects
 */
function initHolographicEffects() {
    const holographicElements = document.querySelectorAll('.holographic');
    
    if (holographicElements.length > 0) {
        holographicElements.forEach(el => {
            const colors = el.getAttribute('data-colors') || 
                'var(--primary-color), var(--primary-light), var(--primary-color), var(--primary-dark)';
            
            el.style.background = `linear-gradient(
                90deg,
                ${colors}
            )`;
            el.style.backgroundSize = '400% 100%';
            el.style.animation = 'holographic-shift 2s linear infinite';
        });
    }
}

/**
 * Stagger Animations
 */
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger');
    
    if (staggerContainers.length > 0) {
        staggerContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.getAttribute('data-delay')) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animation = `fadeInUp 0.5s ease forwards`;
                child.style.animationDelay = `${index * delay}ms`;
            });
        });
    }
}

/**
 * Chain Animations
 */
function initChainAnimations() {
    const chainContainers = document.querySelectorAll('.chain-animate');
    
    if (chainContainers.length > 0) {
        chainContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.getAttribute('data-delay')) || 200;
            
            Array.from(children).forEach((child, index) => {
                child.style.animation = `fadeIn 0.5s ease forwards`;
                child.style.animationDelay = `${index * delay}ms`;
            });
        });
    }
}

/**
 * Sequence Animations
 */
function initSequenceAnimations() {
    const sequenceContainers = document.querySelectorAll('.sequence-animate');
    
    if (sequenceContainers.length > 0) {
        sequenceContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.getAttribute('data-delay')) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animation = `zoomIn 0.5s ease forwards`;
                child.style.animationDelay = `${index * delay}ms`;
            });
        });
    }
}

/**
 * Cascade Animations
 */
function initCascadeAnimations() {
    const cascadeContainers = document.querySelectorAll('.cascade');
    
    if (cascadeContainers.length > 0) {
        cascadeContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.getAttribute('data-delay')) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animation = `cascade-fade-in 0.5s ease forwards`;
                child.style.animationDelay = `${index * delay}ms`;
            });
        });
    }
}

/**
 * Utility Functions
 */

// Throttle function for performance
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

// Get CSS variable value
function getCSSVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Export functions
 */
window.BigsiteAnimations = {
    initScrollTriggerAnimations,
    initParallaxEffects,
    initMouseMoveEffects,
    initCounterAnimations,
    initTypedText,
    initMagneticButtons,
    initTiltEffects,
    initRippleEffects,
    initGlitchEffects,
    initNeonEffects,
    initParticleEffects,
    initWaveEffects,
    initBubbleEffects,
    initSparkleEffects,
    initGlassEffects,
    initChromeEffects,
    initAuroraEffects,
    initHolographicEffects,
    initStaggerAnimations,
    initChainAnimations,
    initSequenceAnimations,
    initCascadeAnimations,
    throttle,
    getCSSVariable
};
