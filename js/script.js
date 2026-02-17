// ==========================================
// SMOOTH SCROLLING & NAVIGATION
// ==========================================

// Smooth scroll for navigation links
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

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("myBar");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// ==========================================
// EXPANDABLE TOPIC CARDS
// ==========================================

const topicCards = document.querySelectorAll('.topic-card.expandable');

topicCards.forEach(card => {
    const header = card.querySelector('.topic-header');

    header.addEventListener('click', () => {
        // Toggle active state
        const isActive = card.classList.contains('active');

        // Close all other cards
        topicCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });

        // Toggle current card
        if (isActive) {
            card.classList.remove('active');
        } else {
            card.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

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

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.hero-card, .intro-card, .topic-card, .result-card, .workflow');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// NAVIGATION BAR SCROLL EFFECT
// ==========================================

let lastScroll = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ==========================================

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-secondary)';
        link.style.background = 'transparent';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = 'var(--accent-primary)';
            link.style.background = 'var(--bg-card)';
        }
    });
});

// ==========================================
// SCROLL INDICATOR HIDE ON SCROLL
// ==========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    // Press 'E' to expand all topics
    if (e.key === 'e' || e.key === 'E') {
        topicCards.forEach(card => {
            card.classList.add('active');
        });
    }

    // Press 'C' to collapse all topics
    if (e.key === 'c' || e.key === 'C') {
        topicCards.forEach(card => {
            card.classList.remove('active');
        });
    }
});

// ==========================================
// RANDOM GLITCH EFFECT ON TITLE
// ==========================================

const glitchTitle = document.querySelector('.glitch');

function randomGlitch() {
    const originalText = glitchTitle.textContent;
    const glitchChars = '///__--//';

    let iterations = 0;
    const interval = setInterval(() => {
        glitchTitle.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 1;
    }, 20);
}

// Trigger glitch effect on page load
setTimeout(randomGlitch, 500);

// ==========================================
// PARTICLE BACKGROUND EFFECT (OPTIONAL)
// ==========================================

function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

    // Styles
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--accent-primary)';
    particle.style.borderRadius = '50%';
    particle.style.bottom = '0';
    particle.style.opacity = '0';
    particle.style.animation = 'float-up 5s ease-in infinite';

    hero.appendChild(particle);

    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add float-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c🎨 VJing & Resolume Workshop', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%c✨ Bienvenido al taller interactivo de VJing', 'font-size: 14px; color: #00ccff;');
console.log('%c💡 Tip: Presiona "E" para expandir todos los temas, "C" para cerrarlos', 'font-size: 12px; color: #aaa;');
console.log(VANTA)

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Página cargada completamente');

    // Add fade-in to hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

