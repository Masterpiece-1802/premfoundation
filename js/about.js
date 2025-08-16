// Initialize AOS
AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

// Swiper for press items
const pressSwiper = new Swiper('.pressSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 2000, disableOnInteraction: false },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 576: { slidesPerView: 2 }, 992: { slidesPerView: 4 } }
});

// --- Press items (simulate / plug in server later)
document.addEventListener('DOMContentLoaded', function () {
    const pressItems = [
        { filename: '1.jpeg', type: 'image' },
        { filename: '41.jpeg', type: 'image' },
        { filename: '20.jpeg', type: 'image' },
        { filename: '42.jpeg', type: 'image' },
        { filename: '37.jpeg', type: 'image' },
        { filename: '13.jpg', type: 'image' },
        { filename: '43.jpeg', type: 'image' },
        { filename: '44.jpeg', type: 'image' },
        { filename: '21.jpeg', type: 'image' },
        { filename: '22.jpeg', type: 'image' },
        { filename: '23.jpeg', type: 'image' },
        { filename: '24.jpeg', type: 'image' },
        { filename: '25.jpeg', type: 'image' },
        { filename: '26.jpeg', type: 'image' },
        { filename: '27.jpeg', type: 'image' },
        { filename: '28.jpeg', type: 'image' },
        { filename: '29.jpeg', type: 'image' },
        { filename: '3.jpg', type: 'image' },
        { filename: '4.jpg', type: 'image' },
        { filename: '5.jpg', type: 'image' },
        { filename: '6.jpg', type: 'image' },
        { filename: '7.jpg', type: 'image' },
        { filename: '30.jpeg', type: 'image' },
        { filename: '31.jpeg', type: 'image' },
        { filename: '32.jpeg', type: 'image' },
        { filename: '33.jpeg', type: 'image' },
        { filename: '34.jpeg', type: 'image' },
        { filename: '35.jpeg', type: 'image' },
        { filename: '36.jpeg', type: 'image' },
        { filename: '38.jpeg', type: 'image' },
        { filename: '39.jpeg', type: 'image' },
        { filename: '40.jpeg', type: 'image' },
        { filename: '2.jpg', type: 'image' },
        { filename: '8.jpg', type: 'image' },
        { filename: '9.jpg', type: 'image' },
        { filename: '10.jpg', type: 'image' },
        { filename: '11.jpg', type: 'image' },
        { filename: '12.jpg', type: 'image' },
        { filename: '14.jpeg', type: 'image' },
        { filename: '15.jpeg', type: 'image' },
        { filename: '16.jpeg', type: 'image' },
        { filename: '17.jpeg', type: 'image' },
        { filename: '18.jpeg', type: 'image' },
        { filename: '19.jpeg', type: 'image' },
        { filename: '45.jpeg', type: 'image' }
    ];

    function loadPressItems() {
        const swiperWrapper = document.getElementById('pressSwiperWrapper');
        const pressGrid = document.getElementById('pressGrid');

        pressItems.forEach((item) => {
            // Swiper slide
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="press-slide">
                    ${item.type === 'video'
                        ? `<video src="images/press/${item.filename}" loop muted playsinline></video>`
                        : `<img src="images/press/${item.filename}" alt="Press coverage">`
                    }
                </div>`;
            swiperWrapper.appendChild(slide);

            // Grid item
            const gridItem = document.createElement('div');
            gridItem.className = 'press-grid-item';
            gridItem.innerHTML =
                item.type === 'video'
                    ? `<video src="images/press/${item.filename}" loop muted playsinline></video>`
                    : `<img src="images/press/${item.filename}" alt="Press coverage">`;

            gridItem.addEventListener('click', () => openLightbox(item));
            pressGrid.appendChild(gridItem);
        });

        pressSwiper.update();
    }

    function openLightbox(item) {
        const lightboxContent = document.getElementById('lightboxContent');
        lightboxContent.innerHTML =
            item.type === 'video'
                ? `<video src="images/press/${item.filename}" controls autoplay loop playsinline></video>`
                : `<img src="images/press/${item.filename}" alt="Press coverage">`;

        const downloadBtn = document.getElementById('downloadMedia');
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = `images/press/${item.filename}`;
            link.download = item.filename;
            link.click();
        };

        new bootstrap.Modal(document.getElementById('lightboxModal')).show();
    }

    // Load items now
    loadPressItems();

    // --- NUCLEAR: Force-open the View All modal on click as a JS fallback ---
    const viewAllBtn = document.getElementById('viewAllPress');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            // If data-bs-toggle failed for any reason, do it programmatically:
            const modalEl = document.getElementById('viewAllModal');
            if (modalEl) {
                try {
                    const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
                    instance.show();
                } catch (err) {
                    console.error('Failed to open modal via JS fallback:', err);
                }
            }
        }, { passive: true });
    }

    // --- PDF preview + View Archive handler (from your page) ---
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('data-pdf');
            document.getElementById('pdfPreview').src = pdfUrl + '#view=fitH';
            document.getElementById('pdfDownloadBtn').href = pdfUrl;
            new bootstrap.Modal(document.getElementById('pdfModal')).show();
        });
    });

    const moreBtn = document.getElementById('loadMoreReports');
    if (moreBtn) {
        moreBtn.addEventListener('click', function () {
            const moreReportsDiv = document.getElementById('moreReports');
            const btn = this;

            if (moreReportsDiv.classList.contains('d-none')) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Loading.';
                btn.disabled = true;

                setTimeout(() => {
                    moreReportsDiv.innerHTML = `
                        <!-- 2019-20 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div class="card h-100 report-card">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="bg-blue-100 rounded p-3 me-3">
                                            <i class="fas fa-file-pdf fa-2x text-blue-800"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">2019-20 Report</h3>
                                            <small class="text-gold-light">PDF • 3.5 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="reports/annual-report-2020.pdf" class="btn btn-sm btn-outline-light" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-primary preview-btn" data-pdf="reports/annual-report-2020.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2018-19 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div class="card h-100 report-card">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="bg-blue-100 rounded p-3 me-3">
                                            <i class="fas fa-file-pdf fa-2x text-blue-800"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">2018-19 Report</h3>
                                            <small class="text-gold-light">PDF • 3.1 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="reports/annual-report-2019.pdf" class="btn btn-sm btn-outline-light" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-primary preview-btn" data-pdf="reports/annual-report-2019.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2017-18 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div class="card h-100 report-card">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="bg-blue-100 rounded p-3 me-3">
                                            <i class="fas fa-file-pdf fa-2x text-blue-800"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">2017-18 Report</h3>
                                            <small class="text-gold-light">PDF • 2.9 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="reports/annual-report-2018.pdf" class="btn btn-sm btn-outline-light" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-primary preview-btn" data-pdf="reports/annual-report-2018.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    moreReportsDiv.classList.remove('d-none');
                    btn.innerHTML = '<i class="fas fa-chevron-up me-2"></i> Show Less';
                    btn.disabled = false;

                    AOS.refresh();

                    // Wire up preview buttons that were just injected
                    moreReportsDiv.querySelectorAll('.preview-btn').forEach(newBtn => {
                        newBtn.addEventListener('click', function () {
                            const pdfUrl = this.getAttribute('data-pdf');
                            document.getElementById('pdfPreview').src = pdfUrl + '#view=fitH';
                            document.getElementById('pdfDownloadBtn').href = pdfUrl;
                            new bootstrap.Modal(document.getElementById('pdfModal')).show();
                        });
                    });
                }, 800);
            } else {
                moreReportsDiv.classList.add('d-none');
                btn.innerHTML = '<i class="fas fa-history me-2"></i> View Archive (2015-2020)';
            }
        });
    }

    // Timeline card reveal animation (preserved)
    const timelineCards = document.querySelectorAll('.timeline-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineCards.forEach(card => obs.observe(card));

    // Smooth anchor scroll (preserved)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Particles for Documents Section
function initDocumentParticles() {
    const container = document.getElementById('documentsParticles');
    if (!container) return;
    
    const particleCount = 30;
    const colors = ['rgba(212, 175, 55, 0.5)', 'rgba(244, 229, 194, 0.3)', 'rgba(255, 255, 255, 0.2)'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'document-particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 15 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            position: absolute;
            bottom: -10px;
            left: ${posX}%;
            animation: floatParticle ${duration}s linear ${delay}s infinite;
            z-index: 0;
        `;
        
        container.appendChild(particle);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDocumentParticles();
    
    // Load More Documents functionality (updated)
    const moreDocsBtn = document.getElementById('loadMoreDocuments');
    if (moreDocsBtn) {
        moreDocsBtn.addEventListener('click', function () {
            const moreDocsDiv = document.getElementById('moreDocuments');
            const btn = this;

            if (moreDocsDiv.classList.contains('d-none')) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Loading...';
                btn.disabled = true;

                setTimeout(() => {
                    moreDocsDiv.innerHTML = `
                        <!-- Document 4 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div class="card h-100 document-card-advanced">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="document-icon-container">
                                            <i class="fas fa-file-excel document-icon"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">Financial Data</h3>
                                            <small class="text-white">XLSX • 3.2 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="documents/financial-data.xlsx" class="btn btn-sm btn-outline-gold" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-gold preview-btn" data-pdf="documents/financial-data.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                                <div class="document-card-glow"></div>
                            </div>
                        </div>

                        <!-- Document 5 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div class="card h-100 document-card-advanced">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="document-icon-container">
                                            <i class="fas fa-file-pdf document-icon"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">Case Studies</h3>
                                            <small class="text-white">PDF • 4.5 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="documents/case-studies.pdf" class="btn btn-sm btn-outline-gold" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-gold preview-btn" data-pdf="documents/case-studies.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                                <div class="document-card-glow"></div>
                            </div>
                        </div>

                        <!-- Document 6 -->
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div class="card h-100 document-card-advanced">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="document-icon-container">
                                            <i class="fas fa-file-word document-icon"></i>
                                        </div>
                                        <div>
                                            <h3 class="h5 mb-0 text-white">Volunteer Handbook</h3>
                                            <small class="text-white">DOCX • 2.8 MB</small>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="documents/volunteer-handbook.docx" class="btn btn-sm btn-outline-gold" download>
                                            <i class="fas fa-download me-2"></i>Download
                                        </a>
                                        <button class="btn btn-sm btn-gold preview-btn" data-pdf="documents/volunteer-handbook.pdf">
                                            <i class="fas fa-eye me-2"></i>Preview
                                        </button>
                                    </div>
                                </div>
                                <div class="document-card-glow"></div>
                            </div>
                        </div>
                    `;
                    moreDocsDiv.classList.remove('d-none');
                    btn.innerHTML = '<i class="fas fa-chevron-up me-2"></i> Show Less';
                    btn.disabled = false;

                    AOS.refresh();

                    // Wire up preview buttons for new documents
                    moreDocsDiv.querySelectorAll('.preview-btn').forEach(newBtn => {
                        newBtn.addEventListener('click', function() {
                            const pdfUrl = this.getAttribute('data-pdf');
                            document.getElementById('pdfPreview').src = pdfUrl + '#view=fitH';
                            document.getElementById('pdfDownloadBtn').href = pdfUrl;
                            new bootstrap.Modal(document.getElementById('pdfModal')).show();
                        });
                    });
                }, 800);
            } else {
                moreDocsDiv.classList.add('d-none');
                btn.innerHTML = '<i class="fas fa-folder-open me-2"></i> Explore More Resources';
            }
        });
    }
});
