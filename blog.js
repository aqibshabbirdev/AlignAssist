// Blog Page JavaScript
// ===================================

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        alert('Thank you for subscribing! You will receive our latest healthcare insights at ' + email);
        this.reset();
    });
}

// Load More Articles Button
const loadMoreBtn = document.querySelector('.load-more-section .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Add loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading
        setTimeout(() => {
            this.innerHTML = 'Load More Articles <i class="fas fa-chevron-down"></i>';
            alert('More articles will be loaded here in the full implementation.');
        }, 1500);
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add reading progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 80px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #1e90ff, #00bfff);
    z-index: 1000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Blog card hover effect
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// Console log
console.log('%c📰 Align Assist Blog', 'color: #1e90ff; font-size: 24px; font-weight: bold;');
console.log('%cStay informed with the latest healthcare insights!', 'color: #00bfff; font-size: 14px;');