// Interactive Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Phone number reveal on click
    const phoneDisplay = document.getElementById('phone-display');
    if (phoneDisplay) {
        phoneDisplay.addEventListener('click', function() {
            if (this.textContent === 'Click to reveal') {
                this.textContent = '(+91) 7219408157';
            } else {
                this.textContent = 'Click to reveal';
            }
        });
    }

    // Social media links
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            } else {
                const platform = this.textContent.trim().toLowerCase();
                alert(`Opening ${platform} profile...`);
            }
        });
    });

    // Software icons hover effects and click animations
    const softwareIcons = document.querySelectorAll('.software-icon');
    softwareIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Skills flowchart items animation
    const flowItems = document.querySelectorAll('.flow-item');
    flowItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Work items click effect
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const work = this.textContent;
            alert(`Experience: ${work}`);
        });
    });

    // Portfolio demo iframes - lazy load
    const demoItems = document.querySelectorAll('.demo-item');
    demoItems.forEach((demoItem, index) => {
        const iframe = demoItem.querySelector('.demo-iframe');
        
        // Hover effects
        demoItem.addEventListener('mouseenter', function() {
            if (!this.classList.contains('loaded')) {
                this.style.borderColor = '#4CAF50';
            }
        });
        demoItem.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loaded')) {
                this.style.borderColor = '#333';
            }
        });
        
        // Click handler - open in semi-fullscreen modal
        demoItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const demoTitle = this.querySelector('.demo-title').textContent;
            const demoDescription = this.querySelector('.demo-description').textContent;
            
            // Open demo in semi-fullscreen modal
            openDemoModal(index + 1, demoTitle, demoDescription);
        });
    });


    // Liking items animation and info display
    const likingItems = document.querySelectorAll('.liking-item');
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Info data for each liking
    const likingInfo = {
        music: {
            title: 'MUSIC',
            content: `
                <div class="info-section">
                    <div class="info-item">
                        <span class="info-label">🎵 Top Genre:</span>
                        <span class="info-value">Hindi Pop</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">⏱️ Minutes Listened:</span>
                        <span class="info-value">25,782</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎤 Top Artists:</span>
                        <div class="info-list">
                            <span>• The Weeknd</span>
                            <span>• Charlie Puth</span>
                            <span>• Aditya Rikhari</span>
                            <span>• Vishal-Shekhar</span>
                            <span>• Arijit Singh</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎶 Top Songs:</span>
                        <div class="info-list">
                            <span>• Finding Her</span>
                            <span>• Yeh Fitoor Mera</span>
                            <span>• Teri Yaad</span>
                            <span>• Faasle</span>
                            <span>• Golden Brown</span>
                        </div>
                    </div>
                </div>
            `
        },
        coding: {
            title: 'CODING & CREATIVE',
            content: `
                <div class="info-section">
                    <div class="info-item">
                        <span class="info-label">💻 Programming Languages:</span>
                        <div class="info-list">
                            <span>• C</span>
                            <span>• Python</span>
                            <span>• HTML</span>
                            <span>• CSS</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎬 Video Editing:</span>
                        <div class="info-list">
                            <span>• DaVinci Resolve (Basic Level)</span>
                            <span>• YouTube Channel Management</span>
                            <span>• Thumbnail Creation</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎨 Design Software:</span>
                        <div class="info-list">
                            <span>• Photoshop (Basic Level)</span>
                            <span>• Thumbnail Design</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📺 YouTube Channel:</span>
                        <div class="info-list">
                            <span>• <a href="https://www.youtube.com/@knoxboyz" target="_blank" style="color: #4CAF50; text-decoration: none;">@knoxboyz</a></span>
                            <span>• Channel Management</span>
                            <span>• Content Creation</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎯 Focus Areas:</span>
                        <div class="info-list">
                            <span>• Web Development</span>
                            <span>• Problem Solving</span>
                            <span>• Interactive Design</span>
                            <span>• Video Content Creation</span>
                        </div>
                    </div>
                </div>
            `
        },
        gaming: {
            title: 'GAMING',
            content: `
                <div class="info-section">
                    <div class="info-item">
                        <span class="info-label">🎮 Platform:</span>
                        <span class="info-value">PlayStation 5</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎯 Favorite Games:</span>
                        <div class="info-list">
                            <span>• Red Dead Redemption 2</span>
                            <span>• Spider-Man (2018)</span>
                            <span>• Spider-Man 2</span>
                            <span>• Spider-Man: Miles Morales</span>
                            <span>• Detroit: Become Human</span>
                            <span>• The Last of Us</span>
                            <span>• Ghost of Tsushima</span>
                            <span>• Grand Theft Auto V</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎲 Genres:</span>
                        <div class="info-list">
                            <span>• Action-Adventure</span>
                            <span>• Open World</span>
                            <span>• Story-Driven</span>
                        </div>
                    </div>
                </div>
            `
        },
        movies: {
            title: 'MOVIES',
            content: `
                <div class="info-section">
                    <div class="info-item">
                        <span class="info-label">🎬 Passion:</span>
                        <span class="info-value">Love Watching Movies</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🎭 Interests:</span>
                        <div class="info-list">
                            <span>• Storytelling & Narratives</span>
                            <span>• Cinematography</span>
                            <span>• Character Development</span>
                            <span>• Film Analysis</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📽️ Appreciation:</span>
                        <div class="info-list">
                            <span>• Various Genres</span>
                            <span>• Quality Content</span>
                            <span>• Creative Storytelling</span>
                        </div>
                    </div>
                </div>
            `
        }
    };

    likingItems.forEach(item => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('.liking-icon');
            icon.style.animation = 'spin 0.5s';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
            
            // Show modal with info
            const type = this.getAttribute('data-type');
            if (type && likingInfo[type]) {
                modalTitle.textContent = likingInfo[type].title;
                modalBody.innerHTML = likingInfo[type].content;
                modal.style.display = 'flex';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Setup demo modal close handlers
    const demoModal = document.getElementById('demoModal');
    const demoModalClose = document.getElementById('demoModalClose');
    
    if (demoModalClose) {
        demoModalClose.addEventListener('click', closeDemoModal);
    }
    
    if (demoModal) {
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                closeDemoModal();
            }
        });
    }
    
    // Close modal with Escape key (merged with other Escape handler below)

    // Add parallax effect to clouds on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const speed = 0.5 + (index * 0.1);
            cloud.style.transform = `translateX(${scrolled * speed}px)`;
        });
    });

    // Cursor sparkle effect
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            createSparkle(cursor);
        }, 2000);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close demo modal if open
            const demoModal = document.getElementById('demoModal');
            if (demoModal && demoModal.style.display === 'flex') {
                closeDemoModal();
                return;
            }
            // Close info modal if open
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                return;
            }
            // Otherwise reset demo iframes
            const demoIframes = document.querySelectorAll('.demo-iframe');
            demoIframes.forEach(iframe => {
                if (iframe.src !== 'about:blank') {
                    iframe.src = 'about:blank';
                }
            });
        }
    });
});

// Load demo content
function loadDemo(iframe, demoNumber) {
    // Create demo content based on demo number
    let demoContent = '';
    
    switch(demoNumber) {
        case 1:
            demoContent = createDemo1();
            break;
        case 2:
            demoContent = createDemo2();
            break;
        case 3:
            demoContent = createDemo3();
            break;
        default:
            demoContent = createDemo1();
    }
    
    // Write content to iframe
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(demoContent);
            iframeDoc.close();
        } else {
            // Fallback: use srcdoc attribute
            iframe.srcdoc = demoContent;
        }
    } catch (error) {
        // If direct write fails, use srcdoc
        iframe.srcdoc = demoContent;
    }
}

// Demo 1: Interactive Web App
function createDemo1() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 20px;
                font-family: 'Courier New', monospace;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
            .counter {
                font-size: 48px;
                margin: 20px 0;
            }
            button {
                padding: 15px 30px;
                font-size: 18px;
                background: white;
                color: #667eea;
                border: 3px solid white;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                margin: 5px;
            }
            button:hover {
                background: #667eea;
                color: white;
            }
        </style>
    </head>
    <body>
        <h2>Interactive Counter</h2>
        <div class="counter" id="count">0</div>
        <div>
            <button onclick="changeCount(-1)">-</button>
            <button onclick="changeCount(1)">+</button>
            <button onclick="resetCount()">Reset</button>
        </div>
        <script>
            let count = 0;
            function changeCount(val) {
                count += val;
                document.getElementById('count').textContent = count;
            }
            function resetCount() {
                count = 0;
                document.getElementById('count').textContent = count;
            }
        </script>
    </body>
    </html>
    `;
}

// Demo 2: Python Program Demo (simulated)
function createDemo2() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 20px;
                font-family: 'Courier New', monospace;
                background: #1e1e1e;
                color: #4ec9b0;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            .code {
                background: #252526;
                padding: 20px;
                border: 2px solid #4ec9b0;
                border-radius: 5px;
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.6;
            }
            .output {
                background: #0d1117;
                padding: 20px;
                margin-top: 20px;
                border: 2px solid #4ec9b0;
                border-radius: 5px;
            }
            button {
                padding: 10px 20px;
                background: #4ec9b0;
                color: #1e1e1e;
                border: none;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                margin-top: 10px;
            }
            button:hover {
                background: #6dd5c7;
            }
        </style>
    </head>
    <body>
        <h2>Python Program Demo</h2>
        <div class="code">def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")</div>
        <button onclick="runCode()">Run Code</button>
        <div class="output" id="output">Click "Run Code" to see output...</div>
        <script>
            function runCode() {
                const output = document.getElementById('output');
                const results = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
                let html = '<strong>Output:</strong><br>';
                results.forEach((val, i) => {
                    html += \`F(\${i}) = \${val}<br>\`;
                });
                output.innerHTML = html;
            }
        </script>
    </body>
    </html>
    `;
}

// Demo 3: CSS Animation
function createDemo3() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 20px;
                font-family: 'Courier New', monospace;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                overflow: hidden;
            }
            .box {
                width: 100px;
                height: 100px;
                background: white;
                border: 3px solid #333;
                animation: rotate 2s infinite, colorChange 3s infinite;
                margin: 20px;
            }
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes colorChange {
                0%, 100% { background: white; }
                50% { background: #ff6b6b; }
            }
            .pixel-art {
                font-size: 40px;
                animation: bounce 1s infinite;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        </style>
    </head>
    <body>
        <h2 style="color: white;">CSS Animations</h2>
        <div class="box"></div>
        <div class="pixel-art">🎮</div>
        <p style="color: white; text-align: center;">Rotating box with color animation</p>
    </body>
    </html>
    `;
}

// Show logo animation for DR and PS
function showLogoAnimation(type) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'logo-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;
    
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = `
        text-align: center;
        animation: logoZoom 1s ease-out;
    `;
    
    let logoHTML = '';
    if (type === 'davinci') {
        logoHTML = `
            <div style="width: 150px; height: 150px; margin: 0 auto 30px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border: 4px solid #4CAF50; border-radius: 20px; display: flex; align-items: center; justify-content: center; animation: logoZoom 1s ease-out, glow 2s ease-in-out infinite;">
                <div style="font-size: 80px; filter: drop-shadow(0 0 10px #4CAF50);">🎬</div>
            </div>
            <div style="color: #4CAF50; font-size: 36px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 15px; text-shadow: 0 0 20px rgba(76, 175, 80, 0.5);">DaVinci Resolve</div>
            <div style="color: #87CEEB; font-size: 18px; letter-spacing: 2px;">Professional Video Editing</div>
            <div style="color: #999; font-size: 14px; margin-top: 10px;">Click anywhere to close</div>
        `;
    } else if (type === 'photoshop') {
        logoHTML = `
            <div style="width: 150px; height: 150px; margin: 0 auto 30px; background: linear-gradient(135deg, #001e36 0%, #003d5b 100%); border: 4px solid #31C5F0; border-radius: 20px; display: flex; align-items: center; justify-content: center; animation: logoZoom 1s ease-out, glowBlue 2s ease-in-out infinite;">
                <div style="font-size: 80px; filter: drop-shadow(0 0 10px #31C5F0);">🎨</div>
            </div>
            <div style="color: #31C5F0; font-size: 36px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 15px; text-shadow: 0 0 20px rgba(49, 197, 240, 0.5);">Adobe Photoshop</div>
            <div style="color: #87CEEB; font-size: 18px; letter-spacing: 2px;">Image Editing & Design</div>
            <div style="color: #999; font-size: 14px; margin-top: 10px;">Click anywhere to close</div>
        `;
    }
    
    logoContainer.innerHTML = logoHTML;
    overlay.appendChild(logoContainer);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoZoom {
            0% { transform: scale(0) rotate(180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.5); }
            50% { box-shadow: 0 0 40px rgba(76, 175, 80, 0.8); }
        }
        @keyframes glowBlue {
            0%, 100% { box-shadow: 0 0 20px rgba(49, 197, 240, 0.5); }
            50% { box-shadow: 0 0 40px rgba(49, 197, 240, 0.8); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(overlay);
    
    // Close on click or after 3 seconds
    overlay.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s';
        setTimeout(() => overlay.remove(), 300);
    });
    
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 300);
    }, 3000);
    
    // Add fadeOut animation
    if (!document.getElementById('logoAnimations')) {
        const animStyle = document.createElement('style');
        animStyle.id = 'logoAnimations';
        animStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(animStyle);
    }
}

// Create sparkle effect
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + rect.width / 2) + 'px';
    sparkle.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(sparkle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    sparkle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => sparkle.remove();
}

// Open demo in semi-fullscreen modal
function openDemoModal(demoNumber, title, description) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('demoModalTitle');
    const modalIframe = document.getElementById('demoModalIframe');
    const modalClose = document.getElementById('demoModalClose');
    
    // Set title
    modalTitle.textContent = `${title} - ${description}`;
    
    // Generate demo content
    let demoContent = '';
    switch(demoNumber) {
        case 1:
            demoContent = createDemo1();
            break;
        case 2:
            demoContent = createDemo2();
            break;
        case 3:
            demoContent = createDemo3();
            break;
        default:
            demoContent = createDemo1();
    }
    
    // Load content into iframe
    try {
        const iframeDoc = modalIframe.contentDocument || modalIframe.contentWindow.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(demoContent);
            iframeDoc.close();
        } else {
            modalIframe.srcdoc = demoContent;
        }
    } catch (error) {
        modalIframe.srcdoc = demoContent;
    }
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close demo modal
function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    const modalIframe = document.getElementById('demoModalIframe');
    
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear iframe content
    try {
        const iframeDoc = modalIframe.contentDocument || modalIframe.contentWindow.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write('');
            iframeDoc.close();
        }
    } catch (error) {
        // Ignore cross-origin errors
    }
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

