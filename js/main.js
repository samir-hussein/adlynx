// ADLYNX Marketing Agency Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Match about image height with right div content only
    function matchAboutImageHeight() {
        // Get the content elements in the right div
        const sectionHeader = document.querySelector('#about .section-header');
        const paragraphs = document.querySelectorAll('#about .col-lg-6:last-child > p');
        const featuresRow = document.querySelector('#about .col-lg-6:last-child .row');
        const aboutImageDiv = document.querySelector('.about-image');
        
        if (aboutImageDiv) {
            // Only apply custom height on desktop/tablet (screen width >= 992px)
            if (window.innerWidth >= 992) {
                // Calculate the actual content height
                let contentHeight = 0;
                
                // Add section header height
                if (sectionHeader) {
                    contentHeight += sectionHeader.offsetHeight;
                }
                
                // Add paragraph heights
                paragraphs.forEach(p => {
                    contentHeight += p.offsetHeight;
                });
                
                // Add features row height
                if (featuresRow) {
                    contentHeight += featuresRow.offsetHeight;
                }
                
                // Add margins between elements (15px between each major section)
                contentHeight += 30;
                
                // Set the height of the image div to match the content height
                aboutImageDiv.style.height = contentHeight + 'px';
                console.log('Desktop view - Setting image height to:', contentHeight + 'px');
            } else {
                // For mobile, use a fixed aspect ratio height instead
                aboutImageDiv.style.height = '300px';
                console.log('Mobile view - Using fixed height');
            }
        }
    }
    
    // Run on page load
    matchAboutImageHeight();
    
    // Run on window resize
    window.addEventListener('resize', matchAboutImageHeight);
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load
    updateActiveNavLink();

    // Simple animation for service cards
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-feature').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on page load
    animateOnScroll();

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
});
