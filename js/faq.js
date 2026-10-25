/**
 * Bigsite - FAQ JavaScript File
 * Handles FAQ accordion functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initFAQSearch();
    initFAQFilter();
    initFAQCategories();
});

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            const answer = item.querySelector('.faq-answer');
            
            if (question && toggle && answer) {
                // Click on question to toggle
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    
                    // Update toggle icon
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        if (isActive) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        } else {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        }
                    }
                });
                
                // Click on toggle icon
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    
                    // Update toggle icon
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        if (isActive) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        } else {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        }
                    }
                });
                
                // Keyboard navigation
                question.setAttribute('tabindex', '0');
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            }
        });
        
        // Open first FAQ item by default (optional)
        // const firstFAQ = faqItems[0];
        // if (firstFAQ) {
        //     firstFAQ.classList.add('active');
        //     const firstToggle = firstFAQ.querySelector('.faq-toggle i');
        //     if (firstToggle) {
        //         firstToggle.classList.remove('fa-plus');
        //         firstToggle.classList.add('fa-minus');
        //     }
        // }
    }
}

/**
 * FAQ Search
 */
function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput && faqItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3');
                const answer = item.querySelector('.faq-answer p');
                
                if (question || answer) {
                    const questionText = question ? question.textContent.toLowerCase() : '';
                    const answerText = answer ? answer.textContent.toLowerCase() : '';
                    const combinedText = questionText + ' ' + answerText;
                    
                    if (combinedText.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
        
        // Clear search
        const clearBtn = document.querySelector('.faq-search .clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
                searchInput.focus();
            });
        }
    }
}

/**
 * FAQ Filter by Category
 */
function initFAQFilter() {
    const filterBtns = document.querySelectorAll('.faq-filter-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (filterBtns.length > 0 && faqItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                faqItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * FAQ Categories Navigation
 */
function initFAQCategories() {
    const categoryLinks = document.querySelectorAll('.faq-category-link');
    const faqContainer = document.querySelector('.faq');
    
    if (categoryLinks.length > 0 && faqContainer) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                const targetSection = document.querySelector(`#faq-${category}`);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Highlight the section
                    targetSection.classList.add('highlight');
                    setTimeout(() => {
                        targetSection.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    }
}

/**
 * FAQ with Multiple Answers
 */
function initMultiFAQ() {
    const multiFAQItems = document.querySelectorAll('.multi-faq-item');
    
    if (multiFAQItems.length > 0) {
        multiFAQItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answers = item.querySelectorAll('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question && answers.length > 0 && toggle) {
                let currentAnswerIndex = 0;
                
                // Show first answer initially
                answers.forEach((answer, index) => {
                    answer.style.display = index === 0 ? 'block' : 'none';
                });
                
                // Click to cycle through answers
                question.addEventListener('click', () => {
                    currentAnswerIndex = (currentAnswerIndex + 1) % answers.length;
                    
                    answers.forEach((answer, index) => {
                        answer.style.display = index === currentAnswerIndex ? 'block' : 'none';
                    });
                    
                    // Update toggle icon
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        if (currentAnswerIndex === 0) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-plus');
                        } else {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-times');
                        }
                    }
                });
            }
        });
    }
}

/**
 * FAQ with Nested Questions
 */
function initNestedFAQ() {
    const nestedFAQItems = document.querySelectorAll('.nested-faq-item');
    
    if (nestedFAQItems.length > 0) {
        nestedFAQItems.forEach(item => {
            const mainQuestion = item.querySelector('.main-question');
            const nestedQuestions = item.querySelectorAll('.nested-question');
            
            if (mainQuestion && nestedQuestions.length > 0) {
                // Hide nested questions initially
                nestedQuestions.forEach(q => {
                    q.style.display = 'none';
                });
                
                // Click main question to show nested questions
                mainQuestion.addEventListener('click', () => {
                    const isExpanded = mainQuestion.classList.contains('expanded');
                    
                    if (isExpanded) {
                        mainQuestion.classList.remove('expanded');
                        nestedQuestions.forEach(q => {
                            q.style.display = 'none';
                        });
                    } else {
                        mainQuestion.classList.add('expanded');
                        nestedQuestions.forEach(q => {
                            q.style.display = 'block';
                        });
                    }
                });
                
                // Handle nested question clicks
                nestedQuestions.forEach(nestedQ => {
                    const nestedAnswer = nestedQ.nextElementSibling;
                    
                    if (nestedAnswer && nestedAnswer.classList.contains('nested-answer')) {
                        nestedQ.addEventListener('click', () => {
                            const isActive = nestedQ.classList.contains('active');
                            
                            nestedQ.classList.toggle('active');
                            nestedAnswer.style.display = isActive ? 'none' : 'block';
                        });
                    }
                });
            }
        });
    }
}

/**
 * FAQ with Expand All / Collapse All
 */
function initFAQExpandAll() {
    const expandAllBtn = document.querySelector('.faq-expand-all');
    const collapseAllBtn = document.querySelector('.faq-collapse-all');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (expandAllBtn && faqItems.length > 0) {
        expandAllBtn.addEventListener('click', () => {
            faqItems.forEach(item => {
                item.classList.add('active');
                const toggle = item.querySelector('.faq-toggle i');
                if (toggle) {
                    toggle.classList.remove('fa-plus');
                    toggle.classList.add('fa-minus');
                }
            });
        });
    }
    
    if (collapseAllBtn && faqItems.length > 0) {
        collapseAllBtn.addEventListener('click', () => {
            faqItems.forEach(item => {
                item.classList.remove('active');
                const toggle = item.querySelector('.faq-toggle i');
                if (toggle) {
                    toggle.classList.remove('fa-minus');
                    toggle.classList.add('fa-plus');
                }
            });
        });
    }
}

/**
 * FAQ with Video Answers
 */
function initFAQVideo() {
    const videoFAQItems = document.querySelectorAll('.video-faq-item');
    
    if (videoFAQItems.length > 0) {
        videoFAQItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const videoContainer = item.querySelector('.video-answer');
            const video = videoContainer?.querySelector('video');
            const playBtn = videoContainer?.querySelector('.play-btn');
            
            if (question && videoContainer && video) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    if (isActive) {
                        // Pause video when closing
                        video.pause();
                        video.currentTime = 0;
                    } else {
                        // Play video when opening
                        video.play();
                    }
                });
                
                // Play button click
                if (playBtn) {
                    playBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        video.play();
                        playBtn.style.display = 'none';
                    });
                }
                
                // Video ended
                video.addEventListener('ended', () => {
                    if (playBtn) {
                        playBtn.style.display = 'block';
                    }
                });
            }
        });
    }
}

/**
 * FAQ with Form
 */
function initFAQForm() {
    const faqForm = document.querySelector('.faq-form');
    
    if (faqForm) {
        faqForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(faqForm);
            const question = formData.get('question');
            const email = formData.get('email');
            
            if (question && email) {
                // Show loading state
                const submitBtn = faqForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Sent!';
                    faqForm.reset();
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'faq-form-success';
                    successMsg.textContent = 'Thank you for your question! We will get back to you soon.';
                    faqForm.appendChild(successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
}

/**
 * FAQ Analytics
 */
function initFAQAnalytics() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    const questionText = question.textContent.trim();
                    
                    // Track FAQ click (you can integrate with Google Analytics, etc.)
                    console.log('FAQ Clicked:', questionText);
                    
                    // In a real implementation, you might send this to analytics
                    // Example: gtag('event', 'faq_click', { 'question': questionText });
                });
            }
        });
    }
}

/**
 * FAQ with Related Questions
 */
function initRelatedFAQ() {
    const relatedFAQContainers = document.querySelectorAll('.related-faq');
    
    if (relatedFAQContainers.length > 0) {
        relatedFAQContainers.forEach(container => {
            const mainFAQ = container.querySelector('.main-faq');
            const relatedFAQs = container.querySelectorAll('.related-faq-item');
            
            if (mainFAQ && relatedFAQs.length > 0) {
                // Show related FAQs when main FAQ is clicked
                mainFAQ.addEventListener('click', () => {
                    const isExpanded = container.classList.contains('expanded');
                    
                    container.classList.toggle('expanded');
                    
                    relatedFAQs.forEach(faq => {
                        faq.style.display = isExpanded ? 'none' : 'block';
                    });
                });
            }
        });
    }
}

/**
 * FAQ with Ratings
 */
function initFAQRatings() {
    const faqItems = document.querySelectorAll('.faq-item.ratable');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const stars = item.querySelectorAll('.rating-star');
            const ratingInput = item.querySelector('.rating-input');
            
            if (stars.length > 0 && ratingInput) {
                stars.forEach((star, index) => {
                    star.addEventListener('click', () => {
                        // Set rating
                        ratingInput.value = index + 1;
                        
                        // Highlight selected stars
                        stars.forEach((s, i) => {
                            if (i <= index) {
                                s.classList.add('selected');
                            } else {
                                s.classList.remove('selected');
                            }
                        });
                        
                        // Submit rating
                        submitRating(item, index + 1);
                    });
                    
                    // Hover effect
                    star.addEventListener('mouseenter', () => {
                        stars.forEach((s, i) => {
                            if (i <= index) {
                                s.classList.add('hover');
                            } else {
                                s.classList.remove('hover');
                            }
                        });
                    });
                    
                    star.addEventListener('mouseleave', () => {
                        stars.forEach(s => s.classList.remove('hover'));
                    });
                });
            }
        });
    }
}

function submitRating(item, rating) {
    // Simulate rating submission
    console.log('Rating submitted:', rating);
    
    // Show thank you message
    const thankYouMsg = document.createElement('div');
    thankYouMsg.className = 'rating-thank-you';
    thankYouMsg.textContent = 'Thank you for your feedback!';
    item.appendChild(thankYouMsg);
    
    setTimeout(() => {
        thankYouMsg.remove();
    }, 2000);
}

/**
 * FAQ with Tags
 */
function initFAQTags() {
    const tagLinks = document.querySelectorAll('.faq-tag');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (tagLinks.length > 0 && faqItems.length > 0) {
        tagLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tag = this.textContent.trim().toLowerCase();
                
                faqItems.forEach(item => {
                    const itemTags = item.getAttribute('data-tags');
                    
                    if (itemTags && itemTags.toLowerCase().includes(tag)) {
                        item.style.display = 'block';
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * FAQ with Share Buttons
 */
function initFAQShare() {
    const shareButtons = document.querySelectorAll('.faq-share-btn');
    
    if (shareButtons.length > 0) {
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const faqItem = this.closest('.faq-item');
                const question = faqItem?.querySelector('.faq-question h3');
                
                if (question) {
                    const text = question.textContent.trim();
                    const url = window.location.href;
                    
                    // Use Web Share API if available
                    if (navigator.share) {
                        navigator.share({
                            title: 'FAQ: ' + text,
                            text: text,
                            url: url
                        }).catch(err => {
                            console.log('Error sharing:', err);
                            // Fallback to copy to clipboard
                            fallbackShare(text, url);
                        });
                    } else {
                        // Fallback to copy to clipboard
                        fallbackShare(text, url);
                    }
                }
            });
        });
    }
}

function fallbackShare(text, url) {
    const shareText = `${text}\n${url}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
        // Show copied message
        const copiedMsg = document.createElement('div');
        copiedMsg.className = 'share-copied';
        copiedMsg.textContent = 'Copied to clipboard!';
        document.body.appendChild(copiedMsg);
        
        setTimeout(() => {
            copiedMsg.remove();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

/**
 * FAQ with Print Functionality
 */
function initFAQPrint() {
    const printBtn = document.querySelector('.faq-print-btn');
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            // Open all FAQ items before printing
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.classList.add('active');
            });
            
            // Trigger print
            window.print();
            
            // Restore FAQ state after printing
            setTimeout(() => {
                faqItems.forEach(item => {
                    item.classList.remove('active');
                });
            }, 100);
        });
    }
}

/**
 * FAQ with Bookmark
 */
function initFAQBookmark() {
    const bookmarkBtns = document.querySelectorAll('.faq-bookmark-btn');
    
    if (bookmarkBtns.length > 0) {
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const isBookmarked = this.classList.contains('bookmarked');
                
                if (isBookmarked) {
                    this.classList.remove('bookmarked');
                    icon.classList.remove('fa-bookmark');
                    icon.classList.add('fa-bookmark-o');
                    
                    // Remove from localStorage
                    const faqId = this.closest('.faq-item').id;
                    if (faqId) {
                        const bookmarks = JSON.parse(localStorage.getItem('faqBookmarks') || '[]');
                        const updatedBookmarks = bookmarks.filter(id => id !== faqId);
                        localStorage.setItem('faqBookmarks', JSON.stringify(updatedBookmarks));
                    }
                } else {
                    this.classList.add('bookmarked');
                    icon.classList.remove('fa-bookmark-o');
                    icon.classList.add('fa-bookmark');
                    
                    // Add to localStorage
                    const faqId = this.closest('.faq-item').id;
                    if (faqId) {
                        const bookmarks = JSON.parse(localStorage.getItem('faqBookmarks') || '[]');
                        if (!bookmarks.includes(faqId)) {
                            bookmarks.push(faqId);
                            localStorage.setItem('faqBookmarks', JSON.stringify(bookmarks));
                        }
                    }
                }
            });
        });
    }
}

/**
 * Load Bookmarked FAQs
 */
function loadBookmarkedFAQs() {
    const bookmarkedFAQs = JSON.parse(localStorage.getItem('faqBookmarks') || '[]');
    
    if (bookmarkedFAQs.length > 0) {
        bookmarkedFAQs.forEach(faqId => {
            const faqItem = document.getElementById(faqId);
            const bookmarkBtn = faqItem?.querySelector('.faq-bookmark-btn');
            
            if (bookmarkBtn) {
                bookmarkBtn.classList.add('bookmarked');
                const icon = bookmarkBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bookmark-o');
                    icon.classList.add('fa-bookmark');
                }
            }
        });
    }
}

/**
 * Export functions
 */
window.BigsiteFAQ = {
    initFAQ,
    initFAQSearch,
    initFAQFilter,
    initFAQCategories,
    initMultiFAQ,
    initNestedFAQ,
    initFAQExpandAll,
    initFAQVideo,
    initFAQForm,
    initFAQAnalytics,
    initRelatedFAQ,
    initFAQRatings,
    initFAQTags,
    initFAQShare,
    initFAQPrint,
    initFAQBookmark,
    loadBookmarkedFAQs
};

// Load bookmarked FAQs on page load
loadBookmarkedFAQs();
