document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const heroImages = document.querySelectorAll('.carousel-slide img');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentHeroIndex = 0;
    let currentPortfolioIndex = 0;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        mobileMenuBtn.setAttribute('aria-expanded', nav.classList.contains('show'));
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Show back to top button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Back to top button click event
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade in sections on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Hero Image Carousel with Fade In/Out Effect
    function showHeroImage(index) {
        heroImages.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    function nextHeroImage() {
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        showHeroImage(currentHeroIndex);
    }

    setInterval(nextHeroImage, 8000); // Change image every 8 seconds

    showHeroImage(currentHeroIndex);

    // Portfolio Carousel function
    function showPortfolioItem(index) {
        portfolioItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextPortfolioItem() {
        currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioItems.length;
        showPortfolioItem(currentPortfolioIndex);
    }

    function prevPortfolioItem() {
        currentPortfolioIndex = (currentPortfolioIndex - 1 + portfolioItems.length) % portfolioItems.length;
        showPortfolioItem(currentPortfolioIndex);
    }

    nextBtn.addEventListener('click', nextPortfolioItem);
    prevBtn.addEventListener('click', prevPortfolioItem);

    showPortfolioItem(currentPortfolioIndex);
});
