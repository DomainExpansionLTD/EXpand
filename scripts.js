document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let autoSlideInterval;

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

    // Carousel function
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.setAttribute('aria-hidden', i !== index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Initialize carousel auto-slide
    function startCarousel() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        clearInterval(autoSlideInterval);
    }

    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopCarousel);
        slide.addEventListener('mouseleave', startCarousel);
    });

    showSlide(currentIndex);
    startCarousel();

    // Handle resize event for responsive adjustments
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            nav.classList.remove('show');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        }
    });
});
