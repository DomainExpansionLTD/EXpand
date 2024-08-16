document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initBackToTopButton();
    initSectionsFadeIn();
    initHeroCarousel();
    initPortfolioCarousel();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
            mobileMenuBtn.setAttribute('aria-expanded', nav.classList.contains('show'));
        });
    }
}

// Other functions remain the same
