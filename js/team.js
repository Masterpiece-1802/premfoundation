document.addEventListener('DOMContentLoaded', function() {
    // Store original card heights
    let originalCardHeights = new Map();

    // Equalize card heights with improved handling
    const equalizeCards = (forceReset = false) => {
        document.querySelectorAll('.tab-pane').forEach(tab => {
            const rows = tab.querySelectorAll('.row');
            rows.forEach(row => {
                let maxHeight = 0;
                const cards = row.querySelectorAll('.team-card');
                
                // Reset heights first
                cards.forEach(card => {
                    if (forceReset) {
                        card.style.height = 'auto';
                        const cardBody = card.querySelector('.team-card-body');
                        if (cardBody) cardBody.style.height = 'auto';
                    }
                });
                
                // Calculate max height
                cards.forEach(card => {
                    if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
                });
                
                // Apply max height
                cards.forEach(card => {
                    card.style.height = `${maxHeight}px`;
                    if (forceReset) {
                        originalCardHeights.set(card, maxHeight);
                    }
                });
            });
        });
    };
    
    // Initialize and set up resize listener
    equalizeCards(true); // true to store original heights
    window.addEventListener('resize', () => equalizeCards(true));

    // Tab change handler
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function() {
            setTimeout(() => equalizeCards(true), 10);
        });
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

   // Enhanced Read More/Less with Animation
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const card = this.closest('.team-card');
        const cardBody = this.closest('.team-card-body');
        if (!cardBody) return;
        
        const bioContainer = cardBody.querySelector('.team-bio-container');
        const bio = cardBody.querySelector('.team-bio');
        if (!bio) return;
        
        // Toggle the expanded state
        const isExpanding = !bio.classList.contains('expanded');
        
        // Add/remove classes for animation
        if (isExpanding) {
            bio.classList.remove('collapsed');
            bioContainer.style.height = `${bio.offsetHeight}px`;
            bio.classList.add('expanding'); // Temporary class for animation
            
            setTimeout(() => {
                bio.classList.add('expanded');
                bio.classList.remove('expanding');
                bioContainer.style.height = `${bio.scrollHeight}px`;
                
                // Update button
                this.innerHTML = 'Read less <i class="fas fa-chevron-up"></i>';
                this.classList.add('expanded');
                
                // Finalize height after animation
                setTimeout(() => {
                    bioContainer.style.height = 'auto';
                    equalizeCards(true);
                }, 500);
            }, 10);
        } else {
            bio.classList.add('collapsing'); // Temporary class for animation
            bioContainer.style.height = `${bio.offsetHeight}px`;
            
            setTimeout(() => {
                bio.classList.remove('expanded');
                bioContainer.style.height = '';
                bio.classList.add('collapsed');
                bio.classList.remove('collapsing');
                
                // Update button
                this.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
                this.classList.remove('expanded');
                
                // Recalculate heights
                setTimeout(() => equalizeCards(true), 50);
            }, 10);
        }
    });
});


    // Enhanced Share functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Close any existing menus first
            document.querySelectorAll('.custom-share-menu').forEach(menu => menu.remove());
            
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
        // Create new menu
        const shareMenu = document.createElement('div');
        shareMenu.className = 'custom-share-menu';
        shareMenu.innerHTML = `
            <div class="share-option" data-type="whatsapp">
                <i class="fab fa-whatsapp" style="color: #25D366;"></i> WhatsApp
            </div>
            <div class="share-option" data-type="facebook">
                <i class="fab fa-facebook" style="color: #1877F2;"></i> Facebook
            </div>
            <div class="share-option" data-type="twitter">
                <i class="fab fa-twitter" style="color: #1DA1F2;"></i> Twitter
            </div>
            <div class="share-option" data-type="linkedin">
                <i class="fab fa-linkedin" style="color: #0A66C2;"></i> LinkedIn
            </div>
            <div class="share-option" data-type="email">
                <i class="fas fa-envelope" style="color: #EA4335;"></i> Email
            </div>
            <div class="share-option" data-type="copy">
                <i class="fas fa-link" style="color: #1e40af;"></i> Copy Link
            </div>
        `;
        
        // Position menu near the button
        const rect = button.getBoundingClientRect();
        shareMenu.style.position = 'fixed';
        shareMenu.style.top = `${rect.bottom + window.scrollY}px`;
        shareMenu.style.right = `${window.innerWidth - rect.right - window.scrollX}px`;
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
            if (!shareMenu.contains(e.target) && e.target !== button) {
                shareMenu.remove();
                document.removeEventListener('click', clickHandler);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', clickHandler);
        }, 10);
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
                    // Show a subtle notification instead of alert
                    const notification = document.createElement('div');
                    notification.textContent = 'Link copied to clipboard!';
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = '#1e40af';
                    notification.style.color = 'white';
                    notification.style.padding = '10px 20px';
                    notification.style.borderRadius = '4px';
                    notification.style.zIndex = '1000';
                    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    notification.style.animation = 'fadeIn 0.2s ease-out';
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.animation = 'fadeOut 0.2s ease-out';
                        setTimeout(() => notification.remove(), 200);
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
                break;
        }
    }
});

// Dot network effect for hero
document.addEventListener('DOMContentLoaded', function() {
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