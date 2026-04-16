/**
 * ANTICA SALUMERIA - MAIN.JS
 * Gestione interazioni: Hamburger menu, Float widget, Swiper carosello, Scroll reveal
 * Autore: Francesco Garofalo
 * Versione: 1.0.0
 */

(function() {
    'use strict';

    // Attendi che il DOM sia completamente caricato
    document.addEventListener('DOMContentLoaded', function() {
        
        // ============================================================
        // 1. HAMBURGER MENU (Mobile)
        // ============================================================
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (hamburgerBtn && mobileMenu) {
            // Toggle menu al click sull'hamburger
            hamburgerBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Aggiorna stati ARIA
                this.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.setAttribute('aria-hidden', isExpanded);
                
                // Classi CSS per animazioni
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Chiudi menu cliccando su un link
            const menuLinks = mobileMenu.querySelectorAll('.menu-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    hamburgerBtn.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });

            // Chiudi menu cliccando fuori
            document.addEventListener('click', function(e) {
                if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    if (mobileMenu.classList.contains('active')) {
                        hamburgerBtn.setAttribute('aria-expanded', 'false');
                        mobileMenu.setAttribute('aria-hidden', 'true');
                        hamburgerBtn.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    }
                }
            });

            // Accessibilità: chiudi menu con tasto ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    hamburgerBtn.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.focus(); // Ritorna il focus al pulsante
                }
            });
        }

        // ============================================================
        // 2. FLOAT WIDGET (WhatsApp / Instagram)
        // ============================================================
        const floatToggle = document.getElementById('float-toggle');
        const floatMenu = document.getElementById('float-menu');
        
        if (floatToggle && floatMenu) {
            floatToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                this.setAttribute('aria-expanded', !isExpanded);
                floatMenu.setAttribute('aria-hidden', isExpanded);
                floatMenu.classList.toggle('active');
                
                // Cambia icona: omino → X (opzionale)
                const iconSpan = this.querySelector('span');
                if (iconSpan) {
                    iconSpan.textContent = isExpanded ? '👤' : '✕';
                }
            });

            // Chiudi menu cliccando fuori
            document.addEventListener('click', function(e) {
                if (!floatToggle.contains(e.target) && !floatMenu.contains(e.target)) {
                    if (floatMenu.classList.contains('active')) {
                        floatToggle.setAttribute('aria-expanded', 'false');
                        floatMenu.setAttribute('aria-hidden', 'true');
                        floatMenu.classList.remove('active');
                        const iconSpan = floatToggle.querySelector('span');
                        if (iconSpan) iconSpan.textContent = '👤';
                    }
                }
            });

            // Chiudi con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && floatMenu.classList.contains('active')) {
                    floatToggle.setAttribute('aria-expanded', 'false');
                    floatMenu.setAttribute('aria-hidden', 'true');
                    floatMenu.classList.remove('active');
                    const iconSpan = floatToggle.querySelector('span');
                    if (iconSpan) iconSpan.textContent = '👤';
                    floatToggle.focus();
                }
            });
        }

        // ============================================================
        // 3. SWIPER CAROSELLO (Galleria prodotti)
        // ============================================================
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper('.product-swiper', {
                // Loop infinito
                loop: true,
                
                // Effetto di transizione
                effect: 'slide',
                speed: 600,
                
                // Slides per view (responsive)
                slidesPerView: 1,
                spaceBetween: 20,
                
                // Breakpoints responsivi
                breakpoints: {
                    // Tablet
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // Desktop
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // Large Desktop
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                },
                
                // Navigazione
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                // Paginazione
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                
                // Accessibilità
                a11y: {
                    prevSlideMessage: 'Slide precedente',
                    nextSlideMessage: 'Slide successiva',
                    firstSlideMessage: 'Questa è la prima slide',
                    lastSlideMessage: 'Questa è l\'ultima slide',
                    paginationBulletMessage: 'Vai alla slide {{index}}',
                },
                
                // Autoplay (opzionale, commentato)
                // autoplay: {
                //     delay: 3000,
                //     disableOnInteraction: false,
                // },
                
                // Lazy loading immagini
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 2,
                },
                
                // Keyboard control
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                
                // Grab cursor
                grabCursor: true,
            });
            
            console.log('✅ Swiper inizializzato con successo');
        } else {
            console.warn('⚠️ Swiper non caricato. Verifica la connessione CDN.');
        }

        // ============================================================
        // 4. SCROLL REVEAL (Animazioni al scroll)
        // ============================================================
        // Opzione 1: Intersection Observer nativo (performance)
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll('.info-card, .hero-title, .hero-subtitle, .section-title');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        // Smetti di osservare dopo l'animazione
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Imposta stato iniziale e osserva
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        } else {
            // Fallback per browser vecchi: mostra tutto subito
            document.querySelectorAll('.info-card, .hero-title, .hero-subtitle, .section-title').forEach(el => {
                el.style.opacity = '1';
            });
        }

        // ============================================================
        // 5. HEADER STICKY - Cambia stile allo scroll
        // ============================================================
        const header = document.querySelector('.site-header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (header) {
                if (currentScrollY > 50) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.backdropFilter = 'blur(8px)';
                    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                } else {
                    header.style.background = 'var(--color-white)';
                    header.style.backdropFilter = 'none';
                    header.style.boxShadow = 'var(--shadow-sm)';
                }
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });

        // ============================================================
        // 6. SMOOTH SCROLL PER ANCORE INTERNE (già gestito da CSS)
        //    Ma aggiungiamo offset per header sticky
        // ============================================================
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        // Calcola offset per header sticky
                        const headerHeight = header ? header.offsetHeight : 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Aggiorna URL senza ricaricare (opzionale)
                        // history.pushState(null, null, targetId);
                    }
                }
            });
        });

        // ============================================================
        // 7. LAZY LOADING FALLBACK (per browser che non supportano loading="lazy")
        // ============================================================
        if (!('loading' in HTMLImageElement.prototype)) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src') || img.getAttribute('src');
                            if (src) {
                                img.src = src;
                            }
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    // Salva src originale in data-src
                    const src = img.getAttribute('src');
                    if (src) {
                        img.setAttribute('data-src', src);
                        // Non rimuovere src per evitare layout shift? Meglio mantenere placeholder
                    }
                    imageObserver.observe(img);
                });
            } else {
                // Fallback totale: carica tutto
                lazyImages.forEach(img => {
                    const src = img.getAttribute('data-src') || img.getAttribute('src');
                    if (src) img.src = src;
                });
            }
        }

        // ============================================================
        // 8. ANNO CORRENTE NEL COPYRIGHT (auto-aggiornante)
        // ============================================================
        const copyrightYear = document.querySelector('.copyright');
        if (copyrightYear) {
            const currentYear = new Date().getFullYear();
            copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2026', currentYear);
        }

        console.log('🍖 Antica Salumeria - Sito caricato e interattivo!');
        console.log('📱 Design by Francesco Garofalo - 2026');
        
    }); // Fine DOMContentLoaded

})(); // Fine IIFE