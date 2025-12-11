// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    // Rotating text effect
    const roles = [
        'UI/UX Designer',
        'Graphic Designer',
        'Web Developer',
        'Software Developer',
        'Frontend Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const rotatingTextElement = document.querySelector('.rotating-text');
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            rotatingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            rotatingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    if (rotatingTextElement) {
        typeRole();
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'light';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Header scroll effect - add profile image and shrink name on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside (on page body)
        document.addEventListener('click', function(event) {
            if (!header.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Close menu when scrolling
        window.addEventListener('scroll', function() {
            navMenu.classList.remove('active');
        });
    }

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (name && email && message) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset form
                this.reset();
            }
        });
    }

    // Smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ==================== SCROLL REVEAL INTERSECTION OBSERVER ====================
    // Get all elements that have the 'kinetic-reveal' class
    const manifestingTargets = document.querySelectorAll('.kinetic-reveal');

    // Set up the Intersection Observer options
    // rootMargin: Defines an area around the root (viewport) for intersection calculations.
    // threshold: 0.1 means the callback is executed when 10% of the target element is visible.
    const viewWatchSettings = {
        root: null, // The viewport is the root
        rootMargin: '0px',
        threshold: 0.1
    };

    /**
     * Callback function executed when an observed element intersects with the root (viewport).
     * @param {IntersectionObserverEntry[]} observedEntries - An array of observed element entries.
     * @param {IntersectionObserver} viewWatcher - The observer instance itself.
     */
    const onIntersectionTrigger = (observedEntries, viewWatcher) => {
        observedEntries.forEach(entry => {
            // Check if the element is intersecting (i.e., visible in the viewport)
            if (entry.isIntersecting) {
                // Add the 'state-manifest' class to trigger the custom transition
                entry.target.classList.add('state-manifest');
                // Once the element is visible, stop observing it
                viewWatcher.unobserve(entry.target);
            }
        });
    };

    // Create the Intersection Observer instance
    const viewWatcher = new IntersectionObserver(onIntersectionTrigger, viewWatchSettings);

    // Start observing each element
    manifestingTargets.forEach(element => {
        viewWatcher.observe(element);
    });

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.querySelector('.back-to-top');
    const showBackToTop = () => {
        if (!backToTopBtn) return;
        const shouldShow = window.scrollY > 300;
        backToTopBtn.classList.toggle('visible', shouldShow);
    };

    window.addEventListener('scroll', showBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initial state on load
    showBackToTop();
});
