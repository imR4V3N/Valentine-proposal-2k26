const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');
let code = '';

const envelope = document.getElementById('envelope');
if (envelope && !display) {
    if (sessionStorage.getItem('valentineAccess') !== 'granted') {
        window.location.href = 'index.html';
    }
}

const homeBtn = document.getElementById('homeBtn');
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        sessionStorage.removeItem('valentineAccess');
        window.location.href = 'index.html';
    });
}

if (display && keys.length > 0) {
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent;
            
            if (value === '×') {
                code = code.slice(0, -1);
            } else {
                code += value;
            }
            
            display.textContent = '•'.repeat(code.length);
        });
    });
}

const unlockBtn = document.getElementById('unlock-btn');
if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const secretCode = '220203'; 
        if (code === secretCode) {
            sessionStorage.setItem('valentineAccess', 'granted');
            window.location.href = 'main.html';
        } else {
            keys.forEach(key => {
                key.classList.add('incorrect');
                code = '';
                display.textContent = '';
            });
            
            setTimeout(() => {
                keys.forEach(key => {
                    key.classList.remove('incorrect');
                });
            }, 1000);
        }
    });
}


const heartIcon = document.getElementById('heartIcon');
const carousel = document.getElementById('carousel');
let carouselInterval = null;

if (envelope) {
    envelope.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (envelope) {
            envelope.classList.toggle('open');
            
            if (envelope.classList.contains('open')) {
                setTimeout(() => {
                    if (carousel) {
                        carousel.classList.add('show');
                        startCarousel();
                    }
                }, 1000);
            } else {
                
                if (carousel) {
                    carousel.classList.remove('show');
                    stopCarousel();
                }
            }
        }
    });
}

function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    const finalMessage = document.getElementById('finalMessage');
    let currentIndex = 0;
    let cycleCount = 0;
    
    if (images.length === 0) return;
    
    carouselInterval = setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        
        if (currentIndex === 0) {
            cycleCount++;
        }
        
        if (cycleCount === 1 && currentIndex === 0) {
            setTimeout(() => {
                if (finalMessage) {
                    finalMessage.classList.add('show');
                }
                stopCarousel();
            }, 0);
        }
    }, 2000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
        carousel.classList.remove('show');
    }
}

const iconButton = document.getElementById('button');
const finalMessage = document.getElementById('finalMessage');
const proposalMessage = document.getElementById('proposalMessage');

if (iconButton) {
    iconButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (finalMessage) {
            finalMessage.classList.remove('show');
        }
        
        if (proposalMessage) {
            setTimeout(() => {
                proposalMessage.classList.add('show');
                carousel.classList.remove('show');
            }, 300);
        }
    });
}

const yesBtn = document.getElementById('yesButton');
const noBtn = document.getElementById('noButton');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#e60072']
            });
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#e60072']
                });
            }, 250);
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#e60072']
                });
            }, 400);
        }
        setTimeout(() => {
            sessionStorage.removeItem('valentineAccess');
            window.location.href = 'index.html';
            // location.reload();
        }, 5000);
    });
}