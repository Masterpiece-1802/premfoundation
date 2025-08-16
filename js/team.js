document.addEventListener('DOMContentLoaded', function() {
    // Equalize card heights
    const equalizeCards = () => {
        document.querySelectorAll('.tab-pane').forEach(tab => {
            const rows = tab.querySelectorAll('.row');
            rows.forEach(row => {
                let maxHeight = 0;
                const cards = row.querySelectorAll('.team-card');
                
                cards.forEach(card => card.style.height = 'auto');
                
                cards.forEach(card => {
                    if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
                });
                
                cards.forEach(card => card.style.height = `${maxHeight}px`);
            });
        });
    };
    
    equalizeCards();
    window.addEventListener('resize', equalizeCards);
    
    // Tab change handler
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', equalizeCards);
    });

    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.team-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Fixed Read More functionality
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const cardBody = this.closest('.team-card-body');
            if (!cardBody) return;
            
            const bio = cardBody.querySelector('.team-bio');
            if (!bio) return;
            
            // Toggle the expanded state
            const isExpanded = bio.classList.toggle('expanded');
            this.classList.toggle('expanded');
            
            // Update button text and icon
            const icon = this.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    this.innerHTML = 'Read less <i class="fas fa-chevron-up"></i>';
                } else {
                    this.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
                }
            }
        });
    });

    // Share functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const name = this.getAttribute('data-name');
            const currentUrl = window.location.href;
            const shareText = `Learn more about ${name} and their work with Prem Foundation`;
            
            if (navigator.share) {
                navigator.share({
                    title: `${name} - Prem Foundation`,
                    text: shareText,
                    url: currentUrl
                }).catch(err => {
                    console.log('Error sharing:', err);
                    showCustomShareMenu(this, name, currentUrl, shareText);
                });
            } else {
                showCustomShareMenu(this, name, currentUrl, shareText);
            }
        });
    });

    function showCustomShareMenu(button, name, url, text) {
        // Remove any existing menus first
        document.querySelectorAll('.custom-share-menu').forEach(menu => menu.remove());
        
        // Create new menu
        const shareMenu = document.createElement('div');
        shareMenu.className = 'custom-share-menu';
        shareMenu.innerHTML = `
            <div class="share-option" data-type="whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </div>
            <div class="share-option" data-type="facebook">
                <i class="fab fa-facebook"></i> Facebook
            </div>
            <div class="share-option" data-type="twitter">
                <i class="fab fa-twitter"></i> Twitter
            </div>
            <div class="share-option" data-type="linkedin">
                <i class="fab fa-linkedin"></i> LinkedIn
            </div>
            <div class="share-option" data-type="email">
                <i class="fas fa-envelope"></i> Email
            </div>
            <div class="share-option" data-type="copy">
                <i class="fas fa-link"></i> Copy Link
            </div>
        `;
        
        // Position menu absolutely relative to viewport
        const rect = button.getBoundingClientRect();
        shareMenu.style.position = 'absolute';
        shareMenu.style.top = `${rect.bottom + window.scrollY}px`;
        shareMenu.style.left = `${rect.left + window.scrollX}px`;
        shareMenu.style.zIndex = '1000';
        
        document.body.appendChild(shareMenu);
        
        // Handle option clicks
        shareMenu.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                shareViaPlatform(option.getAttribute('data-type'), name, url, text);
                shareMenu.remove();
            });
        });
        
        // Close when clicking outside
        const clickHandler = function(e) {
            if (!shareMenu.contains(e.target)) {
                shareMenu.remove();
                document.removeEventListener('click', clickHandler);
            }
        };
        setTimeout(() => document.addEventListener('click', clickHandler), 0);
    }

    function shareViaPlatform(platform, name, url, text) {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(`${text}\n\n${url}`);
        
        switch(platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodedText}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent(name + ' - Prem Foundation')}&body=${encodedText}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copied to clipboard!');
                });
                break;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Dot network effect for hero
    const heroTeam = document.querySelector('.hero-team');
    if (heroTeam) {
        createDotNetwork();
    }
    
    function createDotNetwork() {
        const container = document.querySelector('.hero-team');
        const dotNetwork = document.createElement('div');
        dotNetwork.className = 'dot-network';
        container.appendChild(dotNetwork);
        
        const dotCount = 30;
        const dots = [];
        const lines = [];
        
        // Create dots
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            // Random position within container
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
            
            // Store position and element
            dots.push({
                element: dot,
                x,
                y,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
            
            dotNetwork.appendChild(dot);
        }
        
        // Create lines between nearby dots
        function updateLines() {
            // Clear existing lines
            lines.forEach(line => dotNetwork.removeChild(line));
            lines.length = 0;
            
            // Create new connections
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Connect if within certain distance
                    if (distance < 20) {
                        const line = document.createElement('div');
                        line.className = 'line';
                        
                        const angle = Math.atan2(dy, dx);
                        const length = distance;
                        
                        line.style.width = `${length}%`;
                        line.style.left = `${dots[i].x}%`;
                        line.style.top = `${dots[i].y}%`;
                        line.style.transform = `rotate(${angle}rad)`;
                        line.style.opacity = 1 - (distance / 20);
                        
                        dotNetwork.appendChild(line);
                        lines.push(line);
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            dots.forEach(dot => {
                // Update position with velocity
                dot.x += dot.vx;
                dot.y += dot.vy;
                
                // Bounce off edges
                if (dot.x < 0 || dot.x > 100) dot.vx *= -1;
                if (dot.y < 0 || dot.y > 100) dot.vy *= -1;
                
                // Apply position
                dot.element.style.left = `${dot.x}%`;
                dot.element.style.top = `${dot.y}%`;
            });
            
            updateLines();
            requestAnimationFrame(animate);
        }
        
        // Start animation
        setTimeout(() => {
            updateLines();
            animate();
        }, 100);
    }
});