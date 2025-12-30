// ============================================
// Navigation and Scroll Effects
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navLinksContainer.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Smooth Scroll
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe contact info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe contact form
const contactForm = document.querySelector('.contact-form-wrapper');
if (contactForm) {
    contactForm.style.opacity = '0';
    contactForm.style.transform = 'translateX(50px)';
    contactForm.style.transition = 'all 0.8s ease 0.3s';
    observer.observe(contactForm);
}

// ============================================
// Product Button Interactions
// ============================================

const productButtons = document.querySelectorAll('.product-btn');
productButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productTitle = this.parentElement.querySelector('.product-title').textContent;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show alert
        showNotification(`You're interested in ${productTitle}!`, 'success');
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Contact Form Handling
// ============================================

const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
    }, 2000);
});

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out, slideOutRight 0.5s ease-out 3.5s;
        font-weight: 500;
    `;
    
    // Add animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ============================================
// Floating Cards Animation
// ============================================

const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ============================================
// Parallax Effect on Hero Section
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// ============================================
// Dynamic Background Gradient
// ============================================

let mouseX = 0;
let mouseY = 0;
let gradientX = 0;
let gradientY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGradient() {
    gradientX += (mouseX - gradientX) * 0.05;
    gradientY += (mouseY - gradientY) * 0.05;
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerWidth > 768) {
        const percentX = (gradientX / window.innerWidth) * 100;
        const percentY = (gradientY / window.innerHeight) * 100;
        
        heroSection.style.background = `
            radial-gradient(circle at ${percentX}% ${percentY}%, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(30, 41, 59, 0.8) 50%,
            #0f172a 100%)
        `;
    }
    
    requestAnimationFrame(animateGradient);
}

animateGradient();

// ============================================
// Typing Effect for Hero Title
// ============================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 80);
    }
});

// ============================================
// Scroll Progress Indicator
// ============================================

// Create progress bar
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

// Update progress bar on scroll
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// Feature Tag Interactions
// ============================================

const featureTags = document.querySelectorAll('.feature-tag');
featureTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const tagText = this.textContent;
        showNotification(`Filtering by: ${tagText}`, 'info');
    });
});

// ============================================
// Console Welcome Message
// ============================================

console.log('%c Welcome to Nirbhay Mishra\'s Portfolio! ', 
    'background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Thanks for checking out the code! 🚀', 
    'color: #6366f1; font-size: 14px; font-weight: bold;');
