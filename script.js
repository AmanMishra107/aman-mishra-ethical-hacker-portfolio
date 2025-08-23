// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const commands = [
    'whoami',
    'ls -la /skills',
    'cat /about/me.txt',
    'sudo penetration_test.py',
    'nmap -sS target.com'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeCommand() {
    const currentCommand = commands[commandIndex];

    if (isDeleting) {
        typewriter.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentCommand.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeCommand, typingSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeCommand, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const passwordInput = document.getElementById('password-input');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const toggleBtn = document.getElementById('toggle-password');
const toggleIcon = toggleBtn.querySelector('i');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthMeter(strength);
});

toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
});

function calculatePasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    score = Object.values(checks).filter(Boolean).length;
    return {
        score: score,
        percentage: (score / 5) * 100,
        text: getStrengthText(score)
    };
}

function getStrengthText(score) {
    switch (score) {
        case 0:
        case 1:
            return 'Very Weak';
        case 2:
            return 'Weak';
        case 3:
            return 'Fair';
        case 4:
            return 'Good';
        case 5:
            return 'Strong';
        default:
            return 'Enter a password';
    }
}

function updateStrengthMeter(strength) {
    strengthBar.style.width = strength.percentage + '%';
    strengthText.textContent = strength.text;
    if (strength.score <= 1) {
        strengthBar.style.background = '#ff0000';
    } else if (strength.score <= 2) {
        strengthBar.style.background = '#ff6600';
    } else if (strength.score <= 3) {
        strengthBar.style.background = '#ffff00';
    } else if (strength.score <= 4) {
        strengthBar.style.background = '#66ff00';
    } else {
        strengthBar.style.background = '#00ff00';
    }
}


// Port Scanner Simulation
const scanBtn = document.getElementById('scan-btn');
const hostInput = document.getElementById('host-input');
const scanResults = document.getElementById('scan-results');

scanBtn.addEventListener('click', function() {
    const host = hostInput.value.trim();
    if (!host) {
        scanResults.innerHTML = '<span style="color: var(--danger-red);">Please enter a host to scan</span>';
        return;
    }

    simulatePortScan(host);
});

function simulatePortScan(host) {
    scanResults.innerHTML = '<span style="color: var(--primary-green);">Scanning ' + host + '...</span>';
    scanBtn.disabled = true;
    scanBtn.textContent = 'Scanning...';

    setTimeout(() => {
        const commonPorts = [21, 22, 23, 25, 53, 80, 110, 443, 993, 995];
        let results = `<div style="color: var(--primary-green);">Scan results for ${host}:</div>`;

        commonPorts.forEach(port => {
            const isOpen = Math.random() > 0.7; // Random simulation
            const status = isOpen ? 'OPEN' : 'CLOSED';
            const color = isOpen ? 'var(--primary-green)' : 'var(--text-muted)';
            const service = getServiceName(port);

            results += `<div>Port ${port}/${service}: <span style="color: ${color};">${status}</span></div>`;
        });

        scanResults.innerHTML = results;
        scanBtn.disabled = false;
        scanBtn.textContent = 'Scan Ports';
    }, 3000);
}

function getServiceName(port) {
    const services = {
        21: 'FTP',
        22: 'SSH',
        23: 'Telnet',
        25: 'SMTP',
        53: 'DNS',
        80: 'HTTP',
        110: 'POP3',
        443: 'HTTPS',
        993: 'IMAPS',
        995: 'POP3S'
    };
    return services[port] || 'Unknown';
}

// Hash Generator
const hashBtn = document.getElementById('hash-btn');
const hashInput = document.getElementById('hash-input');
const hashType = document.getElementById('hash-type');
const hashOutput = document.getElementById('hash-output');

hashBtn.addEventListener('click', function() {
    const text = hashInput.value.trim();
    const type = hashType.value;

    if (!text) {
        hashOutput.innerHTML = '<span style="color: var(--danger-red);">Please enter text to hash</span>';
        return;
    }

    generateHash(text, type);
});

async function generateHash(text, type) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    let algorithm;
    switch (type) {
        case 'sha1':
            algorithm = 'SHA-1';
            break;
        case 'sha256':
            algorithm = 'SHA-256';
            break;
        case 'md5':
            // MD5 simulation (not available in Web Crypto API)
            hashOutput.innerHTML = `<div style="color: var(--primary-green);">MD5 Hash:</div><div style="color: var(--text-secondary); word-break: break-all;">${simulateMD5(text)}</div>`;
            return;
        default:
            algorithm = 'SHA-256';
    }

    try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        hashOutput.innerHTML = `<div style="color: var(--primary-green);">${type.toUpperCase()} Hash:</div><div style="color: var(--text-secondary); word-break: break-all;">${hashHex}</div>`;
    } catch (error) {
        hashOutput.innerHTML = '<span style="color: var(--danger-red);">Error generating hash</span>';
    }
}

function simulateMD5(text) {
    // Simple MD5 simulation for demo purposes
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
}



// Matrix digital rain effect
// 3D Hacking Preloader
const preloader = {
    init() {
        this.createMatrixRain();
        this.animateProgress();
        this.setupInteractivity();
        this.autoHide();
    },

    createMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 35);
    },

    animateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressPercentage.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
    },

    setupInteractivity() {
        const preloaderEl = document.getElementById('preloader');

        // Click to skip
        preloaderEl.addEventListener('click', () => {
            this.hide();
        });

        // Hover effects on floating icons
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                icon.style.animation = 'none';
                icon.style.transform = 'scale(2) rotate(720deg)';
                setTimeout(() => this.hide(), 300);
            });
        });
    },

    autoHide() {
        setTimeout(() => {
            this.hide();
        }, 5000);
    },

    hide() {
        const preloaderEl = document.getElementById('preloader');
        preloaderEl.classList.add('hidden');

        setTimeout(() => {
            preloaderEl.style.display = 'none';
        }, 500);
    }
};

// Initialize preloader when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    preloader.init();
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Hacking Game Implementation
let gameState = {
    isActive: false,
    timeLeft: 60,
    targetSequence: '',
    timer: null
};

const startGameBtn = document.getElementById('start-game-btn');
const gameContent = document.getElementById('game-content');
const gameInput = document.getElementById('game-input');
const gameStatus = document.getElementById('game-status');
const gameTimer = document.getElementById('game-timer');

startGameBtn.addEventListener('click', function() {
    if (!gameState.isActive) {
        startHackingGame();
    } else {
        endGame();
    }
});

function startHackingGame() {
    gameState.isActive = true;
    gameState.timeLeft = 60;
    gameInput.disabled = false;
    gameInput.focus();

    startGameBtn.textContent = '🛑 Stop Hack';
    gameStatus.textContent = 'HACKING IN PROGRESS...';
    gameStatus.style.color = 'var(--warning-yellow)';

    generateCodeMatrix();
    startTimer();

    gameInput.addEventListener('input', checkSequence);
}

function generateCodeMatrix() {
    const sequences = [
        'A7B9X3K5', 'F2D8P1M4', 'Q6R7S9T2', 'L3N8H5J1',
        'Z4C6V7B3', 'W1E9I5O8', 'U2Y7G4K6', 'X5M2N9P1'
    ];

    gameState.targetSequence = sequences[Math.floor(Math.random() * sequences.length)];

    let matrix = '';
    for (let i = 0; i < 12; i++) {
        let line = '';
        for (let j = 0; j < 50; j++) {
            const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            line += Math.random() > 0.8 ? Math.floor(Math.random() * 10) : char;
        }

        // Insert target sequence randomly in one line
        if (i === 6) {
            const insertPos = Math.floor(Math.random() * 30);
            line = line.substring(0, insertPos) +
                `<span class="hidden-sequence">${gameState.targetSequence}</span>` +
                line.substring(insertPos + gameState.targetSequence.length);
        }

        matrix += line + '\n';
    }

    gameContent.innerHTML = `<div class="code-matrix">${matrix}</div>`;
}

function checkSequence() {
    const input = gameInput.value.toUpperCase();

    if (input === gameState.targetSequence) {
        winGame();
    } else if (gameState.targetSequence.startsWith(input)) {
        gameStatus.textContent = `SEQUENCE MATCH: ${input.length}/${gameState.targetSequence.length}`;
        gameStatus.style.color = 'var(--primary-green)';
    } else {
        gameStatus.textContent = 'SEQUENCE MISMATCH - TRY AGAIN';
        gameStatus.style.color = 'var(--danger-red)';
    }
}

function startTimer() {
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        gameTimer.textContent = gameState.timeLeft;

        if (gameState.timeLeft <= 0) {
            loseGame();
        }
    }, 1000);
}

function winGame() {
    endGame();
    gameStatus.textContent = '🎉 SYSTEM HACKED SUCCESSFULLY!';
    gameStatus.style.color = 'var(--primary-green)';
    gameContent.innerHTML = `
        <div style="text-align: center; color: var(--primary-green); font-size: 1.2rem;">
            ░█▀▀█ █▀▀ █▀▀ █▀▀ █▀▀ █▀▀  <br>
            ░█▄▄█ █▄▄ █▄▄ █▄▄ ▀▀█ ▀▀█  <br>
            ░█░░█ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄  <br><br>
            Time remaining: ${gameState.timeLeft}s<br>
            Target found: ${gameState.targetSequence}
        </div>
    `;
}

function loseGame() {
    endGame();
    gameStatus.textContent = '💥 SYSTEM DEFENSE ACTIVATED - HACK FAILED';
    gameStatus.style.color = 'var(--danger-red)';
    gameContent.innerHTML = `
        <div style="text-align: center; color: var(--danger-red); font-size: 1.2rem;">
              █▀▀▄ █▀▀ █▀▀▄ ▀█▀ █▀▀ █▀▀▄<br>
              █░░█ █▄▄ █░░█ ░█░ █▄▄ █░░█<br>
              ▀▀▀░ ▄▄▄ ▀░░▀ ▄█▄ ▄▄▄ ▀▀▀░<br><br>
            INTRUSION DETECTED<br>
            Target sequence was: ${gameState.targetSequence}<br>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--danger-red); color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Retry</button>
        </div>
    `;
}

function endGame() {
    gameState.isActive = false;
    clearInterval(gameState.timer);
    gameInput.disabled = true;
    gameInput.value = '';
    startGameBtn.textContent = '🚀 Start Hack';
    gameInput.removeEventListener('input', checkSequence);
}

// WiFi Scanner Simulation
const wifiScanBtn = document.getElementById('wifi-scan-btn');
const wifiResults = document.getElementById('wifi-results');

wifiScanBtn.addEventListener('click', function() {
    simulateWifiScan();
});

function simulateWifiScan() {
    wifiResults.innerHTML = '<span style="color: var(--primary-green);">Scanning for wireless networks...</span>';
    wifiScanBtn.disabled = true;
    wifiScanBtn.textContent = '📡 Scanning...';

    setTimeout(() => {
        const networks = [
            { name: 'FBI_Surveillance_Van_#2', security: 'WPA3', signal: 98, channel: 6 },
            { name: 'NSA_MONITORING', security: 'WPA2', signal: 85, channel: 11 },
            { name: 'NETGEAR_Guest', security: 'Open', signal: 72, channel: 1 },
            { name: 'Linksys_5G', security: 'WPA2', signal: 45, channel: 149 },
            { name: 'CyberDefense_HQ', security: 'WPA3-Enterprise', signal: 89, channel: 36 },
            { name: 'IoT_Honeypot', security: 'WEP', signal: 23, channel: 3 }
        ];

        let results = '<div style="color: var(--primary-green); margin-bottom: 1rem;">📡 Wireless Networks Detected:</div>';
        results += '<div style="font-family: var(--font-mono); font-size: 0.8rem;">';
        results += '<div style="color: var(--text-secondary); border-bottom: 1px solid var(--border-color); padding: 0.5rem 0;">SSID                     | SEC  | SIG | CH</div>';

        networks.forEach(network => {
            const signalColor = network.signal > 70 ? 'var(--primary-green)' :
                network.signal > 40 ? 'var(--warning-yellow)' : 'var(--danger-red)';
            const securityColor = network.security === 'Open' ? 'var(--danger-red)' :
                network.security === 'WEP' ? 'var(--warning-yellow)' : 'var(--primary-green)';

            results += `<div style="padding: 0.3rem 0;">`;
            results += `<span style="color: var(--text-secondary); width: 160px; display: inline-block;">${network.name.padEnd(25)}</span>`;
            results += `<span style="color: ${securityColor}; width: 60px; display: inline-block;">${network.security.padEnd(5)}</span>`;
            results += `<span style="color: ${signalColor}; width: 40px; display: inline-block;">${network.signal}%</span>`;
            results += `<span style="color: var(--text-muted);">${network.channel}</span>`;
            results += `</div>`;
        });

        results += '</div>';
        wifiResults.innerHTML = results;
        wifiScanBtn.disabled = false;
        wifiScanBtn.textContent = '📶 Scan Networks';
    }, 2500);
}

// Encryption Playground
const encryptBtn = document.getElementById('encrypt-btn');
const encryptInput = document.getElementById('encrypt-input');
const cipherType = document.getElementById('cipher-type');
const encryptOutput = document.getElementById('encrypt-output');

encryptBtn.addEventListener('click', function() {
    const text = encryptInput.value.trim();
    const cipher = cipherType.value;

    if (!text) {
        encryptOutput.innerHTML = '<span style="color: var(--danger-red);">Please enter text to encrypt</span>';
        return;
    }

    const encrypted = encryptText(text, cipher);
    encryptOutput.innerHTML = `
        <div style="color: var(--primary-green);">🔐 ${cipher.toUpperCase()} Encryption:</div>
        <div style="color: var(--text-secondary); word-break: break-all; margin-top: 0.5rem; background: var(--terminal-bg); padding: 0.5rem; border-radius: 4px;">${encrypted}</div>
    `;
});

function encryptText(text, cipher) {
    switch (cipher) {
        case 'caesar':
            return caesarCipher(text, 13);
        case 'base64':
            return btoa(text);
        case 'reverse':
            return text.split('').reverse().join('');
        default:
            return text;
    }
}

function caesarCipher(text, shift) {
    return text.replace(/[a-zA-Z]/g, function(char) {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
}

// Resume Download with Hacker Animation
const resumeDownload = document.getElementById('resume-download');
const downloadProgress = document.getElementById('download-progress');

resumeDownload.addEventListener('click', function() {
    simulateHackerDownload(this, 'resume.pdf');
});

function simulateHackerDownload(button, filename) {
    button.classList.add('downloading');
    const originalText = button.querySelector('.download-text').textContent;
    const progress = button.querySelector('.download-progress');

    // Simulate hacking sequence
    const hackingSteps = [
        'Bypassing firewall...',
        'Decrypting files...',
        'Establishing secure tunnel...',
        'Extracting credentials...',
        'Downloading package...'
    ];

    let currentStep = 0;
    const stepInterval = setInterval(() => {
        button.querySelector('.download-text').textContent = hackingSteps[currentStep];
        progress.style.width = ((currentStep + 1) * 20) + '%';

        currentStep++;
        if (currentStep >= hackingSteps.length) {
            clearInterval(stepInterval);

            // Complete download
            progress.style.width = '100%';
            button.querySelector('.download-text').textContent = '✅ Download Complete!';

            setTimeout(() => {
                // 🔥 Actual download (real file)
                const link = document.createElement('a');
                link.download = filename;
                link.href = filename; // use actual file path
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset button
                button.classList.remove('downloading');
                button.querySelector('.download-text').textContent = originalText;
                progress.style.width = '0%';
            }, 1500);
        }
    }, 800);
}

// Enhanced interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to avatar
    const avatar = document.querySelector('.avatar-frame');
    if (avatar) {
        avatar.classList.add('floating');
    }

    // Add pulse animation to important buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary');
    heroButtons.forEach(btn => {
        btn.classList.add('pulse-animation');
    });

    // Add glow border to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.classList.add('glow-border');
    });

    // Enhanced project cards with scan line effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to tool buttons with enhanced feedback
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.6)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 150);
        });
    });

    // Interactive skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 200);
        });
    });

    // Add typing sound effect simulation (visual)
    gameInput.addEventListener('keydown', function() {
        if (gameState.isActive) {
            this.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.5)';
            setTimeout(() => {
                this.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.3)';
            }, 100);
        }
    });
});