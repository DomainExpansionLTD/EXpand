document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        mobileMenuBtn.setAttribute('aria-expanded', nav.classList.contains('show'));
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('show');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button visibility toggle
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    // Back to top smooth scroll
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Portfolio Carousel function
    function showPortfolioItem(index) {
        portfolioItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextPortfolioItem() {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        showPortfolioItem(currentIndex);
    }

    function prevPortfolioItem() {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        showPortfolioItem(currentIndex);
    }

    nextBtn.addEventListener('click', nextPortfolioItem);
    prevBtn.addEventListener('click', prevPortfolioItem);

    showPortfolioItem(currentIndex);

    // Handle resize event for responsive adjustments
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            nav.classList.remove('show');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        }
    });
});
