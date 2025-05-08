/**
 * Placeholder untuk gambar dengan SVG
 * Buat placeholder sementara sebagai pengganti foto nyata Murreki
 */

document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk membuat URL data SVG dengan warna dan teks
    function createPlaceholderImage(width, height, bgColor, textColor, text) {
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="${bgColor}"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 10}px" fill="${textColor}">${text}</text>
            </svg>
        `;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
    }

    // Generate placeholder untuk gambar profil
    const profilePlaceholder = createPlaceholderImage(800, 1000, '#3E2F23', '#FFD447', 'Murreki Portrait');
    
    // Generate placeholder untuk karya
    const work1Placeholder = createPlaceholderImage(1920, 1080, '#1A1A1A', '#FFD447', 'Nostalgia Kopi');
    const work2Placeholder = createPlaceholderImage(1920, 1080, '#3E2F23', '#FFD447', 'Cahaya Senja');
    const work3Placeholder = createPlaceholderImage(1920, 1080, '#1A1A1A', '#FFD447', 'Urban Solitude');
    const work4Placeholder = createPlaceholderImage(1920, 1080, '#3E2F23', '#FFD447', 'Harmoni Alam');
    
    // Generate placeholder untuk background testimoni
    const testimonialBgPlaceholder = createPlaceholderImage(1920, 1080, '#0f0f0f', '#B64728', 'Testimoni Background');
    
    // Generate placeholder untuk avatar klien
    const client1Placeholder = createPlaceholderImage(200, 200, '#B64728', '#FFD447', 'Client 1');
    const client2Placeholder = createPlaceholderImage(200, 200, '#B64728', '#FFD447', 'Client 2');
    const client3Placeholder = createPlaceholderImage(200, 200, '#B64728', '#FFD447', 'Client 3');

    // Terapkan placeholder ke elemen HTML
    // Profil Murreki
    const profileImage = document.querySelector('.about-image');
    if (profileImage) {
        profileImage.src = profilePlaceholder;
    }
    
    // Background karya
    document.querySelectorAll('.work-slide').forEach((slide, index) => {
        if (index === 0) {
            slide.style.backgroundImage = `url('${work1Placeholder}')`;
        } else if (index === 1) {
            slide.style.backgroundImage = `url('${work2Placeholder}')`;
        } else if (index === 2) {
            slide.style.backgroundImage = `url('${work3Placeholder}')`;
        } else if (index === 3) {
            slide.style.backgroundImage = `url('${work4Placeholder}')`;
        }
    });
    
    // Background testimonial
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection) {
        testimonialSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${testimonialBgPlaceholder}')`;
    }
    
    // Avatar klien
    const clientAvatars = document.querySelectorAll('.testimonial-avatar img');
    clientAvatars.forEach((avatar, index) => {
        if (index === 0) {
            avatar.src = client1Placeholder;
        } else if (index === 1) {
            avatar.src = client2Placeholder;
        } else if (index === 2) {
            avatar.src = client3Placeholder;
        }
    });
}); 