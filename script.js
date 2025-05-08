// Tunggu hingga DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Aktifkan hardware acceleration pada elemen penting
    const acceleratedElements = document.querySelectorAll('.hardware-accelerated');
    acceleratedElements.forEach(el => {
        gsap.set(el, {
            force3D: true,
            willChange: 'transform'
        });
    });
    
    // Inisialisasi slideshow untuk intro
    initializeSlideshow();
    
    // Inisialisasi filter portofolio
    initializePortfolioFilter();
    
    // Buat partikel hanya di section tertentu dengan jumlah lebih sedikit
    createParticles('particles', 35); // About section
    createParticles('work-particles', 35); // Work section
    createParticles('contact-particles', 35); // Contact section
    
    // Transparansi navbar saat scroll
    setupNavbarTransparency();
    
    // Initiate carousel controls
    setupCarouselControls();

    // Memulai autoscroll portfolio
    startPortfolioAutoScroll();
    
    // Animasi untuk ornaments
    animateOrnaments();
    
    // Animasi untuk navigasi
    animateNavigation();
    
    // Animasi untuk intro
    animateIntro();
    
    // Animasi untuk about section
    animateAbout();
    
    // Animasi untuk portfolio/work
    animatePortfolio();
    
    // Animasi untuk testimonials
    animateTestimonials();
    
    // Animasi untuk contact
    animateContact();
    
    // Handle smooth scrolling untuk link navigasi
    setupSmoothScrolling();
    
    // Setup parallax effects
    setupParallaxEffects();

    // Inisialisasi dokumentasi
    initializeDokumentasi();
    
    // Setup hidden command
    setupHiddenCommand();
    
    // Animasi untuk dokumentasi
    animateDokumentasi();
});

// Backup untuk memastikan semua inisialisasi terjadi
window.addEventListener('load', () => {
    // Coba re-inisialisasi partikel jika belum berjalan
    const particles = document.querySelectorAll('.particle');
    if (particles.length < 10) {
        console.log("Re-initializing particles");
        createParticles('particles', 35);
        createParticles('work-particles', 35);
        createParticles('contact-particles', 35);
    }
    
    // Cek ornamen dan tambahkan fallback class jika diperlukan
    const ornaments = document.querySelectorAll('.ornament');
    ornaments.forEach(ornament => {
        // Tambahkan class untuk memastikan efek visual tetap ada
        ornament.classList.add('ornament-gold');
    });
});

// Reset animasi partikel jika pengguna berpindah tab dan kembali
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-inisialisasi partikel saat halaman menjadi terlihat kembali
        createParticles('particles', 35);
        createParticles('work-particles', 35);
        createParticles('contact-particles', 35);
        
        // Restart portfolio auto scroll
        startPortfolioAutoScroll();
    }
});

// Atur transparansi navbar saat scroll
function setupNavbarTransparency() {
    const navbar = document.querySelector('nav');
    
    // Fungsi untuk mengupdate transparansi
    function updateNavbarTransparency() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '0.7rem 5%';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.5)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.padding = '1rem 5%';
        }
    }
    
    // Event listener untuk scroll
    window.addEventListener('scroll', updateNavbarTransparency);
    
    // Panggil sekali untuk memastikan keadaan awal benar
    updateNavbarTransparency();
}

// Inisialisasi slideshow
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Set slide pertama sebagai active
    slides[0].classList.add('active');
    
    // Fungsi untuk mengganti slide dengan transisi yang lebih halus
    function nextSlide() {
        // Fade out slide saat ini
        gsap.to(slides[currentSlide], {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Set slide berikutnya ke opacity 0 terlebih dahulu
                gsap.set(slides[currentSlide], { opacity: 0 });
                slides[currentSlide].classList.add('active');
                
                // Fade in slide berikutnya
                gsap.to(slides[currentSlide], {
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.in"
                });
            }
        });
    }
    
    // Set interval untuk berganti slide secara otomatis (lebih cepat)
    setInterval(nextSlide, 4000);
}

// Variabel global untuk carousel auto-scrolling
let portfolioAutoScrollInterval;
let isAutoScrollActive = true; // Default aktif untuk "Semua"

function startPortfolioAutoScroll() {
    // Dapatkan elemen carousel
    const carousel = document.getElementById('portfolioCarousel');
    if (!carousel) return;

    // Reset variabel global untuk memastikan tidak ada duplikasi
    if (window.portfolioAutoScrollInterval) {
        clearInterval(window.portfolioAutoScrollInterval);
        window.portfolioAutoScrollInterval = null;
    }

    // Konfigurasi dasar dengan optimasi untuk animasi lebih halus
    const config = {
        slideDuration: 1.5,     // Durasi animasi slide
        reverseDuration: 1.8,   // Durasi mundur yang lebih lama agar halus
        pauseDuration: 4000,    // Jeda antar slide
        gap: 24,                // Default gap
        easeNormal: "power2.inOut", // Easing yang lebih halus untuk transisi normal
        easeReverse: "power1.out",  // Easing untuk efek mundur
        mobileBreakpoint: 768,      // Breakpoint untuk mobile
        desktopItemsPerView: 2,     // Jumlah item per view di desktop
        mobileItemsPerView: 1       // Jumlah item per view di mobile
    };

    // Cek apakah saat ini tampilan mobile atau desktop
    const isMobile = () => window.innerWidth <= config.mobileBreakpoint;

    // Pastikan carousel memiliki CSS yang benar
    carousel.style.scrollBehavior = 'auto';
    carousel.style.scrollSnapType = 'none';
    carousel.style.overflow = 'hidden';  // Penting untuk menampilkan transisi slide
    
    // Set gap yang konsisten dan optimasi CSS
    const computedStyle = window.getComputedStyle(carousel);
    config.gap = parseInt(computedStyle.gap) || config.gap;
    carousel.style.gap = `${config.gap}px`;
    
    // Tambahkan kelas untuk hardware acceleration
    carousel.classList.add('hardware-accelerated');

    // Reset posisi awal
    carousel.scrollLeft = 0;

    // State
    let isSliding = false;
    let isPaused = false;
    let rafId = null;

    // Siapkan CSS untuk animasi slide yang lebih halus, dengan dukungan responsive
    const styleElement = document.createElement('style');
    styleElement.id = 'portfolio-slide-styles';
    styleElement.textContent = `
        #portfolioCarousel {
            transition: none;
            overflow: hidden !important;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            transform: translate3d(0,0,0);
            will-change: scroll-position;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
        }
        .portfolio-item {
            /* Default style adalah untuk desktop */
            min-width: calc(50% - ${config.gap/2}px);
            width: calc(50% - ${config.gap/2}px);
            transition: transform 0.5s ease;
            backface-visibility: hidden;
            perspective: 1000;
            transform: translate3d(0,0,0);
            will-change: transform;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
        }
        /* Media query untuk mobile */
        @media (max-width: ${config.mobileBreakpoint}px) {
            .portfolio-item {
                min-width: calc(100% - ${config.gap}px);
                width: calc(100% - ${config.gap}px);
            }
            .portfolio-carousel {
                gap: ${Math.max(12, config.gap/2)}px;
            }
        }
        .portfolio-image {
            backface-visibility: hidden;
            perspective: 1000;
            transform: translate3d(0,0,0);
            will-change: transform;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
        }
        .portfolio-image img {
            backface-visibility: hidden;
            transform: translate3d(0,0,0);
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            will-change: transform;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media screen and (min-width: 60hz) {
            .portfolio-carousel {
                -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
            }
        }
    `;
    
    // Tambahkan style jika belum ada
    if (!document.getElementById('portfolio-slide-styles')) {
        document.head.appendChild(styleElement);
    }

    // Hapus container clone jika ada dari versi sebelumnya
    const oldCloneContainer = document.querySelector('.portfolio-clone-container');
    if (oldCloneContainer) {
        oldCloneContainer.parentNode.removeChild(oldCloneContainer);
    }

    // Optimasi untuk performa rendering 60fps
    gsap.ticker.fps(60);
    gsap.defaults({
        force3D: true,
        fastRender: true,
        lazy: false,
        autoRound: true
    });

    // Fungsi untuk menghitung item width yang benar, responsif untuk mobile
    const updateItemWidth = () => {
        const items = carousel.querySelectorAll('.portfolio-item');
        if (!items.length) return;
        
        const containerWidth = carousel.offsetWidth;
        let targetWidth;
        
        // Hitung berdasarkan jumlah item yang ditampilkan
        if (isMobile()) {
            // Mobile view - 1 item penuh
            targetWidth = Math.floor(containerWidth - config.gap);
            
            // Perbarui gap jika perlu
            carousel.style.gap = `${Math.max(12, config.gap/2)}px`;
        } else {
            // Desktop view - 2 item
            targetWidth = Math.floor((containerWidth - config.gap) / 2);
            
            // Reset gap ke nilai default
            carousel.style.gap = `${config.gap}px`;
        }
        
        // Update lebar portfolio items
        items.forEach(item => {
            item.style.minWidth = `${targetWidth}px`;
            item.style.width = `${targetWidth}px`;
        });
    };
    
    // Fungsi untuk mendapatkan lebar satu item + gap
    const getSlideStep = () => {
        const items = carousel.querySelectorAll('.portfolio-item');
        if (!items.length) return 0;
        
        const firstItem = items[0];
        // Gunakan offsetWidth untuk mendapatkan lebar yang akurat
        const computedGap = parseInt(window.getComputedStyle(carousel).gap) || config.gap;
        return Math.floor(firstItem.offsetWidth + computedGap);
    };

    // Optimasi kualitas gambar
    const preloadImages = () => {
        const images = carousel.querySelectorAll('img');
        images.forEach(img => {
            // Pastikan gambar selalu memenuhi kontainer
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = '100%';
            
            if (!img.complete) {
                img.decode().catch(() => {});
            }
            // Force reflow tapi hanya sekali
            void img.offsetHeight;
        });
    };

    // Update item width
    updateItemWidth();
    preloadImages();

    // Fungsi untuk scroll dengan RAF untuk 60fps
    const smoothScroll = (element, target, duration, ease, callback) => {
        const startTime = performance.now();
        const startPos = element.scrollLeft;
        const distance = target - startPos;
        
        // Batalkan animasi yang sedang berjalan jika ada
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        
        // Fungsi easing
        const getEaseValue = (type, t) => {
            // Implementasi easing function untuk performance yang lebih baik
            switch(type) {
                case "power1.out":
                    return 1 - Math.pow(1 - t, 1);
                case "power2.inOut":
                    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                default:
                    return t;
            }
        };
        
        // Fungsi animasi menggunakan RAF
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = getEaseValue(ease, progress);
            
            // Update posisi scroll dengan perhitungan rounded untuk menghindari posisi sub-pixel
            element.scrollLeft = Math.round(startPos + (distance * easeProgress));
            
            // Lanjutkan animasi jika belum selesai
            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            } else {
                // Pastikan mencapai posisi akhir yang tepat
                element.scrollLeft = target;
                
                // Callback setelah animasi selesai
                if (callback) callback();
                
                rafId = null;
            }
        };
        
        // Mulai animasi
        rafId = requestAnimationFrame(animate);
    };

    // Fungsi untuk slide ke item berikutnya dengan animasi yang lebih halus
    const slideToNext = () => {
        if (isSliding || isPaused) return;
        
        isSliding = true;
        
        const slideStep = getSlideStep();
        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
        const currentPos = carousel.scrollLeft;
        
        // Cek jika kita di item terakhir atau mendekati akhir
        if (currentPos >= maxScroll - slideStep / 1.5) {
            // Animasi mundur ke awal dengan RAF
            smoothScroll(
                carousel, 
                0, 
                config.reverseDuration * 1000, 
                config.easeReverse, 
                () => { isSliding = false; }
            );
        } else {
            // Animasi slide normal ke kanan dengan RAF
            smoothScroll(
                carousel, 
                currentPos + slideStep, 
                config.slideDuration * 1000, 
                config.easeNormal, 
                () => { isSliding = false; }
            );
        }
    };

    // Event handlers
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    
    // Tambahkan dukungan touch untuk mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };
    
    const handleSwipe = () => {
        // Mendeteksi arah swipe
        const swipeDistance = touchEndX - touchStartX;
        
        // Jika swipe ke kiri (nilai negatif), maju ke slide berikutnya
        if (swipeDistance < -50 && !isSliding) {
            slideToNext();
            resetInterval();
        }
        // Jika swipe ke kanan (nilai positif), kembali ke slide sebelumnya
        else if (swipeDistance > 50 && !isSliding) {
            // Cek apakah kita di slide pertama
            if (carousel.scrollLeft <= 10) {
                // Jika di slide pertama, lompat ke akhir
                const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
                smoothScroll(
                    carousel, 
                    maxScroll, 
                    config.slideDuration * 1000, 
                    config.easeNormal, 
                    () => { isSliding = false; }
                );
            } else {
                // Kembali ke slide sebelumnya
                const slideStep = getSlideStep();
                smoothScroll(
                    carousel, 
                    Math.max(0, carousel.scrollLeft - slideStep), 
                    config.slideDuration * 1000, 
                    config.easeNormal, 
                    () => { isSliding = false; }
                );
            }
            resetInterval();
        }
    };
    
    // Reset interval setelah interaksi
    const resetInterval = () => {
        if (window.portfolioAutoScrollInterval) {
            clearInterval(window.portfolioAutoScrollInterval);
            window.portfolioAutoScrollInterval = setInterval(slideToNext, config.pauseDuration);
        }
    };
    
    // Setup tombol next
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isSliding) {
                slideToNext();
                resetInterval();
            }
        });
    }

    // Setup event listeners termasuk touch events
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
    
    // Handler untuk resize yang memperbarui layout
    const handleResize = () => {
        updateItemWidth();
        preloadImages();
    };
    
    // Debounce resize event untuk performa
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    
    // Juga perbarui pada orientasi berubah
    window.addEventListener('orientationchange', () => {
        // Delay diperlukan untuk mendapatkan dimensi baru setelah orientasi berubah
        setTimeout(handleResize, 300);
    });

    // Pastikan cleanup pada unload
    window.addEventListener('beforeunload', () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        if (window.portfolioAutoScrollInterval) {
            clearInterval(window.portfolioAutoScrollInterval);
        }
    });

    // Mulai autoplay setelah delay kecil
    setTimeout(() => {
        // Perbarui layout sekali lagi untuk memastikan ukuran yang benar
        updateItemWidth();
        // Panggil slideToNext pertama kali
        slideToNext();
        
        // Set interval global
        window.portfolioAutoScrollInterval = setInterval(slideToNext, config.pauseDuration);
    }, 1000);

    // Cleanup pada tab tidak aktif
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (window.portfolioAutoScrollInterval) {
                clearInterval(window.portfolioAutoScrollInterval);
            }
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        } else if (isAutoScrollActive) {
            if (window.portfolioAutoScrollInterval) {
                clearInterval(window.portfolioAutoScrollInterval);
            }
            window.portfolioAutoScrollInterval = setInterval(slideToNext, config.pauseDuration);
        }
    });

    // Return control methods
    return {
        stop: () => {
            if (window.portfolioAutoScrollInterval) {
                clearInterval(window.portfolioAutoScrollInterval);
                window.portfolioAutoScrollInterval = null;
            }
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            isPaused = true;
        },
        start: () => {
            isPaused = false;
            if (window.portfolioAutoScrollInterval) {
                clearInterval(window.portfolioAutoScrollInterval);
            }
            carousel.scrollLeft = 0;
            updateItemWidth();
            window.portfolioAutoScrollInterval = setInterval(slideToNext, config.pauseDuration);
        }
    };
}

// Utility function untuk debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animasi partikel kunang-kunang yang natural
function animateRandomParticle(particle) {
    // Posisi awal acak
    const startX = parseFloat(particle.style.left) || 50;
    const startY = parseFloat(particle.style.top) || 50;
    
    // Durasi pergerakan yang lebih lambat untuk terbang alami
    const flyDuration = Math.random() * 20 + 15;
    
    // Path terbang dengan beberapa titik kontrol untuk simulasi terbang kunang-kunang
    const points = [];
    const numPoints = Math.floor(Math.random() * 3) + 2; // 2-4 titik dalam path
    
    for (let i = 0; i < numPoints; i++) {
        // Jarak terbang acak, tapi tidak terlalu jauh (max 40%)
        const xOffset = (Math.random() * 80 - 40) / 100; 
        const yOffset = (Math.random() * 80 - 40) / 100;
        
        // Tambahkan titik ke path
        points.push({
            x: Math.max(0.05, Math.min(0.95, startX/100 + xOffset)),
            y: Math.max(0.05, Math.min(0.95, startY/100 + yOffset)),
            scale: 0.8 + Math.random() * 0.4  // Skala lebih konsisten
        });
    }
    
    // Animasi terbang sepanjang path dengan easing alami
    let timeline = gsap.timeline({
        onComplete: function() {
            // Perbarui posisi awal untuk animasi berikutnya
            gsap.set(particle, {
                x: 0,
                y: 0,
                scale: 1,
                left: `${points[points.length-1].x * 100}%`,
                top: `${points[points.length-1].y * 100}%`
            });
            
            // Panggil animasi berikutnya setelah delay kecil
            setTimeout(() => {
                animateRandomParticle(particle);
            }, Math.random() * 500);
        }
    });
    
    // Animasi antara titik-titik path
    points.forEach((point, index) => {
        // Bagi durasi total untuk setiap segmen path
        const segmentDuration = flyDuration / points.length;
        
        // Tambahkan animasi ke timeline
        timeline.to(particle, {
            x: `${point.x * 100 - startX}%`,
            y: `${point.y * 100 - startY}%`,
            scale: point.scale,
            duration: segmentDuration,
            ease: "power1.inOut",
        }, index > 0 ? ">" : 0);
    });
    
    // Animasi kedip kunang-kunang
    gsap.to(particle, {
        opacity: 0.2, // Mulai redup
        duration: 0.8,
        repeat: Math.floor(flyDuration / 1.5),
        yoyo: true,
        ease: "sine.inOut",
        onComplete: function() {
            // Pastikan partikel terlihat untuk animasi selanjutnya
            gsap.set(particle, { opacity: 0.7 });
        }
    });
}

// Buat partikel kunang-kunang
function createParticles(containerId, particleCount) {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;
    
    // Bersihkan container terlebih dahulu untuk mencegah duplikasi
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posisi random dengan pengecekan
        const x = Math.random() * 90 + 5; // 5% sampai 95%
        const y = Math.random() * 90 + 5; // 5% sampai 95%
        
        // Ukuran random dengan variasi yang lebih banyak untuk kunang-kunang
        const size = Math.random() * 4 + 2; // Ukuran lebih konsisten
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = 0.7; // Mulai dengan opacity cukup tinggi
        
        // Variasi warna kunang-kunang: kuning ke oranye
        const r = 255;
        const g = Math.floor(200 + Math.random() * 55);
        const b = Math.floor(30 + Math.random() * 40);
        particle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Efek glow
        particle.style.boxShadow = `0 0 ${Math.random() * 12 + 8}px rgba(255, 212, 71, 0.${Math.floor(Math.random() * 5 + 5)})`;
        
        // Tambahkan partikel ke container
        particlesContainer.appendChild(particle);
        
        // Animasi partikel dengan delay random
        setTimeout(() => {
            animateRandomParticle(particle);
        }, Math.random() * 3000); // Delay awal bervariasi
    }
}

// Setup carousel controls
function setupCarouselControls() {
    const carousel = document.getElementById('portfolioCarousel');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !nextBtn) return;
    
    let isScrolling = false;
    
    // Mendapatkan width item dan gap untuk scrolling
    const getItemWidth = () => {
        const item = carousel.querySelector('.portfolio-item');
        if (!item) return 0;
        
        const style = window.getComputedStyle(carousel);
        const gap = parseInt(style.getPropertyValue('gap') || '0', 10);
        
        return item.getBoundingClientRect().width + gap;
    };
    
    nextBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        // Animasi efek hover pada tombol
        gsap.to(nextBtn, {
            scale: 1.1,
            duration: 0.15,
            yoyo: true,
            repeat: 1
        });
        
        // Dapatkan lebar item terbaru (untuk responsif)
        const itemWidth = getItemWidth();
        
        // Ambil posisi scroll saat ini
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Jika sudah di akhir, kembali ke awal dengan transisi mulus
        if (currentScroll >= maxScroll - 20) {
            // Clone hanya item yang diperlukan untuk transisi
            const items = Array.from(carousel.querySelectorAll('.portfolio-item'));
            const fragment = document.createDocumentFragment();
            const clones = [];
            
            // Clone hanya beberapa item pertama yang diperlukan
            for (let i = 0; i < Math.min(4, items.length); i++) {
                const clone = items[i].cloneNode(true);
                fragment.appendChild(clone);
                clones.push(clone);
            }
            
            // Tambahkan clone ke carousel
            carousel.appendChild(fragment);
            
            // One-step transition untuk menghindari glitch
            gsap.to(carousel, {
                scrollLeft: currentScroll + itemWidth,
                duration: 1.5,
                ease: "power1.inOut",
                force3D: true,
                useRAF: true,
                onComplete: () => {
                    // Freeze carousel
                    carousel.style.scrollBehavior = 'auto';
                    carousel.style.transition = 'none';
                    
                    // Reset ke awal segera
                    carousel.scrollLeft = 0;
                    
                    // Remove clones
                    clones.forEach(clone => carousel.removeChild(clone));
                    
                    // Re-enable smooth behavior
                    gsap.delayedCall(0.05, () => {
                        carousel.style.scrollBehavior = 'smooth';
                        carousel.style.transition = '';
                        isScrolling = false;
                    });
                }
            });
        } else {
            // Scroll normal ke item berikutnya
            gsap.to(carousel, {
                scrollLeft: currentScroll + itemWidth,
                duration: 1.0,
                ease: "power1.inOut",
                force3D: true,
                useRAF: true,
                onComplete: () => {
                    isScrolling = false;
                }
            });
        }
    });
    
    // Tambahkan event untuk drag/swipe pada carousel yang dioptimalkan
    let isDragging = false;
    let startX;
    let startScrollLeft;
    let lastPageX;
    let rafId;
    let velocityX = 0;
    const MOMENTUM_FACTOR = 0.8;
    
    // Menggunakan requestAnimationFrame untuk smooth scrolling saat drag
    function moveCarousel(pageX) {
        if (!isDragging) return;
        
        // Hitung jarak perpindahan dan arah
        const deltaX = pageX - lastPageX;
        lastPageX = pageX;
        
        // Update velocity untuk momentum
        velocityX = deltaX * 0.5 + velocityX * 0.5;
        
        // Hanya izinkan drag ke kiri (nilai positif)
        const distance = Math.max(0, startX - pageX) * 1.2;
        
        // Gunakan RAF untuk animasi yang lebih halus
        carousel.scrollLeft = startScrollLeft + distance;
        
        // Lanjutkan animasi
        rafId = requestAnimationFrame(() => moveCarousel(pageX));
    }
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.classList.add('grabbing');
        startX = e.pageX;
        lastPageX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        velocityX = 0;
        
        // Matikan transisi CSS saat drag untuk responsivitas yang lebih baik
        carousel.style.transition = 'none';
        
        // Cancel any existing RAF
        if (rafId) cancelAnimationFrame(rafId);
        
        // Mulai animasi
        rafId = requestAnimationFrame(() => moveCarousel(e.pageX));
        
        // Hentikan autoscroll saat user mulai drag
        isScrolling = true;
        
        // Prevent default untuk mencegah highlight teks
        e.preventDefault();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        // Tidak perlu lagi update di sini, karena sudah ditangani oleh RAF
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        // Stop animation
        cancelAnimationFrame(rafId);
        
        // Apply momentum scrolling
        if (Math.abs(velocityX) > 0.5) {
            const momentum = velocityX * 10;
            gsap.to(carousel, {
                scrollLeft: carousel.scrollLeft + momentum,
                duration: 0.5,
                ease: "power2.out"
            });
        }
        
        isDragging = false;
        carousel.classList.remove('grabbing');
        
        // Kembalikan transisi CSS setelah drag
        carousel.style.transition = '';
        
        // Setelah beberapa detik, izinkan autoscroll lagi
        setTimeout(() => {
            isScrolling = false;
        }, 3000);
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            cancelAnimationFrame(rafId);
            isDragging = false;
            carousel.classList.remove('grabbing');
            carousel.style.transition = '';
        }
    });
    
    // Nonaktifkan drag pada gambar dalam carousel
    const carouselImages = carousel.querySelectorAll('img');
    carouselImages.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

// Animasi untuk ornaments
function animateOrnaments() {
    // Animate paw icons dengan bounce effect
    gsap.to('.floral-corner', {
        y: 10,
        rotation: 15,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });
    
    // Animate mega mendung paws dengan floating effect
    const pawOrnaments = document.querySelectorAll('.mega-mendung');
    
    pawOrnaments.forEach(paw => {
        // Animasi bounce dan scale untuk paw
        gsap.to(paw, {
            y: -15,
            rotation: -15,
            scale: 1.1,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    });
}

// Animasi navigasi bar
function animateNavigation() {
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// Animasi intro section
function animateIntro() {
    const introTimeline = gsap.timeline();
    
    introTimeline
        .from('#intro h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        })
        .from('#intro h2', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.intro-buttons', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.scroll-down', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3');
}

// Animasi about section
function animateAbout() {
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// Animasi work/portfolio
function animatePortfolio() {
    // Animasi untuk judul
    gsap.from('#work h2', {
        scrollTrigger: {
            trigger: '#work',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Animasi untuk portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
        
        // Animasi untuk detail portofolio saat scroll
        const details = item.querySelector('.portfolio-details');
        gsap.from(details, {
            scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3 + (index * 0.2),
            ease: 'power3.out'
        });
    });
}

// Animasi testimonials
function animateTestimonials() {
    // Animasi untuk judul
    gsap.from('#testimonials h2', {
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Animasi untuk testimonials dengan stagger
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach((testimonial, index) => {
        gsap.from(testimonial, {
            scrollTrigger: {
                trigger: testimonial,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
        
        // Animasi untuk elemen dalam testimonial
        const image = testimonial.querySelector('.testimonial-image');
        const quote = testimonial.querySelector('blockquote');
        const cite = testimonial.querySelector('cite');
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: testimonial,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        tl.from(image, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: 0.1 + (index * 0.2),
            ease: 'back.out'
        })
        .from(quote, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .from(cite, {
            y: 10,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');
    });
}

// Animasi contact section
function animateContact() {
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    contactTl
        .from('#contact h2', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.contact-info', {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.contact-form', {
            x: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

    // Setup form submission handler with animations
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Create thank you message container if not exists
            let thankYouContainer = document.querySelector('.thank-you-message');
            if (!thankYouContainer) {
                thankYouContainer = document.createElement('div');
                thankYouContainer.className = 'thank-you-message';
                thankYouContainer.style.position = 'absolute';
                thankYouContainer.style.top = '0';
                thankYouContainer.style.left = '0';
                thankYouContainer.style.width = '100%';
                thankYouContainer.style.height = '100%';
                thankYouContainer.style.display = 'flex';
                thankYouContainer.style.flexDirection = 'column';
                thankYouContainer.style.justifyContent = 'center';
                thankYouContainer.style.alignItems = 'center';
                thankYouContainer.style.opacity = '0';
                thankYouContainer.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
                thankYouContainer.style.borderRadius = '10px';
                
                const foxIcon = document.createElement('img');
                foxIcon.src = './assets/images/fox-icon.svg';
                foxIcon.style.width = '100px';
                foxIcon.style.height = '100px';
                foxIcon.style.marginBottom = '20px';
                
                const message = document.createElement('h3');
                message.textContent = 'Terima Kasih!';
                message.style.color = '#FFD447';
                message.style.fontSize = '28px';
                
                thankYouContainer.appendChild(foxIcon);
                thankYouContainer.appendChild(message);
                form.appendChild(thankYouContainer);
            }
            
            // Animation timeline
            const submitTl = gsap.timeline();
            
            // Fade out form fields and labels
            const formElements = form.querySelectorAll('input, textarea, button, label');
            submitTl.to(formElements, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    formElements.forEach(element => element.style.visibility = 'hidden');
                    thankYouContainer.style.display = 'flex';
                }
            })
            // Fade in thank you message with fox icon
            .to(thankYouContainer, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.in'
            })
            // Wait for 2 seconds
            .to({}, {
                duration: 2
            })
            // Fade out thank you message
            .to(thankYouContainer, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    thankYouContainer.style.display = 'none';
                    formElements.forEach(element => element.style.visibility = 'visible');
                    form.reset();
                }
            })
            // Fade in form fields
            .to(formElements, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.in'
            });
            
            // Submit form data
            try {
                const formData = new FormData(form);
                await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    }
}

// Setup smooth scrolling untuk link navigasi
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .scroll-down, .intro-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const target = document.querySelector(link.getAttribute('href'));
            
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Parallax effect untuk beberapa elemen
function setupParallaxEffects() {
    // Parallax untuk intro section
    gsap.to('.intro-background', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Parallax untuk testimonial background
    gsap.to('#testimonials', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Inisialisasi filter portofolio
function initializePortfolioFilter() {
    const categories = document.querySelectorAll('.category');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const carousel = document.getElementById('portfolioCarousel');
    
    if (!categories.length || !portfolioItems.length || !carousel) return;
    
    // Referensi untuk kontrol carousel
    let carouselControl;
    
    // Click event untuk kategori
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Hapus class active dari semua kategori
            categories.forEach(c => c.classList.remove('active'));
            // Tambahkan class active ke kategori yang dipilih
            category.classList.add('active');
            
            // Tambahkan efek kilau saat diklik
            gsap.to(category, {
                boxShadow: '0 0 30px rgba(255, 212, 71, 0.5)',
                duration: 0.3,
                onComplete: () => {
                    gsap.to(category, {
                        boxShadow: '0 0 15px rgba(255, 212, 71, 0.2)',
                        duration: 0.5,
                        delay: 0.2
                    });
                }
            });
            
            const selectedCategory = category.getAttribute('data-category');
            
            // Toggle auto-scroll berdasarkan kategori
            if (selectedCategory === 'all') {
                // Aktifkan auto-scroll untuk kategori "Semua"
                isAutoScrollActive = true;
                if (carouselControl) {
                    carouselControl.start();
                }
            } else {
                // Nonaktifkan auto-scroll untuk kategori lainnya
                isAutoScrollActive = false;
                if (carouselControl) {
                    carouselControl.stop();
                }
            }
            
            // Reset scroll position
            gsap.to(carousel, {
                scrollLeft: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Filter portfolio items with smooth animation
            portfolioItems.forEach(item => {
                if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                    // Show with smooth scale up animation
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        display: 'block',
                        duration: 0.4,
                        ease: 'back.out(1.7)',
                        clearProps: 'scale'
                    });
                } else {
                    // Hide with smooth scale down animation
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power1.in',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
            
            // Update carousel scroll buttons
            setTimeout(() => {
                carousel.dispatchEvent(new Event('scroll'));
            }, 500);
        });
    });
    
    // Inisialisasi carousel autoscroll dan simpan referensi kontrol
    carouselControl = startPortfolioAutoScroll();
}

// Fungsi untuk inisialisasi slide dokumentasi
function initializeDokumentasi() {
    // Ambil elemen yang diperlukan
    const currentTimeEl = document.getElementById('current-time');
    const currentDayEl = document.getElementById('current-day');
    const eventTitleEl = document.getElementById('event-title');
    const driveLinkEl = document.getElementById('drive-link');
    const eventDateEl = document.getElementById('event-date');
    const dokumentasiSection = document.getElementById('dokumentasi');
    
    // Buat partikel untuk seksi dokumentasi
    createParticles('dokumentasi-particles', 35);

    // Fungsi untuk menyetel waktu saat ini
    function updateCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        if (currentTimeEl) {
            currentTimeEl.textContent = `${hours}`;
            
            // Tambahkan span untuk menit dengan format yang lebih tajam
            if (!document.getElementById('current-minutes')) {
                const minutesSpan = document.createElement('span');
                minutesSpan.id = 'current-minutes';
                minutesSpan.style.fontFamily = 'Orbitron, sans-serif';
                minutesSpan.style.fontWeight = '400';
                minutesSpan.style.fontSize = '3.5rem';
                minutesSpan.style.opacity = '0.8';
                minutesSpan.style.marginLeft = '5px';
                minutesSpan.style.letterSpacing = '2px';
                minutesSpan.textContent = `:${minutes}`;
                currentTimeEl.appendChild(minutesSpan);
            } else {
                document.getElementById('current-minutes').textContent = `:${minutes}`;
            }
        }
    }
    
    // Fungsi untuk menyetel tanggal saat ini dalam format Indonesia
    function setCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        if (currentDayEl) {
            currentDayEl.textContent = formatter.format(today);
        }
    }
    
    // Set tanggal dan waktu saat ini
    setCurrentDate();
    updateCurrentTime();
    
    // Update waktu setiap detik
    setInterval(updateCurrentTime, 1000);
    
    // Baca data dari JSON
    fetch('./data/dokumentasi.json')
        .then(response => response.json())
        .then(data => {
            if (eventTitleEl) eventTitleEl.textContent = data.judul;
            if (driveLinkEl) driveLinkEl.href = data.linkDrive;
            
            // Format tanggal event menggunakan elemen yang sudah ada
            const existingDate = data.tanggalEvent || "12 02 2004";
            const dateParts = existingDate.split(/[\s\.]+/); // Split with space or dot
            
            if (eventDateEl) {
                const digits = eventDateEl.querySelectorAll('.digit');
                
                if (digits.length === 3 && dateParts.length >= 3) {
                    digits[0].textContent = dateParts[0];
                    digits[1].textContent = dateParts[1];
                    digits[2].textContent = dateParts[2];
                }
            }
            
            // Set background jika ada
            if (data.backgroundImage && dokumentasiSection) {
                const customBgStyle = `url('${data.backgroundImage}')`;
                dokumentasiSection.style.setProperty('--custom-bg-image', customBgStyle);
            }
            
            // Simpan data ke localStorage sebagai cadangan
            localStorage.setItem('dokumentasiData', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error loading data:', error);
            
            // Coba ambil dari localStorage jika ada
            const savedData = localStorage.getItem('dokumentasiData');
            if (savedData) {
                const data = JSON.parse(savedData);
                if (eventTitleEl) eventTitleEl.textContent = data.judul;
                if (driveLinkEl) driveLinkEl.href = data.linkDrive;
                
                // Format tanggal event
                const existingDate = data.tanggalEvent || "12 02 2004";
                const dateParts = existingDate.split(/[\s\.]+/);
                
                if (eventDateEl) {
                    const digits = eventDateEl.querySelectorAll('.digit');
                    
                    if (digits.length === 3 && dateParts.length >= 3) {
                        digits[0].textContent = dateParts[0];
                        digits[1].textContent = dateParts[1];
                        digits[2].textContent = dateParts[2];
                    }
                }
                
                if (data.backgroundImage && dokumentasiSection) {
                    const customBgStyle = `url('${data.backgroundImage}')`;
                    dokumentasiSection.style.setProperty('--custom-bg-image', customBgStyle);
                }
            }
        });
        
    // Animasi khusus untuk ikon folder dengan bouncing effect
    gsap.fromTo(
        '.folder-icon',
        { 
            opacity: 0, 
            scale: 0.8, 
            y: 20 // Posisi awal lebih bawah
        },
        { 
            opacity: 1, 
            scale: 1, 
            y: 0, // Kembali ke posisi normal
            duration: 1,
            delay: 0.4,
            ease: "back.out(1.5)",
            onComplete: function() {
                // Setelah animasi awal, buat animasi naik turun sederhana
                gsap.timeline({
                    repeat: -1,
                    defaults: {
                        duration: 2,
                        ease: "none"
                    }
                })
                .to('.folder-icon', {
                    y: -35 // Naik selama 2 detik
                })
                .to('.folder-icon', {
                    y: 35 // Turun selama 2 detik
                });
            },
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Fungsi untuk menangani fitur hidden command
function setupHiddenCommand() {
    const secretCode = 'murreki';
    let typedCode = '';
    const editModal = document.getElementById('edit-modal');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveToGithubBtn = document.getElementById('save-to-github-btn');
    
    // Input fields
    const titleInput = document.getElementById('edit-title');
    const dateInput = document.getElementById('edit-date');
    const linkInput = document.getElementById('edit-link');
    const bgInput = document.getElementById('edit-background');
    
    // Event listener untuk keyboard
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        typedCode += key;
        
        if (typedCode.includes(secretCode)) {
            typedCode = '';
            openEditMode();
        }
        
        if (typedCode.length > 20) {
            typedCode = typedCode.substring(typedCode.length - 10);
        }
    });
    
    // Fungsi untuk membuka mode edit
    function openEditMode() {
        let data = {};
        const savedData = localStorage.getItem('dokumentasiData');
        
        if (savedData) {
            data = JSON.parse(savedData);
        } else {
            fetch('./data/dokumentasi.json')
                .then(response => response.json())
                .then(jsonData => {
                    data = jsonData;
                    fillEditForm(data);
                })
                .catch(error => {
                    console.error('Error loading data:', error);
                    data = {
                        judul: 'Event Default',
                        tanggalEvent: 'DD/MM/YYYY',
                        linkDrive: '#',
                        backgroundImage: ''
                    };
                    fillEditForm(data);
                });
        }
        
        fillEditForm(data);
        
        if (editModal) {
            editModal.classList.add('active');
            playEditorSound();
        }
    }
    
    // Fungsi untuk mengisi form edit
    function fillEditForm(data) {
        if (titleInput) titleInput.value = data.judul || '';
        if (dateInput) dateInput.value = data.tanggalEvent || '';
        if (linkInput) linkInput.value = data.linkDrive || '';
        if (bgInput) bgInput.value = data.backgroundImage || '';
    }
    
    // Fungsi untuk menyimpan ke GitHub melalui Netlify Function
    async function saveToGitHub(data) {
        try {
            const response = await fetch('/.netlify/functions/update-dokumentasi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save to GitHub');
            }

            const result = await response.json();
            alert('Berhasil disimpan ke GitHub!');
            
            // Refresh data dari server
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error saving to GitHub:', error);
            alert(`Gagal menyimpan ke GitHub: ${error.message}\n\nSilakan gunakan Netlify CMS (/admin/) dengan login email Ariph9001@gmail.com dan password ariph260403`);
        }
    }
    
    // Event listener untuk tombol Save
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const newData = {
                judul: titleInput ? titleInput.value : '',
                tanggalEvent: dateInput ? dateInput.value : '',
                linkDrive: linkInput ? linkInput.value : '',
                backgroundImage: bgInput ? bgInput.value : ''
            };
            
            localStorage.setItem('dokumentasiData', JSON.stringify(newData));
            updateDokumentasiUI(newData);
            
            if (editModal) {
                editModal.classList.remove('active');
            }
        });
    }
    
    // Event listener untuk tombol Save to GitHub
    if (saveToGithubBtn) {
        saveToGithubBtn.addEventListener('click', async () => {
            const newData = {
                judul: titleInput ? titleInput.value : '',
                tanggalEvent: dateInput ? dateInput.value : '',
                linkDrive: linkInput ? linkInput.value : '',
                backgroundImage: bgInput ? bgInput.value : ''
            };
            
            // Simpan ke localStorage terlebih dahulu
            localStorage.setItem('dokumentasiData', JSON.stringify(newData));
            
            // Kirim ke GitHub
            await saveToGitHub(newData);
            
            if (editModal) {
                editModal.classList.remove('active');
            }
        });
    }
    
    // Event listener untuk tombol Cancel
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (editModal) {
                editModal.classList.remove('active');
            }
        });
    }
    
    // Fungsi untuk memperbarui UI
    function updateDokumentasiUI(data) {
        const eventTitleEl = document.getElementById('event-title');
        const driveLinkEl = document.getElementById('drive-link');
        const eventDateEl = document.getElementById('event-date');
        const dokumentasiSection = document.getElementById('dokumentasi');
        
        if (eventTitleEl) eventTitleEl.textContent = data.judul;
        if (driveLinkEl) driveLinkEl.href = data.linkDrive;
        
        if (eventDateEl) {
            const existingDate = data.tanggalEvent || "12 02 2004";
            const dateParts = existingDate.split(/[\s\.]+/);
            
            const digits = eventDateEl.querySelectorAll('.digit');
            
            if (digits.length === 3 && dateParts.length >= 3) {
                digits[0].textContent = dateParts[0];
                digits[1].textContent = dateParts[1];
                digits[2].textContent = dateParts[2];
            }
        }
        
        if (data.backgroundImage && dokumentasiSection) {
            const customBgStyle = `url('${data.backgroundImage}')`;
            dokumentasiSection.style.setProperty('--custom-bg-image', customBgStyle);
        } else if (dokumentasiSection) {
            dokumentasiSection.style.removeProperty('--custom-bg-image');
        }
    }
}

// Animasi untuk seksi dokumentasi
function animateDokumentasi() {
    // Animasi untuk elemen tanggal sekarang
    const currentDateContainer = document.getElementById('current-date');
    const currentTimeEl = document.getElementById('current-time');
    const currentDayEl = document.getElementById('current-day');
    
    if (currentDateContainer) {
        // Animasi masuk untuk jam
        gsap.fromTo(
            currentTimeEl,
            { 
                opacity: 0, 
                y: -30,
                scale: 0.8
            },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '#dokumentasi',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Animasi untuk hari
        gsap.fromTo(
            currentDayEl,
            { 
                opacity: 0, 
                y: 20
            },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '#dokumentasi',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    // Animasi untuk tanggal event
    const eventDateDigits = document.querySelectorAll('#event-date .digit');
    const eventDateSeparators = document.querySelectorAll('#event-date .separator');
    
    // Animasi untuk digit dengan stagger
    gsap.fromTo(
        eventDateDigits,
        { 
            opacity: 0, 
            y: 30,
            scale: 0.8
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animasi untuk separator
    gsap.fromTo(
        eventDateSeparators,
        { 
            opacity: 0
        },
        { 
            opacity: 0.7,
            delay: 0.6,
            duration: 0.4,
            ease: "power1.in",
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animasi untuk judul event
    gsap.fromTo(
        '#event-title',
        { 
            opacity: 0, 
            y: -50,
        },
        { 
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animasi khusus untuk ikon folder dengan bouncing effect
    gsap.fromTo(
        '.folder-icon',
        { 
            opacity: 0, 
            scale: 0.8, 
            y: 20 // Posisi awal lebih bawah
        },
        { 
            opacity: 1, 
            scale: 1, 
            y: 0, // Kembali ke posisi normal
            duration: 1,
            delay: 0.4,
            ease: "back.out(1.5)",
            onComplete: function() {
                // Setelah animasi awal, buat animasi naik turun sederhana
                gsap.timeline({
                    repeat: -1,
                    defaults: {
                        duration: 2,
                        ease: "none"
                    }
                })
                .to('.folder-icon', {
                    y: -35 // Naik selama 2 detik
                })
                .to('.folder-icon', {
                    y: 35 // Turun selama 2 detik
                });
            },
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animasi untuk tombol
    gsap.fromTo(
        '#drive-link',
        { 
            opacity: 0, 
            y: 30
        },
        { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            delay: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animasi untuk label tanggal
    gsap.fromTo(
        '.date-label',
        { 
            opacity: 0, 
            y: 20
        },
        { 
            opacity: 0.6, 
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '#dokumentasi',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Tambahkan efek hover pada tombol
    const driveLink = document.getElementById('drive-link');
    if (driveLink) {
        driveLink.addEventListener('mouseenter', () => {
            gsap.to(driveLink, {
                y: -5,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: '0 8px 20px rgba(255, 212, 71, 0.5)'
            });
        });
        
        driveLink.addEventListener('mouseleave', () => {
            gsap.to(driveLink, {
                y: 0,
                duration: 0.3,
                ease: "power2.in",
                boxShadow: '0 5px 15px rgba(255, 212, 71, 0.3)'
            });
        });
    }
}