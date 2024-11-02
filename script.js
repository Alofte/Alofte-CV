// Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Scroll Animation
const sections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff9d';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// 3D Card Effect
const cards = document.querySelectorAll('.project-card, .github-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createWaveform(); // Recreate waveform on resize
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize section animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
    });
    
    setTimeout(() => {
        sections.forEach(section => {
            section.style.transition = 'all 1s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 500);
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icons = card.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transform = 'scale(1.2)';
            icon.style.color = 'var(--primary)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const icons = card.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--light)';
        });
    });
});

// Dark Mode preference handling
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
function handleDarkMode(e) {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
prefersDarkScheme.addListener(handleDarkMode);
handleDarkMode(prefersDarkScheme);

// Waveform Animation
function createWaveform() {
    const waveform = document.querySelector('.waveform');
    if (!waveform) return;
    
    waveform.innerHTML = ''; // Clear existing bars
    const barCount = 50;
    
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.classList.add('waveform-bar');
        waveform.appendChild(bar);
    }
    
    animateWaveform();
}

function animateWaveform() {
    const bars = document.querySelectorAll('.waveform-bar');
    bars.forEach(bar => {
        const height = Math.random() * 100;
        bar.style.height = `${height}%`;
    });
    
    setTimeout(animateWaveform, 100);
}

// Typewriter effect for subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = ''; // Clear existing text
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect for background
function parallaxEffect() {
    const elements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        elements.forEach(elem => {
            const speed = elem.dataset.speed;
            const yPos = -(window.pageYOffset * speed);
            elem.style.backgroundPositionY = yPos + 'px';
        });
    });
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const options = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => observer.observe(img));
}

// Initialize all functions
function init() {
    createWaveform();
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        typeWriter(subtitle, "Python Developer • Music Producer");
    }
    parallaxEffect();
    lazyLoadImages();
}

// Call init on window load
window.addEventListener('load', init);

// Smooth scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Add this to your existing resize event listener
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createWaveform(); // Recreate waveform on resize
});

// Optional: Add a simple preloader
const preloader = document.createElement('div');
preloader.classList.add('preloader');
preloader.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(preloader);

window.addEventListener('load', () => {
    preloader.style.display = 'none';
});

// Optional: Add a simple form validation if you have a contact form
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form validation logic here
        console.log('Form submitted');
        // You can add AJAX submission here if needed
    });
}

// Optional: Add a simple animation to project cards on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .github-card');
    elements.forEach(elem => {
        const elemTop = elem.getBoundingClientRect().top;
        const elemBottom = elem.getBoundingClientRect().bottom;
        if (elemTop < window.innerHeight && elemBottom > 0) {
            elem.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Call functions that need to run on load
window.addEventListener('load', () => {
    init();
    animateOnScroll();
});
