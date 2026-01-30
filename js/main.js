/**
 * MusicaViva - Main JavaScript
 * Core functionality for the music portal
 */

'use strict';

// ============================================
// DOM Ready Handler
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSearchOverlay();
    initBackToTop();
    initSmoothScroll();
    initAnimationOnScroll();
    initCounterAnimation();
    initCuriositiesSlider();
    initNewsletterForm();
});

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.header__theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('is-open');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    nav.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        }
    });
}

// ============================================
// Search Overlay
// ============================================
function initSearchOverlay() {
    const searchToggle = document.querySelector('.header__search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-overlay__close');
    const searchInput = document.querySelector('.search-overlay__input');
    
    if (!searchToggle || !searchOverlay) return;

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('is-open');
        searchOverlay.setAttribute('aria-hidden', 'false');
        searchInput?.focus();
        document.body.classList.add('modal-open');
    });

    const closeSearch = () => {
        searchOverlay.classList.remove('is-open');
        searchOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    searchClose?.addEventListener('click', closeSearch);
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
            closeSearch();
        }
    });

    // Handle search form submission
    const searchForm = document.querySelector('.search-overlay__form');
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput?.value.trim();
        if (query) {
            // For now, just log the search query
            console.log('Search query:', query);
            // In a real app, this would redirect to a search results page
            // window.location.href = `/busca?q=${encodeURIComponent(query)}`;
        }
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    };

    // Debounce scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(toggleVisibility);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Animation on Scroll (Intersection Observer)
// ============================================
function initAnimationOnScroll() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.feature-card, .cifra-card, .video-card, .article-card, .curiosity-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// Counter Animation for Stats
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Curiosities Slider
// ============================================
function initCuriositiesSlider() {
    const cards = document.querySelectorAll('.curiosity-card');
    const dots = document.querySelectorAll('.curiosities-dot');
    const prevBtn = document.querySelector('.curiosities-control--prev');
    const nextBtn = document.querySelector('.curiosities-control--next');
    
    if (cards.length === 0) return;

    let currentIndex = 0;
    const totalSlides = cards.length;

    const showSlide = (index) => {
        cards.forEach((card, i) => {
            card.classList.toggle('curiosity-card--active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('curiosities-dot--active', i === index);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    };

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });

    // Auto-play slider every 5 seconds
    let autoPlay = setInterval(nextSlide, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.curiosities-slider');
    sliderContainer?.addEventListener('mouseenter', () => clearInterval(autoPlay));
    sliderContainer?.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
}

// ============================================
// Newsletter Form
// ============================================
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter__form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('.newsletter__input');
            const email = emailInput?.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Inscrição realizada com sucesso! 🎉', 'success');
                form.reset();
            } else {
                showNotification('Por favor, insira um e-mail válido.', 'error');
            }
        });
    });
}

// ============================================
// Utility Functions
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Fechar">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#8b5cf6',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideUp 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification__close')?.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);

// ============================================
// Debounce Utility
// ============================================
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

// ============================================
// Throttle Utility
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export utilities for other modules
window.MusicaVivaUtils = {
    debounce,
    throttle,
    showNotification,
    isValidEmail
};
