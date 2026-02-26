document.addEventListener("DOMContentLoaded", () => {
    // --- 1. DOM ELEMENTS ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const video = document.getElementById('bg-video');

    // --- 2. MENU MOBILE ---
    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }

    // --- 3. SMOOTH SCROLL (PC Only > 1024px) ---
    if (window.innerWidth > 1024) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                lenis.scrollTo(this.getAttribute('href'));
            });
        });
    }

    // --- 4. VIDEO BACKGROUND FIX ---
    if (video) {
        const playVideo = () => {
            if (video.paused) {
                video.play().catch(() => {});
            }
        };
        playVideo();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") playVideo();
        });
        window.addEventListener("pageshow", playVideo);
    }

    // --- 5. MOUNTAIN DIVE EFFECT ---
    if (window.innerWidth > 1024) {
        const homeSection = document.querySelector('.home');
        const videoElement = document.querySelector('.back-video');
        const overlay = document.querySelector('.overlay');
        const homeContent = document.querySelector('.home-content');
        
        let ticking = false;

        function mountainDive() {
            const scrollY = window.pageYOffset;
            const homeHeight = homeSection.offsetHeight;
            const progress = Math.min(scrollY / homeHeight, 1);

            // EFFET DIVE : Zoom progressif sur la vidéo (comme si on plongeait)
            if (videoElement) {
                const scale = 1 + (progress * 0.5); // De 1 à 1.5
                videoElement.style.transform = `scale(${scale})`;
            }

            // Le contenu disparaît rapidement (on dive à travers)
            if (homeContent) {
                homeContent.style.opacity = 1 - (progress * 2);
                homeContent.style.transform = `translateY(${progress * 100}px) scale(${1 - progress * 0.3})`;
            }

            // L'overlay s'assombrit (on entre dans la montagne)
            if (overlay) {
                const darkness = 0.3 + (progress * 0.6);
                overlay.style.background = `linear-gradient(to bottom, rgba(0,0,0,${darkness}), #050505)`;
            }
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    mountainDive();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Init
        mountainDive();
    }
});

    // --- 7. FORM VALIDATION & FEEDBACK ---
  const contactForm = document.querySelector('.contact form');
  if (contactForm) {
        // Crée le message de feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'form-feedback';
    contactForm.appendChild(feedbackDiv);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
            
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
            
            // Animation envoi
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                 headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Succès
                feedbackDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                feedbackDiv.className = 'form-feedback success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
            } catch (error) {
                // Erreur
                feedbackDiv.textContent = '✗ Oops! Something went wrong. Please try again.';
                feedbackDiv.className = 'form-feedback error';
            }

            // Reset bouton
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';

            // Efface le message après 5s
            setTimeout(() => {
            feedbackDiv.className = 'form-feedback';
         }, 5000);
    });
}

// --- 6. PILOT 3D TILT EFFECT ---
    const pilotContainer = document.querySelector('.image-box');
    const pilotImg = pilotContainer ? pilotContainer.querySelector('img') : null;

    if (pilotContainer && pilotImg) {
        pilotContainer.addEventListener('mousemove', (e) => {
            const rect = pilotContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const sensitivity = 20;
            pilotImg.style.transform = `perspective(1000px) rotateY(${x / sensitivity}deg) rotateX(${-y / sensitivity}deg) scale(1.05)`;
        });

        pilotContainer.addEventListener('mouseenter', () => {
            pilotImg.style.transition = 'transform 0.1s ease-out';
        });

        pilotContainer.addEventListener('mouseleave', () => {
            pilotImg.style.transition = 'transform 0.5s ease';
            pilotImg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }

