document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.portfolio-carousel');
    let isScrolling;

    function autoScroll() {
        carousel.scrollBy({
            top: 0,
            left: carousel.clientWidth,
            behavior: 'smooth'
        });

        // Reset scroll if we reach the end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            }, 3000);
        }
    }

    // Set interval for auto-scrolling every 4 seconds
    const autoScrollInterval = setInterval(autoScroll, 4000);

    // Pause auto-scrolling when the user interacts
    carousel.addEventListener('scroll', () => {
        clearInterval(autoScrollInterval);
        isScrolling = setTimeout(() => {
            autoScrollInterval = setInterval(autoScroll, 4000);
        }, 6000); // Resume auto-scrolling after 6 seconds of inactivity
    });
});
