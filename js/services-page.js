// ===================================
// Services Page JavaScript
// ===================================

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scrolling for service navigation
const serviceNavLinks = document.querySelectorAll('.service-nav-card');
serviceNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 160; // Adjust for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active state
            serviceNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Highlight active service in navigation on scroll
const serviceDetailSections = document.querySelectorAll('.service-detail-section');
const servicesNav = document.getElementById('servicesNav');

function updateActiveServiceNav() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    serviceDetailSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    serviceNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            
            // Scroll the nav link into view if needed
            if (servicesNav && window.innerWidth <= 768) {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveServiceNav();
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add scroll animations to stats
const statNumbers = document.querySelectorAll('.stat-number');

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            // Handle different formats
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.toLowerCase().includes('hours')) {
                element.textContent = Math.floor(current) + ' Hours';
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }
    }, 16);
}

// Observe stats and trigger animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const finalValue = statNumber.textContent;
            
            // Extract number from text
            const numberMatch = finalValue.match(/\d+/);
            if (numberMatch) {
                const number = parseInt(numberMatch[0]);
                statNumber.textContent = '0';
                setTimeout(() => {
                    animateValue(statNumber, 0, number, 2000);
                }, 200);
            }
            
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// Add entrance animations to content blocks
const contentBlocks = document.querySelectorAll('.content-block, .feature-box, .coding-card');
const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            contentObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

contentBlocks.forEach(block => contentObserver.observe(block));

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.feature-box, .coding-card, .process-step-card, .responsibility-card, .marketing-service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Console easter egg
console.log(`
%c
╔════════════════════════════════════════╗
║                                        ║
║        🏥 Align Assist Services         ║
║                                        ║
║   Comprehensive Healthcare Solutions   ║
║          for Your Practice             ║
║                                        ║
║   Built with ❤️ by Align Assist Team   ║
║                                        ║
╚════════════════════════════════════════╝
`,
'color: #6b8e23; font-size: 14px; font-weight: bold;'
);

console.log('%cInterested in our services? Contact us at: AlignAssist2025@gmail.com', 
'color: #8bc34a; font-size: 16px; font-weight: bold;');