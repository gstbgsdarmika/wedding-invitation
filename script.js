/**
 * ============================================
 * WEDDING INVITATION - JAVASCRIPT
 * ============================================
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    weddingDate: new Date('February 22, 2026 15:00:00').getTime(),
    guestNameParam: 'to',
    defaultGuestName: 'Tamu Undangan',
    comments: [
        {
            name: 'Made Suardana',
            text: 'Selamat ya Dewa & Gek! Semoga langgeng dan bahagia selalu. 🙏',
            date: '2 hari lalu'
        },
        {
            name: 'Ketut Wira',
            text: 'Semogaacara berjalan lancar dan bahagia. Selamat menempuh hidup baru! 🎉',
            date: '3 hari lalu'
        },
        {
            name: 'Nyoman Dharma',
            text: 'Happy Wedding! Semoga menjadi keluarga yang sakinah mawaddah warahmah. 💐',
            date: '5 hari lalu'
        }
    ]
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    modalCover: document.getElementById('modalCover'),
    mainContent: document.getElementById('mainContent'),
    guestName: document.getElementById('guestName'),
    btnBuka: document.getElementById('btnBuka'),
    bgMusic: document.getElementById('bgMusic'),
    musicBtn: document.getElementById('musicBtn'),
    petals: document.getElementById('petals'),
    rsvpForm: document.getElementById('rsvpForm'),
    commentsContainer: document.getElementById('commentsContainer'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    }
};

// ============================================
// MUSIC CONTROL
// ============================================
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        elements.bgMusic.pause();
        elements.musicBtn.innerHTML = '<i class="fas fa-music text-xl"></i>';
        elements.musicBtn.classList.remove('playing');
    } else {
        elements.bgMusic.play();
        elements.musicBtn.innerHTML = '<i class="fas fa-pause text-xl"></i>';
        elements.musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function playMusic() {
    if (!isPlaying) {
        elements.bgMusic.play();
        elements.musicBtn.innerHTML = '<i class="fas fa-pause text-xl"></i>';
        elements.musicBtn.classList.add('playing');
        isPlaying = true;
    }
}

elements.musicBtn.addEventListener('click', toggleMusic);

// ============================================
// GET GUEST NAME FROM URL
// ============================================
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    return params.get(CONFIG.guestNameParam) || CONFIG.defaultGuestName;
}

function setGuestName() {
    const name = getGuestName();
    if (elements.guestName) {
        elements.guestName.textContent = name;
    }
}

// ============================================
// OPEN INVITATION
// ============================================
function openInvitation() {
    // Hide modal
    elements.modalCover.classList.add('hidden');
    
    // Show main content
    elements.mainContent.classList.remove('opacity-0');
    elements.mainContent.classList.add('opacity-100');
    
    // Enable scroll
    document.body.classList.remove('overflow-hidden');
    document.body.classList.add('overflow-auto');
    
    // Play music
    playMusic();
    
    // Start animations
    initScrollAnimations();
}

elements.btnBuka.addEventListener('click', openInvitation);

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.weddingDate - now;

    if (distance < 0) {
        elements.countdown.days.textContent = '00';
        elements.countdown.hours.textContent = '00';
        elements.countdown.minutes.textContent = '00';
        elements.countdown.seconds.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    elements.countdown.days.textContent = String(days).padStart(2, '0');
    elements.countdown.hours.textContent = String(hours).padStart(2, '0');
    elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
    elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// FLOATING PETALS
// ============================================
function createPetals() {
    const container = elements.petals;
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.width = (Math.random() * 10 + 10) + 'px';
        petal.style.height = petal.style.width;
        container.appendChild(petal);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// RSVP FORM HANDLER
// ============================================
function handleRSVPForm() {
    if (!elements.rsvpForm) return;

    elements.rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.nama || !data.jumlah || !data.konfirmasi) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Terima kasih! Konfirmasi kehadiran Anda telah diterima.', 'success');
        
        // Add to comments
        addComment({
            name: data.nama,
            text: data.pesan || 'Hadir di acara pernikahan 🙏',
            date: 'Baru saja'
        });

        // Reset form
        this.reset();
    });
}

function addComment(comment) {
    const container = elements.commentsContainer;
    const initial = comment.name.charAt(0).toUpperCase();
    
    const commentHTML = `
        <div class="comment-item">
            <div class="flex items-start gap-4">
                <div class="comment-avatar flex-shrink-0">${initial}</div>
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="comment-name">${comment.name}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('afterbegin', commentHTML);
}

function loadComments() {
    CONFIG.comments.forEach(comment => {
        addComment(comment);
    });
}

// ============================================
// NOTIFICATION
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>${message}`;
    
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

// ============================================
// LAZY LOAD IMAGES
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PRELOADER (Optional)
// ============================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
}

// ============================================
// INITIALIZE
// ============================================
function init() {
    // Set guest name
    setGuestName();
    
    // Create floating petals
    createPetals();
    
    // Initialize RSVP form
    handleRSVPForm();
    
    // Load initial comments
    loadComments();
    
    // Initialize scroll animations
    if (!elements.modalCover.classList.contains('hidden')) {
        // Modal is visible, wait for user interaction
    } else {
        // Modal already hidden, init animations
        initScrollAnimations();
    }
    
    // Handle URL hash on load
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
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

// Throttle function for scroll events
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

// Format date to Indonesian locale
function formatDateIndonesian(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Teks berhasil disalin!', 'success');
        }).catch(() => {
            showNotification('Gagal menyalin teks', 'error');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Teks berhasil disalin!', 'success');
    }
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC to close modal if visible (for testing)
    if (e.key === 'Escape' && !elements.modalCover.classList.contains('hidden')) {
        openInvitation();
    }
    
    // Space to toggle music when not in input
    if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleMusic();
    }
});

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-zoom-in').forEach(el => {
        el.classList.add('visible');
    });
    
    // Disable petal animation
    document.querySelectorAll('.petal').forEach(petal => {
        petal.style.animation = 'none';
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c✨ Pawiwahan Dewa Dhar & Gek Cantik ✨', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cSemogaAcara Dilancarkan Dengan Sejahtera 👏', 'font-size: 14px; color: #1e4032;');
