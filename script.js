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

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-right form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const interest = this.querySelector('select').value;
            
            if (!name || !email || !phone || !interest) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Phone validation (French format)
            const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            if (!phoneRegex.test(phone)) {
                alert('Veuillez entrer un numéro de téléphone valide.');
                return;
            }
            
            // If validation passes, you would typically send the form data to a server
            alert('Merci pour votre message. Nous vous contacterons bientôt !');
            this.reset();
        });
    }

    // Video autoplay on viewport entry
    const videos = document.querySelectorAll('.example-video');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, options);

    videos.forEach(video => {
        videoObserver.observe(video);
    });
    const thumb = document.getElementById("videoThumbnail");
    const video = document.getElementById("perfumaticVideo");
    
    if (thumb && video) {
      thumb.addEventListener("click", function () {
        thumb.style.display = "none";
        video.style.display = "block";
        video.play();
      });
    }
        
});

