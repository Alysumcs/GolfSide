<script>
        lucide.createIcons();
        gsap.registerPlugin(ScrollTrigger);

        const navbar = document.getElementById('navbar');
        const navBtn = document.getElementById('nav-btn');

        document.addEventListener('DOMContentLoaded', () => {
            renderMapPins();
            filterTable();
            updateNavStyle();
            initGolfBallsBackground(); 
            initAnimationsForPage('home');
        });

        // Vrátená funkcionalita pre zmenu loga na tmavé/svetlé
        function updateNavStyle() {
            const currentView = document.querySelector('.view.active');
            if (!currentView || !navbar || !navBtn) return;

            const theme = currentView.getAttribute('data-nav-theme') || 'light';
            const isScrolled = window.scrollY > 50;
            const navLogoImg = document.getElementById('nav-logo-img');
            const navLinks = document.querySelectorAll('.nav-link');

            if (isScrolled) {
                // Sme zoscrollovaní - menu má biele (glass) pozadie
                navbar.classList.remove('nav-transparent');
                navbar.classList.add('nav-glass', 'py-0');
                
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-brand-dark', 'hover:text-brand-gold');
                });
                navBtn.classList.remove('border-white', 'text-white');
                navBtn.classList.add('border-brand-gold', 'text-brand-gold');
                
                // Zmena loga na tmavé
                if (navLogoImg) navLogoImg.src = 'assets/logo-dark.svg';

            } else {
                // Sme úplne hore
                navbar.classList.add('nav-transparent');
                navbar.classList.remove('nav-glass', 'py-0');

                if (theme === 'dark') {
                    // Tmavá podstránka (napr. Domov s tmavou fotkou)
                    navLinks.forEach(link => {
                        link.classList.replace('text-brand-dark', 'text-white');
                        link.classList.add('hover:text-brand-gold');
                    });
                    navBtn.classList.add('border-white', 'text-white');
                    navBtn.classList.remove('border-brand-gold', 'text-brand-gold');
                    
                    // Zmena loga späť na biele
                    if (navLogoImg) navLogoImg.src = 'assets/logo.svg';

                } else {
                    // Svetlá podstránka (napr. Mapa, Novinky...)
                    navLinks.forEach(link => {
                        link.classList.replace('text-white', 'text-brand-dark');
                        link.classList.add('hover:text-brand-gold');
                    });
                    navBtn.classList.remove('border-white', 'text-white');
                    navBtn.classList.add('border-brand-gold', 'text-brand-gold');
                    
                    // Zmena loga na tmavé, pretože pozadie je svetlé
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

        // PREPOČÍTANÉ SÚRADNICE - Podľa priloženej mapy
        const housesData = [
            // Typ C - Domy pri jazere (vnútorný rad)
            { id: 'C1', type: 'C', top: '74%', left: '20%', status: 'Voľný', rooms: 5, area: 145, plot: 750, price: 450000 },
            { id: 'C2', type: 'C', top: '66%', left: '19%', status: 'Predaný', rooms: 5, area: 145, plot: 680, price: 450000 },
            { id: 'C3', type: 'C', top: '59%', left: '18%', status: 'Voľný', rooms: 5, area: 145, plot: 710, price: 455000 },
            { id: 'C4', type: 'C', top: '51%', left: '18%', status: 'Rezervovaný', rooms: 5, area: 145, plot: 720, price: 460000 },
            { id: 'C5', type: 'C', top: '44%', left: '19%', status: 'Voľný', rooms: 5, area: 145, plot: 800, price: 470000 },
            { id: 'C6', type: 'C', top: '37%', left: '21%', status: 'Voľný', rooms: 5, area: 145, plot: 760, price: 465000 },
            { id: 'C7', type: 'C', top: '31%', left: '25%', status: 'Predaný', rooms: 5, area: 145, plot: 690, price: 450000 },
            { id: 'C8', type: 'C', top: '26%', left: '29%', status: 'Voľný', rooms: 5, area: 145, plot: 700, price: 455000 },
            { id: 'C9', type: 'C', top: '22%', left: '35%', status: 'Rezervovaný', rooms: 5, area: 145, plot: 740, price: 460000 },
            { id: 'C10', type: 'C', top: '20%', left: '41%', status: 'Voľný', rooms: 5, area: 145, plot: 780, price: 465000 },
            { id: 'C11', type: 'C', top: '20%', left: '47%', status: 'Voľný', rooms: 5, area: 145, plot: 710, price: 455000 },
            { id: 'C12', type: 'C', top: '21%', left: '53%', status: 'Predaný', rooms: 5, area: 145, plot: 650, price: 450000 },
            { id: 'C13', type: 'C', top: '23%', left: '58%', status: 'Voľný', rooms: 5, area: 145, plot: 670, price: 450000 },
            { id: 'C14', type: 'C', top: '27%', left: '63%', status: 'Voľný', rooms: 5, area: 145, plot: 720, price: 460000 },
            { id: 'C15', type: 'C', top: '32%', left: '67%', status: 'Rezervovaný', rooms: 5, area: 145, plot: 730, price: 460000 },
            { id: 'C16', type: 'C', top: '38%', left: '70%', status: 'Voľný', rooms: 5, area: 145, plot: 750, price: 465000 },
            { id: 'C17', type: 'C', top: '44%', left: '72%', status: 'Voľný', rooms: 5, area: 145, plot: 800, price: 475000 },
            { id: 'C18', type: 'C', top: '51%', left: '74%', status: 'Predaný', rooms: 5, area: 145, plot: 700, price: 450000 },
            { id: 'C19', type: 'C', top: '58%', left: '74%', status: 'Voľný', rooms: 5, area: 145, plot: 690, price: 450000 },
            { id: 'C20', type: 'C', top: '65%', left: '72%', status: 'Voľný', rooms: 5, area: 145, plot: 710, price: 455000 },
            { id: 'C21', type: 'C', top: '70%', left: '69%', status: 'Rezervovaný', rooms: 5, area: 145, plot: 730, price: 460000 },
            { id: 'C22', type: 'C', top: '74%', left: '65%', status: 'Voľný', rooms: 5, area: 145, plot: 750, price: 465000 },
            { id: 'C23', type: 'C', top: '77%', left: '60%', status: 'Voľný', rooms: 5, area: 145, plot: 780, price: 470000 },
            { id: 'C24', type: 'C', top: '79%', left: '54%', status: 'Predaný', rooms: 5, area: 145, plot: 660, price: 450000 },
            { id: 'C25', type: 'C', top: '80%', left: '48%', status: 'Voľný', rooms: 5, area: 145, plot: 680, price: 450000 },
            { id: 'C26', type: 'C', top: '80%', left: '41%', status: 'Voľný', rooms: 5, area: 145, plot: 720, price: 455000 },
            { id: 'C27', type: 'C', top: '79%', left: '35%', status: 'Rezervovaný', rooms: 5, area: 145, plot: 750, price: 460000 },
            { id: 'C28', type: 'C', top: '77%', left: '29%', status: 'Voľný', rooms: 5, area: 145, plot: 770, price: 465000 },
            { id: 'C29', type: 'C', top: '75%', left: '24%', status: 'Voľný', rooms: 5, area: 145, plot: 790, price: 470000 },
            { id: 'C30', type: 'C', top: '69%', left: '22%', status: 'Predaný', rooms: 5, area: 145, plot: 680, price: 450000 },
            { id: 'C31', type: 'C', top: '62%', left: '21%', status: 'Voľný', rooms: 5, area: 145, plot: 690, price: 450000 },
            { id: 'C32', type: 'C', top: '56%', left: '21%', status: 'Voľný', rooms: 5, area: 145, plot: 740, price: 460000 },

            // Typ AB - Dvojdomy (Vonkajší prstenec pozdĺž cesty)
            { id: 'A1', type: 'AB', top: '82%', left: '14%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B1', type: 'AB', top: '74%', left: '11%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 365, price: 325000 },
            { id: 'A2', type: 'AB', top: '66%', left: '9%', status: 'Voľný', rooms: 4, area: 112, plot: 380, price: 330000 },
            { id: 'B2', type: 'AB', top: '58%', left: '8%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'A3', type: 'AB', top: '50%', left: '8%', status: 'Predaný', rooms: 4, area: 112, plot: 390, price: 330000 },
            { id: 'B3', type: 'AB', top: '43%', left: '9%', status: 'Voľný', rooms: 4, area: 112, plot: 360, price: 320000 },
            { id: 'A4', type: 'AB', top: '35%', left: '12%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B4', type: 'AB', top: '28%', left: '16%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 370, price: 325000 },
            { id: 'A5', type: 'AB', top: '22%', left: '21%', status: 'Voľný', rooms: 4, area: 112, plot: 410, price: 340000 },
            { id: 'B5', type: 'AB', top: '17%', left: '27%', status: 'Voľný', rooms: 4, area: 112, plot: 400, price: 335000 },
            { id: 'A6', type: 'AB', top: '13%', left: '33%', status: 'Predaný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B6', type: 'AB', top: '11%', left: '40%', status: 'Voľný', rooms: 4, area: 112, plot: 360, price: 320000 },
            { id: 'A7', type: 'AB', top: '11%', left: '46%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B7', type: 'AB', top: '12%', left: '52%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 380, price: 330000 },
            { id: 'A8', type: 'AB', top: '14%', left: '58%', status: 'Voľný', rooms: 4, area: 112, plot: 390, price: 335000 },
            { id: 'B8', type: 'AB', top: '17%', left: '64%', status: 'Voľný', rooms: 4, area: 112, plot: 420, price: 345000 },
            { id: 'A9', type: 'AB', top: '22%', left: '69%', status: 'Predaný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B9', type: 'AB', top: '27%', left: '74%', status: 'Voľný', rooms: 4, area: 112, plot: 360, price: 320000 },
            { id: 'A10', type: 'AB', top: '33%', left: '78%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B10', type: 'AB', top: '39%', left: '81%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 370, price: 325000 },
            { id: 'A11', type: 'AB', top: '45%', left: '83%', status: 'Voľný', rooms: 4, area: 112, plot: 390, price: 330000 },
            { id: 'B11', type: 'AB', top: '52%', left: '85%', status: 'Voľný', rooms: 4, area: 112, plot: 400, price: 335000 },
            { id: 'A12', type: 'AB', top: '59%', left: '85%', status: 'Predaný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B12', type: 'AB', top: '66%', left: '83%', status: 'Voľný', rooms: 4, area: 112, plot: 360, price: 320000 },
            { id: 'A13', type: 'AB', top: '72%', left: '80%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B13', type: 'AB', top: '78%', left: '76%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 380, price: 330000 },
            { id: 'A14', type: 'AB', top: '83%', left: '70%', status: 'Voľný', rooms: 4, area: 112, plot: 390, price: 335000 },
            { id: 'B14', type: 'AB', top: '87%', left: '64%', status: 'Voľný', rooms: 4, area: 112, plot: 410, price: 340000 },
            { id: 'A15', type: 'AB', top: '89%', left: '57%', status: 'Predaný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B15', type: 'AB', top: '91%', left: '50%', status: 'Voľný', rooms: 4, area: 112, plot: 360, price: 320000 },
            { id: 'A16', type: 'AB', top: '90%', left: '43%', status: 'Voľný', rooms: 4, area: 112, plot: 350, price: 320000 },
            { id: 'B16', type: 'AB', top: '88%', left: '36%', status: 'Rezervovaný', rooms: 4, area: 112, plot: 370, price: 325000 }
        ];

        const formatPrice = (price, status) => {
            if (status === 'Predaný') return '<span class="text-gray-400 font-medium">Nedostupné</span>';
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

                html += `
                <div id="pin-${h.id}" class="map-pin z-10 transition-transform duration-300 hover:z-30" style="top: ${h.top}; left: ${h.left};" onclick="togglePopup('${h.id}', event)">
                    <div class="map-pin-inner ${innerColorClass}"></div>
                    
                    <div id="popup-${h.id}" class="pin-popup hidden absolute bottom-full mb-5 left-1/2 transform -translate-x-1/2 w-[280px] md:w-[320px] bg-[#B89B7B] text-white p-6 rounded-sm shadow-2xl z-50 cursor-default" onclick="event.stopPropagation()">
                        <h4 class="text-[20px] md:text-[24px] font-heading mb-6 flex items-center justify-between text-white">
                            <span>Dom ${h.rooms} izbový</span>
                            <span class="text-white/50 font-light mx-2">|</span>
                            <span class="font-bold">${h.id}</span>
                        </h4>
                        
                        <div class="space-y-4 text-sm md:text-[15px] tracking-wide font-sans mb-6">
                            <div class="flex justify-between items-center border-b border-white/20 pb-2">
                                <div class="flex items-center gap-3">
                                    <span class="text-white/90">Stav</span>
                                </div>
                                <div class="${statusTextColor} font-bold">${h.status}</div>
                            </div>
                            
                            <div class="flex justify-between items-center border-b border-white/20 pb-2">
                                <div class="flex items-center gap-3">
                                    <span class="text-white/90">Počet izieb</span>
                                </div>
                                <div class="text-white font-bold text-base">${h.rooms}</div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <span class="text-white/90">Celková plocha</span>
                                </div>
                                <div class="text-white font-bold text-base">${h.area} m²</div>
                            </div>
                        </div>

                        <button onclick="navigateTo('detail-${h.type.toLowerCase()}')" class="w-full py-3.5 bg-white text-brand-golf text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-brand-gray transition-colors rounded-sm shadow-md">
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
                rowsHtml = `<tr><td colspan="8" class="px-6 py-10 text-center text-gray-500 font-light">Nenašli sa žiadne domy pre tento filter.</td></tr>`;
            } else {
                filteredHouses.forEach(h => {
                    let statusBadge = '';
                    if (h.status === 'Voľný') statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-xs font-bold text-brand-gold bg-brand-gold/10 rounded-sm">Voľný</span>';
                    else if (h.status === 'Rezervovaný') statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-xs font-bold text-orange-500 bg-orange-400/10 rounded-sm">Rezervovaný</span>';
                    else statusBadge = '<span class="inline-flex items-center px-2.5 py-1 text-xs font-bold text-gray-500 bg-gray-200 rounded-sm">Predaný</span>';

                    let typeName = h.type === 'C' ? 'Dom pri jazere' : 'Dvojdom';

                    rowsHtml += `
                    <tr class="bg-white border-b border-gray-50 hover:bg-brand-gray/50 transition-colors group">
                        <td class="px-6 py-4 font-bold text-brand-dark">${h.id}</td>
                        <td class="px-6 py-4 text-gray-600 font-medium">${typeName}</td>
                        <td class="px-6 py-4 text-center font-medium text-brand-dark">${h.rooms}</td>
                        <td class="px-6 py-4 text-gray-600">${h.area} m²</td>
                        <td class="px-6 py-4 text-gray-600">${h.plot} m²</td>
                        <td class="px-6 py-4 font-heading font-bold text-lg">${formatPrice(h.price, h.status)}</td>
                        <td class="px-6 py-4">${statusBadge}</td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
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