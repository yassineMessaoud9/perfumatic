document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // FAQ Section
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Initialize other carousels if needed, but not the brand-showcase one
    function initializeCarousel(carouselInnerSelector, carouselItemSelector, itemsToShowDesktop, itemsToShowMobile) {
        const carouselInner = document.querySelector(carouselInnerSelector);
        const carouselItems = document.querySelectorAll(carouselItemSelector);

        let currentIndex = 0;
        const itemsToShow = window.innerWidth > 768 ? itemsToShowDesktop : itemsToShowMobile;

        function updateCarousel() {
            const offset = currentIndex * (100 / itemsToShow);
            carouselInner.style.transform = `translateX(-${offset}%)`;
        }

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex < Math.ceil(carouselItems.length / itemsToShow) - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);

        // Adjust on window resize
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        updateCarousel();
    }

    // Example: Initialize a different carousel (e.g., partners), not the luxury brands
    // initializeCarousel('.some-other-section .logos-carousel-inner', '.some-other-section .logos-carousel-item', 5, 2);
});