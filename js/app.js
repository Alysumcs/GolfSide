!-- ================= JS SKRIPTY ================= -->
    <script>
        lucide.createIcons();
        gsap.registerPlugin(ScrollTrigger);

        const navbar = document.getElementById('navbar');
        const navBtn = document.getElementById('nav-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        document.addEventListener('DOMContentLoaded', () => {
            renderMapPins();
            filterTable();
            updateNavStyle();
            initGolfBallsBackground(); 
            initAnimationsForPage('home');
            initMobileMenu();
        });

        function initMobileMenu() {
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', openMobileMenu);
            }
            if (closeMenuBtn) {
                closeMenuBtn.addEventListener('click', closeMobileMenu);
            }
        }

        function openMobileMenu() {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; 
        }

        function closeMobileMenu() {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto'; 
        }

        // ================= LOGIKA PRE DETAIL ČLÁNKU (NOVINKY) =================
        const articleData = {
            'interior': {
                title: 'Nové návrhy interiérov od architektov',
                date: '20. November 2025',
                category: 'Dizajn',
                image: 'assets/interier.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                content: `
                    <p class="text-lg md:text-xl font-medium text-brand-dark mb-6">Naši dizajnéri pripravili tri rôzne štýly interiérového vyhotovenia. Tieto návrhy reflektujú najnovšie trendy v bývaní a prinášajú do domov GolfSide jedinečnú atmosféru spájajúcu luxus s prírodou.</p>
                    <p class="mb-6">Cieľom bolo vytvoriť priestory, ktoré dýchajú pokojom a poskytujú obyvateľom útočisko pred každodenným stresom. Pri návrhoch sa kládol dôraz na využitie lokálnych a udržateľných materiálov, najmä masívneho dubového dreva, gresových plôch s textúrou kameňa a jemných, tlmených farebných paliet.</p>
                    <p class="mb-6">Každý klient si môže vybrať z variantov, ktoré zdôrazňujú prírodné materiály, minimalistické línie alebo opulentnejšie prvky s mosadznými a zlatými detailmi. Vzorky materiálov si už čoskoro budete môcť pozrieť osobne v našom predajnom mieste.</p>
                    <p>Pre viac informácií a konzultáciu ohľadom možností prispôsobenia interiéru nás neváhajte kontaktovať.</p>
                `
            },
            'lake': {
                title: 'Kultivácia súkromného jazera',
                date: '3. Marec 2026',
                category: 'Areál',
                image: 'assets/lake_cultivation.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                content: `
                    <p class="text-lg md:text-xl font-medium text-brand-dark mb-6">Ukončili sme prvú fázu revitalizácie štrkoviska a modelácie spoločných pláží. Voda v jazere je pravidelne monitorovaná a dosahuje parametre vynikajúcej čistoty, ideálnej na kúpanie.</p>
                    <p class="mb-6">Naše snahy sa nesústredia len na vizuálnu stránku, ale najmä na ekosystém samotného jazera. Aktuálne prebieha výsadba špecifických vodných rastlín a spevňovanie brehov ekologickými metódami, aby sme zabezpečili stabilitu brehov a prirodzenú filtráciu vody.</p>
                    <ul class="list-disc pl-6 mb-6 space-y-2">
                        <li>Modelácia 2 komunitných pláží s jemným pieskom.</li>
                        <li>Vytvorenie plytčiny pre bezpečný vstup rodín s deťmi.</li>
                        <li>Začiatok prác na hlavnom vyhliadkovom móle.</li>
                    </ul>
                    <p>Robíme všetko pre to, aby sme obyvateľom projektu GolfSide zabezpečili dokonalé prostredie pre letný oddych, rybolov a vodné športy, to všetko v dokonalej symbióze s okolitou prírodou.</p>
                `
            },
            'construction': {
                title: 'Spustenie prvej etapy a predaja',
                date: '15. Október 2025',
                category: 'Stavba',
                image: 'assets/construction.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1541888081696-981f471e428e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                content: `
                    <p class="text-lg md:text-xl font-medium text-brand-dark mb-6">S radosťou oznamujeme, že sme oficiálne spustili predaj domov v exkluzívnom projekte GolfSide a zároveň sme začali s terénnymi úpravami prvej etapy výstavby.</p>
                    <p class="mb-6">Stavebné práce napredujú presne podľa stanoveného harmonogramu. Ťažká technika aktuálne realizuje výkopy pre inžinierske siete a prístupové komunikácie. Už teraz môžete priamo na stavenisku vidieť rysujúce sa kontúry prvých základových dosiek, najmä u domov Typu C, ktoré sú situované v prvej línii pri jazere.</p>
                    <p class="mb-6">Projekt vzbudil obrovský záujem, o čom svedčí aj aktuálny stav dostupnosti v našom cenníku. Ďakujeme všetkým klientom za prejavenú dôveru a tešíme sa na ďalšie míľniky, o ktorých vás budeme pravidelne informovať.</p>
                `
            }
        };

        function openArticle(id) {
            const article = articleData[id];
            if (!article) return;

            document.getElementById('article-title').innerHTML = article.title;
            document.getElementById('article-date').innerHTML = '<i data-lucide="calendar" class="w-4 h-4 mr-2 inline-block"></i>' + article.date;
            document.getElementById('article-category').textContent = article.category;
            
            const imgEl = document.getElementById('article-image');
            imgEl.src = article.image;
            imgEl.setAttribute('onerror', `this.src='${article.fallbackImage}'`);
            
            document.getElementById('article-content').innerHTML = article.content;
            
            lucide.createIcons();
            navigateTo('article');
        }

        // ================= LIGHTBOX FUNKCIONALITA =================
        function openLightbox(src) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            
            lightboxImg.src = src;
            lightbox.classList.remove('hidden');
            
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            
            setTimeout(() => {
                lightbox.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        }

        function navigateFromMobile(pageId) {
            closeMobileMenu();
            setTimeout(() => {
                navigateTo(pageId);
            }, 300); 
        }

        function updateNavStyle() {
            const currentView = document.querySelector('.view.active');
            if (!currentView || !navbar || !navBtn) return;

            const theme = currentView.getAttribute('data-nav-theme') || 'light';
            const isScrolled = window.scrollY > 50;
            const navLogoImg = document.getElementById('nav-logo-img');
            const navLinks = document.querySelectorAll('.nav-link');

            if (isScrolled) {
                navbar.classList.remove('nav-transparent');
                navbar.classList.add('nav-glass', 'py-0');
                
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-brand-dark', 'hover:text-brand-gold');
                });
                navBtn.classList.remove('border-white', 'text-white');
                navBtn.classList.add('border-brand-gold', 'text-brand-gold');
                
                if (navLogoImg) navLogoImg.src = 'assets/logo-dark.svg';

            } else {
                navbar.classList.add('nav-transparent');
                navbar.classList.remove('nav-glass', 'py-0');

                if (theme === 'dark') {
                    navLinks.forEach(link => {
                        link.classList.replace('text-brand-dark', 'text-white');
                        link.classList.add('hover:text-brand-gold');
                    });
                    navBtn.classList.add('border-white', 'text-white');
                    navBtn.classList.remove('border-brand-gold', 'text-brand-gold');
                    
                    if (navLogoImg) navLogoImg.src = 'assets/logo.svg';

                } else {
                    navLinks.forEach(link => {
                        link.classList.replace('text-white', 'text-brand-dark');
                        link.classList.add('hover:text-brand-gold');
                    });
                    navBtn.classList.remove('border-white', 'text-white');
                    navBtn.classList.add('border-brand-gold', 'text-brand-gold');
                    
                    if (navLogoImg) navLogoImg.src = 'assets/logo-dark.svg';
                }
            }
        }

        window.addEventListener('scroll', updateNavStyle);

        function navigateTo(pageId) {
            document.body.style.overflow = 'hidden';
            
            const curtain = document.getElementById('transition-curtain');
            const transText = document.getElementById('transition-text');
            const views = document.querySelectorAll('.view');
            const targetView = document.getElementById(`view-${pageId}`);
            
            if (!targetView || !curtain || !transText) return;

            const tl = gsap.timeline();

            tl.to(curtain, { y: '0%', duration: 0.6, ease: 'power4.inOut' })
              .to(transText, { opacity: 1, duration: 0.2 }, "-=0.2")
              .call(() => {
                  views.forEach(v => { v.classList.remove('active'); v.classList.add('hidden'); });
                  targetView.classList.remove('hidden'); targetView.classList.add('active');
                  window.scrollTo(0,0);
                  
                  document.querySelectorAll('.pin-popup').forEach(p => p.classList.add('hidden'));
                  updateNavStyle(); 
              })
              .to(transText, { opacity: 0, duration: 0.2, delay: 0.2 })
              .to(curtain, { y: '-100%', duration: 0.6, ease: 'power4.inOut' })
              .call(() => {
                  gsap.set(curtain, {y: '100%'}); 
                  document.body.style.overflow = 'auto';
                  initAnimationsForPage(pageId);
                  
                  if(pageId === 'map') filterTable();
              });
        }

        // ================= DÁTA DOMOV =================
        const housesData = [
            // Typ C (30 domov)
            { id: 'C1', type: 'C', left: 40.1, top: 20.2, status: 'Predaný', rooms: 4, area: 133.7, plot: 696, price: 651400 },
            { id: 'C2', type: 'C', left: 44.1, top: 23.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 568, price: 600200 },
            { id: 'C3', type: 'C', left: 48.1, top: 23.6, status: 'Voľný', rooms: 4, area: 133.7, plot: 557, price: 484400 },
            { id: 'C4', type: 'C', left: 54.4, top: 23.6, status: 'Voľný', rooms: 4, area: 133.7, plot: 477, price: 468400 },
            { id: 'C5', type: 'C', left: 58.2, top: 24.1, status: 'Voľný', rooms: 4, area: 133.7, plot: 450, price: 463000 },
            { id: 'C6', type: 'C', left: 61.7, top: 27.2, status: 'Voľný', rooms: 4, area: 133.7, plot: 436, price: 460200 },
            { id: 'C7', type: 'C', left: 64.1, top: 32.0, status: 'Voľný', rooms: 4, area: 133.7, plot: 471, price: 467200 },
            { id: 'C8', type: 'C', left: 66.3, top: 38.0, status: 'Voľný', rooms: 4, area: 133.7, plot: 525, price: 478000 },
            { id: 'C9', type: 'C', left: 70.7, top: 47.5, status: 'Voľný', rooms: 4, area: 133.7, plot: 554, price: 483800 },
            { id: 'C10', type: 'C', left: 74.2, top: 52.7, status: 'Voľný', rooms: 4, area: 133.7, plot: 571, price: 487200 },
            { id: 'C11', type: 'C', left: 46.2, top: 33.0, status: 'Predaný', rooms: 4, area: 133.7, plot: 855, price: 715000 },
            { id: 'C12', type: 'C', left: 50.6, top: 34.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 523, price: 582200 },
            { id: 'C13', type: 'C', left: 53.9, top: 34.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 487, price: 567800 },
            { id: 'C14', type: 'C', left: 58.3, top: 34.6, status: 'Predaný', rooms: 4, area: 133.7, plot: 772, price: 681800 },
            { id: 'C15', type: 'C', left: 60.5, top: 41.8, status: 'Predaný', rooms: 4, area: 133.7, plot: 648, price: 632200 },
            { id: 'C16', type: 'C', left: 62.7, top: 49.1, status: 'Predaný', rooms: 4, area: 133.7, plot: 445, price: 551000 },
            { id: 'C17', type: 'C', left: 70.1, top: 60.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 409, price: 536600 },
            { id: 'C18', type: 'C', left: 74.4, top: 79.1, status: 'Predaný', rooms: 4, area: 133.7, plot: 534, price: 586600 },
            { id: 'C19', type: 'C', left: 69.7, top: 80.8, status: 'Predaný', rooms: 4, area: 133.7, plot: 504, price: 574600 },
            { id: 'C20', type: 'C', left: 64.5, top: 81.8, status: 'Predaný', rooms: 4, area: 133.7, plot: 401, price: 533400 },
            { id: 'C21', type: 'C', left: 59.2, top: 81.6, status: 'Predaný', rooms: 4, area: 133.7, plot: 445, price: 551000 },
            { id: 'C22', type: 'C', left: 37.8, top: 78.6, status: 'Predaný', rooms: 4, area: 133.7, plot: 410, price: 537000 },
            { id: 'C23', type: 'C', left: 33.4, top: 81.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 458, price: 556200 },
            { id: 'C24', type: 'C', left: 28.4, top: 81.7, status: 'Predaný', rooms: 4, area: 133.7, plot: 482, price: 565800 },
            { id: 'C25', type: 'C', left: 25.1, top: 78.0, status: 'Predaný', rooms: 4, area: 133.7, plot: 455, price: 555000 },
            { id: 'C26', type: 'C', left: 23.2, top: 71.3, status: 'Predaný', rooms: 4, area: 133.7, plot: 490, price: 569000 },
            { id: 'C27', type: 'C', left: 44.5, top: 87.0, status: 'Voľný', rooms: 4, area: 133.7, plot: 630, price: 499000 },
            { id: 'C28', type: 'C', left: 40.2, top: 88.4, status: 'Voľný', rooms: 4, area: 133.7, plot: 380, price: 449000 },
            { id: 'C29', type: 'C', left: 35.4, top: 91.8, status: 'Voľný', rooms: 4, area: 133.7, plot: 449, price: 462800 },
            { id: 'C30', type: 'C', left: 29.8, top: 93.4, status: 'Voľný', rooms: 4, area: 133.7, plot: 592, price: 491400 },

            // Typ AB (38 domov / 19 párov)
            { id: 'A1', type: 'AB', left: 46.7, top: 14.8, status: 'Voľný', rooms: 3, area: 103.8, plot: 443, price: 336700 },
            { id: 'B1', type: 'AB', left: 48.0, top: 14.2, status: 'Voľný', rooms: 3, area: 98.5, plot: 443, price: 336700 },
            { id: 'A2', type: 'AB', left: 51.2, top: 14.7, status: 'Voľný', rooms: 3, area: 103.8, plot: 407, price: 329500 },
            { id: 'B2', type: 'AB', left: 52.5, top: 14.1, status: 'Voľný', rooms: 3, area: 98.5, plot: 407, price: 329500 },
            { id: 'A3', type: 'AB', left: 55.6, top: 14.5, status: 'Voľný', rooms: 3, area: 103.8, plot: 449, price: 337900 },
            { id: 'B3', type: 'AB', left: 56.9, top: 13.9, status: 'Voľný', rooms: 3, area: 98.5, plot: 449, price: 337900 },
            { id: 'A4', type: 'AB', left: 60.3, top: 15.2, status: 'Voľný', rooms: 3, area: 103.8, plot: 549, price: 357900 },
            { id: 'B4', type: 'AB', left: 61.8, top: 15.7, status: 'Voľný', rooms: 3, area: 98.5, plot: 549, price: 357900 },
            { id: 'A5', type: 'AB', left: 64.9, top: 18.8, status: 'Voľný', rooms: 3, area: 103.8, plot: 373, price: 322700 },
            { id: 'B5', type: 'AB', left: 66.2, top: 20.1, status: 'Voľný', rooms: 3, area: 98.5, plot: 373, price: 322700 },
            { id: 'A6', type: 'AB', left: 68.4, top: 24.8, status: 'Voľný', rooms: 3, area: 103.8, plot: 259, price: 299900 },
            { id: 'B6', type: 'AB', left: 69.5, top: 26.3, status: 'Voľný', rooms: 3, area: 98.5, plot: 259, price: 299900 },
            { id: 'A7', type: 'AB', left: 71.0, top: 31.0, status: 'Voľný', rooms: 3, area: 103.8, plot: 301, price: 308300 },
            { id: 'B7', type: 'AB', left: 71.9, top: 33.0, status: 'Voľný', rooms: 3, area: 98.5, plot: 301, price: 308300 },
            { id: 'A8', type: 'AB', left: 75.1, top: 40.1, status: 'Voľný', rooms: 3, area: 103.8, plot: 336, price: 315300 },
            { id: 'B8', type: 'AB', left: 76.3, top: 41.8, status: 'Voľný', rooms: 3, area: 98.5, plot: 336, price: 315300 },
            { id: 'A9', type: 'AB', left: 79.0, top: 46.3, status: 'Voľný', rooms: 3, area: 103.8, plot: 337, price: 315500 },
            { id: 'B9', type: 'AB', left: 80.3, top: 47.7, status: 'Voľný', rooms: 3, area: 98.5, plot: 337, price: 315500 },
            { id: 'A10', type: 'AB', left: 83.7, top: 53.9, status: 'Voľný', rooms: 3, area: 103.8, plot: 349, price: 317900 },
            { id: 'B10', type: 'AB', left: 84.7, top: 55.9, status: 'Voľný', rooms: 3, area: 98.5, plot: 349, price: 317900 },
            { id: 'A11', type: 'AB', left: 87.1, top: 64.6, status: 'Voľný', rooms: 3, area: 103.8, plot: 544, price: 356900 },
            { id: 'B11', type: 'AB', left: 87.5, top: 67.2, status: 'Voľný', rooms: 3, area: 98.5, plot: 544, price: 356900 },
            { id: 'A12', type: 'AB', left: 86.9, top: 74.0, status: 'Voľný', rooms: 3, area: 103.8, plot: 584, price: 364900 },
            { id: 'B12', type: 'AB', left: 86.7, top: 76.7, status: 'Voľný', rooms: 3, area: 98.5, plot: 584, price: 364900 },
            { id: 'A13', type: 'AB', left: 65.0, top: 55.8, status: 'Predaný', rooms: 3, area: 103.8, plot: 294, price: 365700 },
            { id: 'B13', type: 'AB', left: 66.3, top: 57.2, status: 'Predaný', rooms: 3, area: 98.5, plot: 294, price: 365700 },
            { id: 'A14', type: 'AB', left: 50.3, top: 76.3, status: 'Predaný', rooms: 3, area: 103.8, plot: 260, price: 352100 },
            { id: 'B14', type: 'AB', left: 48.7, top: 76.1, status: 'Predaný', rooms: 3, area: 98.5, plot: 260, price: 352100 },
            { id: 'A15', type: 'AB', left: 55.2, top: 78.7, status: 'Voľný', rooms: 3, area: 103.8, plot: 278, price: 359300 },
            { id: 'B15', type: 'AB', left: 53.7, top: 78.7, status: 'Voľný', rooms: 3, area: 98.5, plot: 278, price: 359300 },
            { id: 'A16', type: 'AB', left: 44.9, top: 75.4, status: 'Predaný', rooms: 3, area: 103.8, plot: 237, price: 342900 },
            { id: 'B16', type: 'AB', left: 43.5, top: 76.3, status: 'Predaný', rooms: 3, area: 98.5, plot: 237, price: 342900 },
            { id: 'A17', type: 'AB', left: 22.9, top: 65.3, status: 'Voľný', rooms: 3, area: 103.8, plot: 264, price: 353700 },
            { id: 'B17', type: 'AB', left: 22.7, top: 62.6, status: 'Voľný', rooms: 3, area: 98.5, plot: 264, price: 353700 },
            { id: 'A18', type: 'AB', left: 23.8, top: 57.2, status: 'Predaný', rooms: 3, area: 103.8, plot: 362, price: 392900 },
            { id: 'B18', type: 'AB', left: 23.6, top: 54.8, status: 'Predaný', rooms: 3, area: 98.5, plot: 362, price: 392900 },
            { id: 'A19', type: 'AB', left: 23.6, top: 48.4, status: 'Predaný', rooms: 3, area: 103.8, plot: 314, price: 373700 },
            { id: 'B19', type: 'AB', left: 23.6, top: 46.0, status: 'Predaný', rooms: 3, area: 98.5, plot: 314, price: 373700 }
        ];

        const formatPrice = (price, status) => {
            return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
        };

        function renderMapPins() {
            const container = document.getElementById('map-pins-container');
            if (!container) return;

            let html = '';

            housesData.forEach(h => {
                let innerColorClass = '';
                let statusTextColor = 'text-white';
                
                if (h.status === 'Predaný') {
                    innerColorClass = '!bg-gray-400';
                    statusTextColor = 'text-white/60';
                } else if (h.status === 'Rezervovaný') {
                    innerColorClass = '!bg-orange-400';
                    statusTextColor = 'text-white';
                }

                // DYNAMICKÁ LOGIKA PRE POPUP
                // Zabezpečíme, že pri okrajoch okno nevbehne mimo mapu
                let xPos = "-translate-x-1/2 left-1/2"; 
                let arrowPos = "left-1/2 -translate-x-1/2";
                
                // Zvýšená ochranná zóna pre ľavý a pravý okraj
                if (h.left < 30) {
                    xPos = "left-0 -translate-x-4"; 
                    arrowPos = "left-4";
                } else if (h.left > 70) {
                    xPos = "right-0 translate-x-4"; 
                    arrowPos = "right-4";
                }

                let yPos = "bottom-full mb-3 md:mb-4"; 
                let arrowY = "top-full border-t-[#B89B7B] border-l-transparent border-r-transparent border-b-transparent";

                // ÚPRAVA PRE ZAMEDZENIE ODREZANIA: 
                // Akýkoľvek dom v hornej polovici mapy (< 50%) otvorí popup automaticky smerom nadol!
                if (h.top < 50) {
                    yPos = "top-full mt-3 md:mt-4"; 
                    arrowY = "bottom-full border-b-[#B89B7B] border-l-transparent border-r-transparent border-t-transparent";
                }

                html += `
                <div id="pin-${h.id}" class="map-pin z-10 transition-transform duration-300 hover:z-30" style="top: ${h.top}%; left: ${h.left}%;" onclick="togglePopup('${h.id}', event)">
                    <div class="map-pin-inner ${innerColorClass}"></div>
                    
                    <div id="popup-${h.id}" class="pin-popup hidden absolute ${yPos} ${xPos} w-[220px] md:w-[320px] bg-[#B89B7B] text-white p-4 md:p-6 rounded-sm shadow-2xl z-50 cursor-default" onclick="event.stopPropagation()">
                        <div class="absolute ${arrowY} ${arrowPos} border-[8px] md:border-[10px] w-0 h-0"></div>
                        
                        <h4 class="text-[16px] md:text-[24px] font-heading mb-3 md:mb-6 flex items-center justify-between text-white">
                            <span>Dom ${h.rooms} izb.</span>
                            <span class="text-white/50 font-light mx-1 md:mx-2">|</span>
                            <span class="font-bold">${h.id}</span>
                        </h4>
                        
                        <div class="space-y-2 md:space-y-4 text-xs md:text-[15px] tracking-wide font-sans mb-4 md:mb-6">
                            <div class="flex justify-between items-center border-b border-white/20 pb-1.5 md:pb-2">
                                <div class="flex items-center gap-2 md:gap-3">
                                    <span class="text-white/90">Stav</span>
                                </div>
                                <div class="${statusTextColor} font-bold">${h.status}</div>
                            </div>
                            
                            <div class="flex justify-between items-center border-b border-white/20 pb-1.5 md:pb-2">
                                <div class="flex items-center gap-2 md:gap-3">
                                    <span class="text-white/90">Počet izieb</span>
                                </div>
                                <div class="text-white font-bold text-sm md:text-base">${h.rooms}</div>
                            </div>
                            
                            <div class="flex justify-between items-center border-b border-white/20 pb-1.5 md:pb-2">
                                <div class="flex items-center gap-2 md:gap-3">
                                    <span class="text-white/90">Celková plocha</span>
                                </div>
                                <div class="text-white font-bold text-sm md:text-base">${h.area} m²</div>
                            </div>

                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2 md:gap-3">
                                    <span class="text-white/90">Pozemok</span>
                                </div>
                                <div class="text-white font-bold text-sm md:text-base">${h.plot} m²</div>
                            </div>
                        </div>

                        <button onclick="navigateTo('detail-${h.type.toLowerCase()}')" class="w-full py-2.5 md:py-3.5 bg-white text-brand-golf text-[9px] md:text-xs uppercase tracking-widest font-bold hover:bg-brand-gray transition-colors rounded-sm shadow-md">
                            Zobraziť detail domu
                        </button>
                    </div>
                </div>`;
            });

            container.innerHTML = html;
        }

        function togglePopup(id, event) {
            if(event) event.stopPropagation();
            
            document.querySelectorAll('.pin-popup').forEach(p => {
                if (p.id !== 'popup-' + id) p.classList.add('hidden');
            });
            document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('z-40'));
            
            const popup = document.getElementById('popup-' + id);
            const pin = document.getElementById('pin-' + id);
            if (popup && pin) {
                popup.classList.toggle('hidden');
                pin.classList.add('z-40');
            }
        }

        function filterTable() {
            const filterElement = document.getElementById('statusFilter');
            const filterValue = filterElement ? filterElement.value : 'all';
            const tbody = document.getElementById('houses-table-body');
            if (!tbody) return;
            
            let rowsHtml = '';

            const filteredHouses = filterValue === 'all' 
                ? housesData 
                : housesData.filter(h => h.status === filterValue);

            if(filteredHouses.length === 0) {
                rowsHtml = `<tr><td colspan="9" class="px-6 py-10 text-center text-gray-500 font-light">Nenašli sa žiadne domy pre tento filter.</td></tr>`;
            } else {
                filteredHouses.forEach(h => {
                    let statusBadge = '';
                    if (h.status === 'Voľný') statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-[10px] md:text-xs font-bold text-red-600 bg-red-600/10 rounded-sm">Voľný</span>';
                    else if (h.status === 'Rezervovaný') statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-[10px] md:text-xs font-bold text-orange-500 bg-orange-400/10 rounded-sm">Rezervovaný</span>';
                    else statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-[10px] md:text-xs font-bold text-gray-500 bg-gray-200 rounded-sm">Predaný</span>';

                    // Určenie správneho názvu typu v tabuľke
                    let typeName = '';
                    if (h.type === 'C') {
                        typeName = 'Dom typ C';
                    } else if (h.type === 'AB') {
                        if (h.id.startsWith('A')) {
                            typeName = 'Dom typ A';
                        } else if (h.id.startsWith('B')) {
                            typeName = 'Dom typ B';
                        } else {
                            typeName = 'Dom typ A/B';
                        }
                    }

                    let priceDisplay = formatPrice(h.price, h.status);
                    
                    // Jemné odlíšenie predaných cien
                    if(h.status === 'Predaný') {
                        priceDisplay = `<span class="text-gray-400 line-through decoration-1 opacity-70">${priceDisplay}</span>`;
                    }

                    rowsHtml += `
                    <tr class="bg-white border-b border-gray-50 hover:bg-brand-gray/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-brand-dark whitespace-nowrap">${h.id}</td>
                        <td class="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">${typeName}</td>
                        <td class="px-6 py-4 text-center font-medium text-brand-dark whitespace-nowrap">${h.rooms}</td>
                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${h.area} m²</td>
                        <td class="px-6 py-4 text-gray-600 whitespace-nowrap">${h.plot} m²</td>
                        <td class="px-6 py-4 font-heading font-bold text-base md:text-lg whitespace-nowrap">${priceDisplay}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                        <td class="px-6 py-4 text-right whitespace-nowrap">
                            <div class="flex items-center justify-end gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <button onclick="highlightHouseOnMap('${h.id}')" class="text-brand-dark hover:text-brand-gold p-2" title="Ukázať na mape">
                                    <i data-lucide="map-pin" class="w-5 h-5"></i>
                                </button>
                                <button onclick="navigateTo('detail-${h.type.toLowerCase()}')" class="text-white bg-brand-dark hover:bg-brand-gold px-4 py-2 text-[10px] uppercase font-bold rounded-sm transition-colors">
                                    Detail
                                </button>
                            </div>
                        </td>
                    </tr>`;
                });
            }

            tbody.innerHTML = rowsHtml;
            lucide.createIcons();
        }

        function highlightHouseOnMap(id) {
            const mapSection = document.getElementById('map-scroll-target');
            if (mapSection) {
                window.scrollTo({
                    top: mapSection.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
            togglePopup(id, null);

            const pinInner = document.querySelector(`#pin-${id} .map-pin-inner`);
            if (pinInner) {
                document.querySelectorAll('.map-pin-inner').forEach(el => el.classList.remove('pin-highlight'));
                pinInner.classList.add('pin-highlight');
                
                setTimeout(() => {
                    pinInner.classList.remove('pin-highlight');
                }, 5000);
            }
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.map-pin')) {
                document.querySelectorAll('.pin-popup').forEach(p => p.classList.add('hidden'));
                document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('z-40'));
            }
        });

        function initGolfBallsBackground() {
            const layer = document.getElementById('golf-balls-layer');
            if(!layer) return;
            
            const ballHTML = `<img src="assets/golf-ball.svg" alt="golf lopticka" class="w-full h-full opacity-10" onerror="this.style.display='none'" />`;

            for(let i=0; i<6; i++) {
                const div = document.createElement('div');
                div.innerHTML = ballHTML;
                div.className = "absolute text-brand-golf anim-ball";
                
                const size = (Math.random() * 100 + 37.5); 
                div.style.width = size + 'px';
                div.style.height = size + 'px';
                div.style.left = (Math.random() * 100) + '%';
                div.style.top = (Math.random() * 100) + '%';
                
                layer.appendChild(div);

                gsap.to(div, {
                    x: "random(-200, 200)",
                    y: "random(-200, 200)",
                    rotation: 360,
                    duration: "random(20, 40)",
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                });
            }
        }

        function initAnimationsForPage(pageId) {
            ScrollTrigger.getAll().forEach(st => st.kill()); 

            if (pageId === 'home') {
                gsap.fromTo('.gsap-hero-title', 
                    { y: '100%' },
                    { y: '0%', duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 }
                );

                gsap.to('.hero-img', {
                    yPercent: 15, ease: "none",
                    scrollTrigger: { trigger: '#view-home section', start: "top top", end: "bottom top", scrub: true }
                });
            }

            if (pageId === 'map') {
                gsap.fromTo('.map-pin',
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.02, ease: "back.out(1.5)", delay: 0.3 }
                );
            }

            const textBlocks = document.querySelectorAll(`#view-${pageId} .gsap-stagger-text > *`);
            if(textBlocks.length > 0) {
                gsap.fromTo(textBlocks, 
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", 
                      scrollTrigger: { trigger: textBlocks[0].parentElement, start: "top 80%" } }
                );
            }

            const images = document.querySelectorAll(`#view-${pageId} .gsap-img-reveal`);
            images.forEach(img => {
                gsap.fromTo(img,
                    { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scale: 1.1 },
                    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, duration: 1.5, ease: "power4.inOut",
                      scrollTrigger: { trigger: img.parentElement, start: "top 75%" } }
                );
            });

            const fadeUps = document.querySelectorAll(`#view-${pageId} .gsap-fade-up`);
            fadeUps.forEach(elem => {
                gsap.fromTo(elem,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out",
                      scrollTrigger: { trigger: elem, start: "top 85%" } }
                );
            });
        }
    </script>
