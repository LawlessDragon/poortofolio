document.addEventListener('DOMContentLoaded', () => {
    // Mendaftarkan plugin ScrollTrigger ke GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Setup smooth scrolling
    setupSmoothScroll();
    
    // Inisialisasi animasi untuk setiap slide
    initIntroAnimations();
    initAboutAnimations();
    initWorkAnimations();
    initTestimonialAnimations();
    initContactAnimations();
    
    // Inisialisasi particles.js di bagian kontak
    initParticles();
});

function setupSmoothScroll() {
    // Membuat ScrollTrigger untuk setiap slide
    gsap.utils.toArray('.slide').forEach((slide, i) => {
        ScrollTrigger.create({
            trigger: slide,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: 1,
        });
    });
}

function initIntroAnimations() {
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#intro',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });
    
    introTl
        .fromTo('.intro-title', 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo('.intro-subtitle', 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
            '-=0.7'
        )
        .fromTo('.scroll-indicator', 
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.3'
        );
}

function initAboutAnimations() {
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });
    
    aboutTl
        .fromTo('.text-content', 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo('.image-container', 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
            '-=0.7'
        );
}

function initWorkAnimations() {
    // Animasi untuk setiap slide karya
    gsap.utils.toArray('.work-slide').forEach((slide, i) => {
        // Efek parallax untuk background
        gsap.fromTo(slide, 
            { backgroundPosition: '50% 0%' },
            {
                backgroundPosition: '50% 100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: slide,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
        
        // Animasi untuk teks
        const workTl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });
        
        workTl.fromTo(slide.querySelector('.work-details'),
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        );
    });
}

function initTestimonialAnimations() {
    const testimonialTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animasi untuk masing-masing testimoni dengan stagger
    testimonialTl
        .fromTo('.section-title', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.testimonial', 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: 'power3.out' 
            },
            '-=0.4'
        );
}

function initContactAnimations() {
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });
    
    contactTl
        .fromTo('#contact .section-title', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.contact-text', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        )
        .fromTo('.instagram-link', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        )
        .fromTo('.contact-form', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );
}

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#FFD447"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 100,
                        size: 6,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('particles.js not loaded');
    }
} 