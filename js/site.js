// Regency TR-1 Website JavaScript
// Interactive functionality for the world's first transistor radio website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupStarRating();
    setupReviewForm();
    setupReviewFilters();
    setupFAQ();
    setupHelpfulButtons();
    setupSmoothScroll();
    setupMobileMenu();
    setupScrollAnimations();
    setupHeaderEffects();
    injectCustomStyles();
    showWelcomeMessage();
});

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Star rating setup
function setupStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('ratingValue');
    if (stars.length > 0 && ratingInput) {
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = index + 1;
                ratingInput.value = rating;
                updateStars(rating);
                showRatingFeedback(rating);
            });
            star.addEventListener('mouseenter', function() {
                const rating = index + 1;
                updateStars(rating);
            });
        });
        const starRating = document.querySelector('.star-rating');
        if (starRating) {
            starRating.addEventListener('mouseleave', function() {
                const currentRating = parseInt(ratingInput.value) || 0;
                updateStars(currentRating);
            });
        }
    }
}

function updateStars(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function showRatingFeedback(rating) {
    const messages = [
        'We\'re sorry to hear that',
        'Thank you for your feedback',
        'We appreciate your review',
        'Great! Thanks for the positive feedback',
        'Excellent! We\'re thrilled you love it'
    ];
    console.log(`Rating selected: ${rating}/5 - ${messages[rating - 1]}`);
}

// Review form setup
function setupReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const reviewData = {
                name: formData.get('customerName'),
                location: formData.get('customerLocation'),
                rating: formData.get('rating'),
                title: formData.get('reviewTitle'),
                text: formData.get('reviewText'),
                date: new Date().toLocaleDateString()
            };
            if (validateReview(reviewData)) {
                submitReview(reviewData);
            }
        });
    }
}

function validateReview(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter your name (at least 2 characters)');
    }
    if (!data.location || data.location.trim().length < 2) {
        errors.push('Please enter your location');
    }
    if (!data.rating || parseInt(data.rating) < 1) {
        errors.push('Please select a rating');
    }
    if (!data.title || data.title.trim().length < 5) {
        errors.push('Please enter a review title (at least 5 characters)');
    }
    if (!data.text || data.text.trim().length < 20) {
        errors.push('Please write a review (at least 20 characters)');
    }
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    return true;
}

function submitReview(reviewData) {
    console.log('Review submitted:', reviewData);
    showSuccessNotification('Thank you for your review! It will be published after moderation.');
    document.getElementById('reviewForm').reset();
    updateStars(0);
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Review filtering setup
function setupReviewFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviews = document.querySelectorAll('.review-item');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterReviews(reviews, filter);
            });
        });
    }
}

function filterReviews(reviews, filter) {
    reviews.forEach(review => {
        const rating = review.getAttribute('data-rating');
        if (filter === 'all' || rating === filter) {
            review.style.display = 'block';
            review.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            review.style.display = 'none';
        }
    });
}

// FAQ setup
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    const otherQuestions = document.querySelectorAll('.faq-question');
    otherQuestions.forEach(q => {
        if (q !== element) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
            q.querySelector('.faq-toggle').textContent = '+';
        }
    });
    element.classList.toggle('active');
    answer.classList.toggle('active');
    toggle.textContent = element.classList.contains('active') ? '−' : '+';
}

// Helpful buttons setup
function setupHelpfulButtons() {
    const helpfulButtons = document.querySelectorAll('.helpful-btn');
    helpfulButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countElement = this.parentElement.querySelector('.helpful-count');
            const currentText = countElement.textContent;
            const currentCount = parseInt(currentText.match(/\d+/)[0]);
            const newCount = currentCount + 1;
            countElement.textContent = currentText.replace(/\d+/, newCount);
            this.textContent = 'Helpful ✓';
            this.disabled = true;
            this.style.background = '#4CAF50';
            this.style.color = 'white';
            showSuccessNotification('Thank you for your feedback!');
        });
    });
}

// Smooth scrolling setup
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation on scroll setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.feature, .promo-item, .testimonial, .review-item, .trouble-item');
    animateElements.forEach(el => observer.observe(el));
}

// Header scroll effect setup
function setupHeaderEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(55, 71, 79, 0.95) 0%, rgba(69, 90, 100, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #37474F 0%, #455A64 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Inject custom styles
function injectCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(55, 71, 79, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            gap: 1rem;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            .hamburger {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}

// Show welcome message
function showWelcomeMessage() {
    console.log(`
 Welcome to the Regency TR-1 Website! 

This is a demonstration website for the world's first transistor radio,
released in 1954. The TR-1 revolutionized portable entertainment and
paved the way for all modern electronics.

Key features to explore:
• Interactive customer review system
• Comprehensive product specifications
• 1950s-inspired design
• Responsive layout for all devices
• Historical context and company information

Built with HTML5, CSS3, and vanilla JavaScript.
No frameworks or external libraries used.

Enjoy exploring the future of 1954! 
`);
}

// Utility functions for demonstration
function handleOrder() {
    const confirmation = confirm(
        'Thank you for your interest in the Regency TR-1!\n\n' +
        'This would normally redirect to a secure checkout page.\n\n' +
        'For this demonstration, would you like to:\n' +
        '• Continue browsing the site\n' +
        '• View customer reviews first'
    );
    if (!confirmation) {
        scrollToReviews();
    }
}

function scrollToReviews() {
    const reviewsLink = document.querySelector('a[href="feedback.html"]');
    if (reviewsLink) {
        reviewsLink.click();
    } else {
        window.location.href = 'feedback.html';
    }
}

function showExtendedPlan() {
    alert(
        'Extended Protection Plan Details:\n\n' +
        '• 2 years of comprehensive coverage\n' +
        '• Accidental damage protection\n' +
        '• Free battery replacement service\n' +
        '• Priority customer support\n' +
        '• Express repair service\n\n' +
        'Only $7.95 - less than $0.33 per month!\n\n' +
        'This would normally open a detailed plan information page.'
    );
}

function openSupportForm() {
    alert(
        'Support Request Form\n\n' +
        'This would normally open a detailed support form with fields for:\n' +
        '• Product serial number\n' +
        '• Issue description\n' +
        '• Contact information\n' +
        '• Preferred contact method\n\n' +
        'For this demonstration, please call 1-800-REGENCY or use the contact information provided.'
    );
}

function openCareers() {
    alert(
        'Careers at Regency Radio Company\n\n' +
        'Thank you for your interest in joining our team!\n\n' +
        'This would normally redirect to our careers page with:\n' +
        '• Current job openings\n' +
        '• Application forms\n' +
        '• Company culture information\n' +
        '• Benefits details\n\n' +
        'Please send resumes to: careers@regencyradios.com'
    );
}

function openPress() {
    alert(
        'Regency Press Kit\n\n' +
        'This would normally provide access to:\n' +
        '• High-resolution product images\n' +
        '• Company logos and branding\n' +
        '• Press releases\n' +
        '• Executive biographies\n' +
        '• Fact sheets and specifications\n\n' +
        'For media inquiries, please contact: press@regencyradios.com'
    );
}
