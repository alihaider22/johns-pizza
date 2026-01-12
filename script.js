// ================================
// JOHN'S PIZZA SHOP - GROOVY 70s INTERACTIONS
// ================================

// Smooth scrolling for navigation links
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

// Add to cart functionality with groovy notification
document.querySelectorAll('.menu-card button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.menu-card');
        const pizzaName = card.querySelector('.menu-card-title').textContent;
        const price = card.querySelector('.price').textContent;

        showNotification(`${pizzaName} added to cart! ${price}`, 'success');

        // Add bounce animation to button
        this.style.animation = 'button-pop 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Order Now buttons
document.querySelectorAll('.btn-primary, .btn-large').forEach(button => {
    if (button.textContent.includes('ORDER')) {
        button.addEventListener('click', function() {
            showNotification('Groovy! Redirecting to order page...', 'primary');
        });
    }
});

// Show notification function with retro styling
function showNotification(message, type = 'success') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✨' : '🍕'}</span>
        <span class="notification-text">${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3500);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 120px;
        right: 30px;
        background: linear-gradient(135deg, #F4A261 0%, #E85D04 100%);
        color: #FFF8E8;
        padding: 20px 35px;
        border-radius: 50px;
        box-shadow:
            0 6px 0 #4A2C2A,
            0 12px 30px rgba(0,0,0,0.4);
        font-family: 'Righteous', cursive;
        font-size: 18px;
        letter-spacing: 1.5px;
        z-index: 10000;
        transform: translateX(500px) rotate(5deg);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .notification.show {
        transform: translateX(0) rotate(0deg);
    }

    .notification-icon {
        font-size: 28px;
        animation: bounce-icon 1s ease-in-out infinite;
    }

    .notification-success {
        background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%);
    }

    .notification-primary {
        background: linear-gradient(135deg, #F4A261 0%, #E85D04 100%);
    }

    @keyframes bounce-icon {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    @keyframes button-pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.9); }
    }

    @media (max-width: 640px) {
        .notification {
            right: 15px;
            left: 15px;
            font-size: 15px;
            padding: 18px 25px;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = entry.target.dataset.transform || 'translateY(0)';
        }
    });
}, observerOptions);

// Observe stat cards with staggered animation
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotate(-5deg)';
    card.dataset.transform = 'translateY(0) rotate(0deg)';
    card.style.transition = `all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.12}s`;
    observer.observe(card);
});

// Observe menu cards with varied animations
document.querySelectorAll('.menu-card').forEach((card, index) => {
    card.style.opacity = '0';
    const rotation = index % 2 === 0 ? '-5deg' : '5deg';
    card.style.transform = `translateY(60px) rotate(${rotation})`;
    card.dataset.transform = 'translateY(0) rotate(0deg)';
    card.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-60px) rotate(-3deg)';
    card.dataset.transform = 'translateX(0) rotate(0deg)';
    card.style.transition = `all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
    observer.observe(card);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8) rotate(-5deg)';
    item.dataset.transform = 'scale(1) rotate(0deg)';
    item.style.transition = `all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.12}s`;
    observer.observe(item);
});

// Parallax effect for hero pizza circle
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const pizzaCircle = document.querySelector('.pizza-circle');
    if (pizzaCircle) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.3;
        const rotation = scrollY * 0.2;

        pizzaCircle.style.transform = `translateY(${scrollY * parallaxSpeed}px) rotate(${rotation}deg)`;
    }

    lastScrollY = scrollY;
}, { passive: true });

// Add groovy cursor trail effect (subtle)
let cursorTrail = [];
const maxTrailLength = 8;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        createTrailDot(e.clientX, e.clientY);
    }
});

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.appendChild(dot);

    cursorTrail.push(dot);

    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 10);

    setTimeout(() => {
        dot.remove();
        cursorTrail.shift();
    }, 600);

    if (cursorTrail.length > maxTrailLength) {
        const oldDot = cursorTrail.shift();
        oldDot.remove();
    }
}

// Add cursor trail styles
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 12px;
        height: 12px;
        background: radial-gradient(circle, #F4A261, #E85D04);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%) scale(1);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        opacity: 0.6;
        mix-blend-mode: multiply;
    }

    @media (max-width: 768px) {
        .cursor-trail {
            display: none;
        }
    }
`;
document.head.appendChild(trailStyle);

// Add random floating pizza emojis
function createFloatingEmoji() {
    const emojis = ['🍕', '🧀', '🍅', '🌿'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const floater = document.createElement('div');
    floater.className = 'floating-emoji';
    floater.textContent = emoji;
    floater.style.left = Math.random() * 100 + '%';
    floater.style.animationDuration = (8 + Math.random() * 6) + 's';
    floater.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(floater);

    setTimeout(() => {
        floater.remove();
    }, 15000);
}

// Create floating emojis periodically
if (window.innerWidth > 768) {
    setInterval(createFloatingEmoji, 4000);
    // Create a few on load
    setTimeout(() => createFloatingEmoji(), 1000);
    setTimeout(() => createFloatingEmoji(), 2000);
}

// Floating emoji styles
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    .floating-emoji {
        position: fixed;
        font-size: 40px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: float-up 10s ease-in forwards;
        filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
    }

    @keyframes float-up {
        0% {
            bottom: -60px;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
        }
    }

    @media (max-width: 768px) {
        .floating-emoji {
            display: none;
        }
    }
`;
document.head.appendChild(floatingStyle);

// Number counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 10000) return '10K+';
    if (num >= 1000) return Math.floor(num / 1000) + 'K+';
    if (num === 100) return '100%';
    return num + '+';
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const values = [10000, 50, 100, 247]; // 24/7 represented as 247

            statNumbers.forEach((num, index) => {
                setTimeout(() => {
                    if (values[index] === 100) {
                        animateCounter(num, 100, 1500);
                    } else if (values[index] === 247) {
                        num.textContent = '24/7';
                    } else {
                        animateCounter(num, values[index], 2000);
                    }
                }, index * 150);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

console.log('🍕 Groovy! John\'s Pizza Shop is ready to rock! 🍕');
